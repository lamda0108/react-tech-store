// products context
// Context provides a way to pass data through the component tree without having
//  to pass props down manually at every level.
import React from "react";
import axios from "axios";
import url from "../utils/URL";
import { featuredProducts } from "../utils/helpers";

export const ProductContext = React.createContext();
//Provider, Consumer, useContext()

export default function ProductProvider({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);

  //   By using this Hook, you tell React that your component needs to do something after
  // render. React will remember the function you passed
  // (we’ll refer to it as our “effect”), and call it later after performing the DOM updates.
  // By default, it runs both after the first render and after every update
  // we typically want to perform our effects after React has updated the DOM.
  React.useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`).then((response) => {
      console.log(response);
      const featured = featuredProducts(response.data);
      setProducts(response.data);
      setFeatured(featured);
      setLoading(false);
      //every time the state updates, components get rerendered
    });
    return () => {};
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, featured }}>
      {children}
    </ProductContext.Provider>
  );
}
