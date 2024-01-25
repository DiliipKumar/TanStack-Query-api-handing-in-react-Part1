import React from "react";
import { useParams } from "react-router-dom";
import { useQuery,useMutation } from "@tanstack/react-query";
import axios  from "axios";

function Product() {
  const { productId } = useParams();


  const mutation = useMutation({
    mutationFn: (item) => {
      return axios.put(`https://dummyjson.com/products/${productId}`, item)
    },
  })


  const fetchData = async () => {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await response.json();
    return data;
  };

  const {
    isFetching,
    isError,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchData,
  });

  if (isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <button
        onClick={() => {
          mutation.mutate({title: "New upadated product"});
        }}
      >
        Create Product
      </button>
      <div key={products.id}>
        <h2>{products.title}</h2>
        <p>{products.category}</p>
        <p>{products.price}</p>
      </div>
    </div>
  );
}

export default Product;
