import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';

import { Layout } from './containers/Layout';
import { BurgerBuilder } from './containers/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render() {
    return (
      <div>
        <Layout>
          <Route path='/checkout' component={Checkout} />
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/orders' exact component={Orders} />
          <Route path='/auth' exact component={Auth} />
          <Route path='/logout' exact component={Logout} />
        </Layout>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(null, mapDispatchToProps)(App);
