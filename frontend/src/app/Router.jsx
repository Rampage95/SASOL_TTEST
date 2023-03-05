/*
*
    This component contains the different routes defined for the frontend app. 
*
*/

import React from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom"
import ProductList from "./productCatalog/ProductList";
import Product from "./productCatalog/Product";
import NewProduct from "./productCatalog/NewProduct";
import PageNotFound from "./PageNotFound";

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" element={<ProductList />} />
                <Route exact path="/product/edit" element={<Product />} />
                <Route exact path="/product/new" element={<NewProduct />} />
                <Route exact path="*" element={<PageNotFound />} />
            </Switch>
        </BrowserRouter>
    );
}


