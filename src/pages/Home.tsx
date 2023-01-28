import React from "react";
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import ItemSkeletonComponent from "../components/ItemBlock/ItemSkeletonComponent";
import ItemBlockComponent from "../components/ItemBlock/ItemBlockComponent";
import qs from "qs";
import PaginationComponent from "../components/Pagination/PaginationComponent";
import { useSelector } from "react-redux";
import { FilterInterface2 } from "../redux/filter/types";
import { filterSelector } from "../redux/filter/selectors";
import { setCategoryId, setQueryParams } from "../redux/filter/slice";
import { useNavigate } from "react-router";
import { FetchProductsInterface } from "../redux/product/types";
import { productsSelector } from "../redux/product/selectors";
import { fetchProducts } from "../redux/product/asyncActions";
import { useAppDispatch } from "../redux/store";

const HomeComponent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products, status } = useSelector(productsSelector);
  const { activeCategories, sort, pageCount, searchValue } =
    useSelector(filterSelector);
  // const { searchItems } = React.useContext(SearchContext);
  const isMounted = React.useRef(false);
  const onChangeCategories = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);
  const categoryNames = activeCategories > 0 ? String(activeCategories) : "";
  const searchItemsName = searchValue ? searchValue : "";
  const pageCountN = pageCount > 0 ? String(pageCount) : "";
  const fetchItems = async () => {
    dispatch(
      fetchProducts({ categoryNames, searchItemsName, sort, pageCountN })
    );
  };

  React.useEffect(() => {
    if (isMounted.current) {      
      const queryString = qs.stringify({
        category: Number(categoryNames) > 0 ? categoryNames : undefined,
        sortBy: sort.type ? sort.type : undefined,
        search: searchItemsName ? searchItemsName : undefined,
        page: pageCountN,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;

    if (!window.location.search) {
      dispatch(fetchProducts({} as FetchProductsInterface));
    }
  }, [activeCategories, sort.type, searchValue, pageCount]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as FilterInterface2;
      const sort = sortList.find((sortItem) => sortItem.type === params.sortBy);
      if (sort) {
        params.sort = sort;
      }

      dispatch(setQueryParams(params));
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchItems();
  }, [activeCategories, sort.type, searchValue, pageCount]);

  const skeletonItems = [...Array(6)].map((_, index) => (
    <ItemSkeletonComponent key={index} />
  ));
  const values = products.map((item: any) => (
    <ItemBlockComponent key={item.id} {...item} />
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={activeCategories}
          onClickActiveCategories={(i) => onChangeCategories(i)}
        />
        <Sort value={sort} />
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
