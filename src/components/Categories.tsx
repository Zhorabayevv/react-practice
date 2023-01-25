import React from "react";

interface CategoriesProps {
  value: number;
  onClickActiveCategories: (id: number) => void;
}
const categories = [
  { id: 0, name: "Все" },
  { id: 1, name: "Мясные" },
  { id: 2, name: "Вегетарианская" },
  { id: 3, name: "Гриль" },
  { id: 4, name: "Острые" },
  { id: 5, name: "Закрытые" },
];

const Categories: React.FC<CategoriesProps> = ({ value, onClickActiveCategories }) => {


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
