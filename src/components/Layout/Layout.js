import React, { Component } from 'react';
import { Aux } from '../../hoc/Auxiliary';
import { Toolbar } from '../Navigation/Toolbar/Toolbar';
import { SideDrawer } from '../Navigation/SideDrawer/SideDrawer';

import './Layout.css';

export class Layout extends Component {

    state = {
        showSideDrawer: true
    }

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    render() {
        return (
            <Aux>
                <Toolbar />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
                <main className='Context'>{this.props.children}</main>
            </Aux>
        )
    }
}