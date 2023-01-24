import React from "react";
import "./scss/app.scss";
import Header from "./components/Header";
import HomeComponent from "./pages/Home";
import { Route, Routes } from "react-router";
import NotFound from "./pages/NotFound";
import Carts from "./pages/Basket";


export const SearchContext = React.createContext();

function App() {
  const [searchItems, setSearchItems] = React.useState("");
  // console.log(searchItems);
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchItems, setSearchItems }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomeComponent />} />
              <Route path="/carts" element={<Carts />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
