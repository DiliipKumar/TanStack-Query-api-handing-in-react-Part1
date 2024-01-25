import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchData = async () => {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  return data.products;
};

function Products() {
  const { isFetching, isError, data: products, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchData,
  });

  if (isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="flex flex-wrap -mx-4">
          {products.map((productItem) => (
            <div key={productItem.id} className="w-full sm:w-1/2 lg:w-1/4 xl:w-1/4 px-4 mb-8">
              <div className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={productItem.thumbnail}
                    alt={productItem.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href="">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {productItem.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{productItem.category}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{productItem.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
