import React from "react";
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import ItemSkeletonComponent from "../components/ItemBlock/ItemSkeletonComponent";
import ItemBlockComponent from "../components/ItemBlock/ItemBlockComponent";
import axios from "axios";
import qs from "qs";
import PaginationComponent from "../components/Pagination/PaginationComponent";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setQueryParams } from "../redux/slices/filterSlice";
import { useNavigate } from "react-router";
import { fetchProducts } from "../redux/slices/productsSlice";

export const HomeComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, status } = useSelector(({ products }) => products);

  const { activeCategories, sort, pageCount } = useSelector(
    ({ filter }) => filter
  );

  // const [isLoading, setIsLoading] = React.useState(true);
  const { searchItems } = React.useContext(SearchContext);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const onChangeCategories = (i) => {
    dispatch(setCategoryId(i));
  };
  const fetchItems = async () => {
    // setIsLoading(true);
    const categoryNames =
      activeCategories > 0 ? `category=${activeCategories}` : "";
    const searchItemsName = searchItems ? `search=${searchItems}` : "";

    dispatch(
      fetchProducts({ categoryNames, searchItemsName, sort, pageCount })
    );
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        category: activeCategories,
        sortBy: sort.type,
        search: searchItems,
        page: pageCount,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategories, sort.type, searchItems, pageCount]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((sortItem) => sortItem.type === params.sortBy);
      dispatch(setQueryParams({ ...params, sort }));
    }
    isSearch.current = true;
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (isSearch.current) {
      fetchItems();
    }
    isSearch.current = false;
  }, [activeCategories, sort.type, searchItems, pageCount]);

  const skeletonItems = [...Array(6)].map((_, index) => (
    <ItemSkeletonComponent key={index} />
  ));
  const values = products.map((item) => (
    <ItemBlockComponent key={item.id} {...item} />
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={activeCategories}
          onClickActiveCategories={(i) => onChangeCategories(i)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "failed" ? (
        <div className="txc">
          <h2>Ошибка загрузки данных 😕</h2>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletonItems : values}
        </div>
      )}

      <PaginationComponent />
    </div>
  );
};

export default HomeComponent;
