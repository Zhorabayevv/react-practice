import React from "react";

function Categories({ value, onClickActiveCategories }) {
  const categories = [
    { id: 0, name: "Все" },
    { id: 1, name: "Мясные" },
    { id: 2, name: "Вегетарианская" },
    { id: 3, name: "Гриль" },
    { id: 4, name: "Острые" },
    { id: 5, name: "Закрытые" },
  ];

  let catigoriesList = categories.map((item) => {
    return (
      <li
        className={value === item.id ? "active" : ""}
        onClick={() => onClickActiveCategories(item.id)}
        key={item.id}
      >
        {item.name}
      </li>
    );
  });

  return (
    <div className="categories">
      <ul>{catigoriesList}</ul>
    </div>
  );
}
export default Categories;
