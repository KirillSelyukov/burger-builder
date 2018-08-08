import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Layout } from './containers/Layout';
import { BurgerBuilder } from './containers/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/auth' exact component={Auth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      console.log('APP:')
      routes = (
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' exact component={Orders} />
          <Route path='/logout' exact component={Logout} />
          <Route path='/' exact component={BurgerBuilder} />
        </Switch>
      );

    }
    return (
      <div>
        <Layout>
          {routes}
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
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
