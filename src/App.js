import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { Layout } from './containers/Layout';
import { BurgerBuilder } from './containers/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path='/checkout' component={Checkout} />
          <Route path='/' exact component={BurgerBuilder} />
        </Layout>
      </div>
    );
  }
}

export default App;
