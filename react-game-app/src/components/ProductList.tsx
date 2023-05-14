import React, { useEffect, useState } from "react";

function ProductList({ category }: { category: string }) {
  const [products, setProducts] = useState<string[]>([]);

  //Do not set state in useEffect unless told to run only once (empty array as second parameter)
  useEffect(() => {
    console.log("fetching products in", category);
    setProducts(["Clothing", "Household"]);
  }, [category]);
  return <div>ProductList</div>;
}

export default ProductList;
