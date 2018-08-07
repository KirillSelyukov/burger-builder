import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Aux } from '../../hoc/Auxiliary';
import { Toolbar } from '../../components/Navigation/Toolbar';
import { SideDrawer } from '../../components/Navigation/SideDrawer';

import './Layout.css';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render() {
    console.log(this.props);
        return (

            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
                <main className='Context'>{this.props.children}</main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const connectedLayout = connect(mapStateToProps)(Layout);

export { connectedLayout as Layout };