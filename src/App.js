import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { Layout } from './containers/Layout';
import { BurgerBuilder } from './containers/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path='/checkout' component={Checkout} />
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/orders' exact component={Orders} />
          <Route path='/auth' exact component={Auth} />
        </Layout>
      </div>
    );
  }
}

export default App;
