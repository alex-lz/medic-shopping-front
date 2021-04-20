import React, { Component } from 'react';
import './App.css';
import Home from './views/Home';
import { BrowserRouter as Router, Route, Switch, useRouteMatch, useLocation } from 'react-router-dom';
import { Container } from 'reactstrap';
import AppNavbar from './components/AppNavbar';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Profile from './views/profile/profile';
import Catalog from './views/catalog/Catalog';
import Product from './views/catalog/Product';
import ProductList from './views/catalog/ProductList';
import ProductEdit from './views/catalog/ProductEdit';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    let status = localStorage.getItem('status');

    return (
      <div>
          <Router>
            <div>
              <AppNavbar/>
              <Switch>
                <Route path='/' exact={true} component={Home}/>
                <Route path='/sign-up' exact={true} component={SignUp}/>
                <Route path='/sign-in' exact={true} component={Login}/>
                <Container fluid>
                <Route path='/profile-page' component={Profile}/>
                <Route path='/products' exact={true} component={ProductList}/>
                <Route path='/products/:id' component={ProductEdit}/>
                <Route path='/catalog' exact={true} component={Catalog}/>
                <Route path='/catalog/:id' component={Product}/>
                </Container>
              </Switch>          
            </div>
          </Router>
        </div>
    )
  }
}

export default App;