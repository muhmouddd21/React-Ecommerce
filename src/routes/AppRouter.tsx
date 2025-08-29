import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const Home = lazy(()=>import("@pages/Home"));
const Categories = lazy(()=>import("@pages/Categories"));
const AboutUs = lazy(()=> import("@pages/AboutUs"));
const Products = lazy(()=> import("@pages/Products"));
const Cart = lazy(()=> import("@pages/Cart"));
const Wishlist = lazy(()=>import("@pages/Wishlist"));

import { MainLayout } from "@layouts/index";
import Error from '@pages/Error';
import Login from '@pages/Login';
import Register from '@pages/Register';


const router = createBrowserRouter([
    {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children:[
                {
                    index: true,
                    element:  <Suspense fallback="loading please wait..."><Home /></Suspense>  
                },
                {
                    path: "categories",
                    element: <Suspense fallback="loading please wait..."> <Categories /></Suspense> 
                },
                {
                    path: "categories/products/:prefix",
                    element: <Suspense fallback="loading please wait..."> <Products /></Suspense>,
                    loader:({params})=>{
                    if (
                        typeof params.prefix !== "string" ||
                        !/^[a-z]+$/i.test(params.prefix)
                        ) {
                            throw new Response("Bad Request", {
                            statusText: "Category not found",
                            status: 400,
                            });
                        }
                        return true;
                    }
                },
                {
                    path: "about-us",
                    element: <Suspense fallback="loading please wait..."> <AboutUs /> </Suspense> 
                },
                {
                    path: "cart",
                    element: <Suspense fallback="loading please wait..."> <Cart/> </Suspense> 
                },
                {
                    path: "wishlist",
                    element: <Suspense fallback="loading please wait..."> <Wishlist/> </Suspense> 
                },
                {
                    path:'login',
                    element: <Login />
                },
                {
                    path:'register',
                    element: <Register />
                }

    ]

    }
])
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;