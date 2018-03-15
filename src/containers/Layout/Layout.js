import React, { Component } from 'react';
import { Aux } from '../../hoc/Auxiliary';
import { Toolbar } from '../../components/Navigation/Toolbar';
import { SideDrawer } from '../../components/Navigation/SideDrawer';

import './Layout.css';

export class Layout extends Component {
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
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
                <main className='Context'>{this.props.children}</main>
            </Aux>
        )
    }
}