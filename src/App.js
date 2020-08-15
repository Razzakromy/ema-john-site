import React from 'react';
import './App.css';
import Header from './Component/Header/Header';
import Shop from './Component/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Review from './Component/Review/Review';
import Manage from './Component/Manage/Manage';
import NotFound from './Component/NotFound/NotFound';
import ProductDetail from './Component/ProductDetail/ProductDetail';
import Login from './Component/Login/Login';
import { AuthContextProvider, PrivateRoute } from './Component/Login/useAuth';
import Shipment from './Component/Shipment/Shipment';



function App(porps) {

  return (
    <div>
      <AuthContextProvider>
        <Header></Header>
        <Router>
          <Switch>
            <Route path="/shop">
            <Shop></Shop>
            </Route>
            <Route path="/review">
              <Review></Review>
            </Route>
            <Route path="/manage">
              <Manage></Manage>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/shipment">
              <Shipment></Shipment>
            </PrivateRoute>
            <Route exact path="/">
            <Shop></Shop>
            </Route>
            <Route path="/product/key/:productKey/">
              <ProductDetail></ProductDetail>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
     </AuthContextProvider>
    </div>
  );
}

export default App;
