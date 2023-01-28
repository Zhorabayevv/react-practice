import React from "react";
import debounce from "lodash.debounce";
import classes from "./SearchComponent.module.scss";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/filter/slice";

export const SearchComponent: React.FC = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue1] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setSearchValue1("");
    inputRef.current?.focus();
  };

  const debounceSearch = React.useCallback(
    debounce((value: string) => {
      dispatch(setSearchValue(value));
    }, 150),
    []
  );

  const onChangeSearchItems = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue1(e.target.value);
    debounceSearch(e.target.value);
  };

  return (
    <div className={classes.searchMain}>
      <svg
        className={classes.searchIcon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        width="22px"
        height="22px"
      >
        <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
      </svg>
      <input
        ref={inputRef}
        value={searchValue}
        type="text"
        onChange={onChangeSearchItems}
        className={classes.searchInput}
        placeholder="Поиск"
      />

      {searchValue && (
        <svg
          className={classes.deleteIcon}
          onClick={onClickClear}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
        >
          <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688 L 7.2929688 8.7070312 L 10.585938 12 L 7.2929688 15.292969 L 8.7070312 16.707031 L 12 13.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13.414062 12 L 16.707031 8.7070312 L 15.292969 7.2929688 L 12 10.585938 L 8.7070312 7.2929688 z" />
        </svg>
      )}
    </div>
  );
};

export default SearchComponent;
