import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import App from "../layout/App";
import Catalog from "../../features/Catalog/Catalog";
import ProductDetails from "../../features/Catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {path:'',element:<HomePage></HomePage>},
            {path:'catalog',element:<Catalog></Catalog>},
            {path:'catalog/:id',element:<ProductDetails/>},
            {path:'about',element:<AboutPage/>},
            {path:'contact',element:<ContactPage/>},
            {path:'server-error',element:<ServerError/>},
            {path:'not-found',element:<NotFound/>},
            {path:'*',element:<Navigate replace to ='/not-found'/>},
        ]
    }
])
