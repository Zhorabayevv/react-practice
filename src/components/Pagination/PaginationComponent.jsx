import React from 'react'
import ReactPaginate from 'react-paginate'

import classes from './PaginationComponent.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { setPageCount } from '../../redux/slices/filterSlice';

export const PaginationComponent = () => {
  const currentPage = useSelector(({ filter }) => filter.pageCount);
  const dispatch = useDispatch();
  const onChangePage = (i) => {
    dispatch(setPageCount(i));
  }


  return (
    <ReactPaginate
    className={classes.pagination}
    breakLabel="..."
    nextLabel=">"
    onPageChange={(e) => onChangePage(e.selected+1)}
    pageRangeDisplayed={5}
    pageCount={3}
    forcePage={currentPage - 1}
    previousLabel="<"
    renderOnZeroPageCount={null}
  />
  )
}

export default PaginationComponent