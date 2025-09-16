import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
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
import LottieHandler from '@components/feedback/LottieHandler/LottieHandler';
import PageSuspenseFallback from '@components/feedback/PageSuspenceFallback/PageSuspenseFallback';
import ProtectedRoute from '@components/common/protectedRoute/ProtectedRoute';
import Profile from '@pages/Profile';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import ThunkCheckAuth from '@store/Auth/Thunk/ThunkCheckAuth';
import ProfileLayout from '@layouts/profileLayout/ProfileLayout';
import Orders from '@pages/Orders';
import Dashboard from '@pages/Dashboard';
import TodoDetailPage from '@pages/TodoDetailPage';


const router = createBrowserRouter([
    {
    path: "/",
    element: (
        <Suspense
        fallback={
          <div style={{ marginTop: "10%" }}>
            <LottieHandler type="loading" message="Loading please wait..." />
          </div>
        }
      >
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children:[
                {
                    index: true,
                    element:  <PageSuspenseFallback ><Home /></PageSuspenseFallback>  
                },
                {
                    path: "categories",
                    element: <PageSuspenseFallback > <Categories /></PageSuspenseFallback> 
                },
                {
                    path: "categories/products/:prefix",
                    element: <PageSuspenseFallback > <Products /></PageSuspenseFallback>,
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
                    element: <PageSuspenseFallback > <AboutUs /> </PageSuspenseFallback> 
                },
                {
                    path: "cart",
                    element: <PageSuspenseFallback> <Cart/> </PageSuspenseFallback> 
                },
                {
                    path: "wishlist",

                    element: 
                    <ProtectedRoute>
                        <PageSuspenseFallback> <Wishlist/> </PageSuspenseFallback> 
                    </ProtectedRoute>

                },
                {
                    path:"dashboard",
                    element: <PageSuspenseFallback> <Dashboard /> </PageSuspenseFallback>
                },
                {

                    path: "/todos", 
                    element: <TodoDetailPage />,
                },
                {
                    path:'login',
                    element: <Login />
                },
                {
                    path:'register',
                    element: <Register />
                },
                {
                    path:'profile',
                    element:
                    <ProtectedRoute>
                        <PageSuspenseFallback> <ProfileLayout/> </PageSuspenseFallback> 
                    </ProtectedRoute>
                    ,
                    children:[
                        {
                            index:true,
                            element: <PageSuspenseFallback> <Profile /></PageSuspenseFallback>
                        },
                        {
                            path:"orders",
                            element: <PageSuspenseFallback> <Orders /></PageSuspenseFallback>
                        }
                    ]
                }

    ]

    }
])
const AppRouter = () => {
    const dispatch =useAppDispatch();
    const isInitialized= useAppSelector(state=>state.AuthSlice.isInitialized)

    useEffect(()=>{
        dispatch(ThunkCheckAuth());
    },[dispatch])


    if (!isInitialized) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <LottieHandler type="loading" message="Initializing session..." />
            </div>
        );
    }


  return <RouterProvider router={router} />;
};

export default AppRouter;