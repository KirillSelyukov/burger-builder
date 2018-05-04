import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import { Spinner } from '../../components/UI/Spinner';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/WithErrorHandler';

import * as actions from '../../store/actions';

class Orders extends Component {
    componentDidMount = () => {
        this.props.onFetchingOrders();
    }

    render() {
        if (this.props.loading) {
            return <Spinner />;
        }

        return (
            <div>
                {this.props.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchingOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
