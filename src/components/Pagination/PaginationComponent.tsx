import React from "react";
import ReactPaginate from "react-paginate";

import classes from "./PaginationComponent.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { pageCountSelector } from "../../redux/filter/selectors";
import {
  setPageCount,
} from "../../redux/filter/slice";

export const PaginationComponent: React.FC = () => {
  const currentPage = useSelector(pageCountSelector);
  const dispatch = useDispatch();
  const onChangePage = (i: number) => {
    dispatch(setPageCount(i));
  };

  return (
    <ReactPaginate
      className={classes.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
    />
  );
};

export default PaginationComponent;
