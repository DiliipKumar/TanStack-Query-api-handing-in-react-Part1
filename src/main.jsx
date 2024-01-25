import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Products from './Products.jsx';
import Product from './Product.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import {
    createBrowserRouter,
    RouterProvider,
   
  } from "react-router-dom";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/products',
    element: <Products/>,
  },
  {
    path: '/products/:productId',
    element: <Product />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
