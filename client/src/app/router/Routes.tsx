import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import App from "../layout/App";
import Catalog from "../../features/Catalog/Catalog";
import ProductDetails from "../../features/Catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/basket";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import RequireAuth from "./RequireAuth";
import Orders from "../../features/Orders/Orders";
import CheckoutWrapper from "../../features/checkouts/CheckoutWrapper";
import Inventory from "../../features/admin/Inventory";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {element:<RequireAuth/>, children:[
                {path:'checkout',element:<CheckoutWrapper/>},
                {path:'orders',element:<Orders/>},
                {path:'inventory',element:<Inventory/>},
            ]},

            {element:<RequireAuth roles={['Admin']}/>, children:[
               {path:'inventory',element:<Inventory/>},
            ]},

            {path:'',element:<HomePage></HomePage>},
            {path:'catalog',element:<Catalog></Catalog>},
            {path:'catalog/:id',element:<ProductDetails/>},
            {path:'about',element:<AboutPage/>},
            {path:'contact',element:<ContactPage/>},
            {path:'server-error',element:<ServerError/>},
            {path:'not-found',element:<NotFound/>},
            {path:'basket',element:<BasketPage/>},
            {path:'login',element:<Login/>},
            {path:'register',element:<Register/>},
            {path:'*',element:<Navigate replace to ='/not-found'/>},
        ]
    }
])

