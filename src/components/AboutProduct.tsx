import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router";

interface ProductInterface {
  id: string;
  imageUrl: string;
  title: string;
  types: [number];
  sizes: [number],
  price: number;
  category: number;
  rating: number;
}


const AboutProduct: React.FC = () => {
  const [product, setProduct] = React.useState<ProductInterface>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `https://63c88c2c5c0760f69acdf3b4.mockapi.io/items/${id}`
        );
        setProduct(data);
      } catch (error) {
        navigate("/");
        console.log("error: " + error);
      }
    }
    fetchData();
    // axios.get(`https://63c88c2c5c0760f69acdf3b4.mockapi.io/items/${id}`)
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>About {product?.title}</h1>
      <img src={product?.imageUrl} alt="" />
      <p>{product?.price}</p>
    </div>
  );
};

export default AboutProduct;
