import React, { Component } from 'react';

import axios from '../../axios-orders';
import { Spinner } from '../../components/UI/Spinner';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/WithErrorHandler';

class Orders extends Component {
    state = {
        loading: true,
        orders: []
    }

    componentDidMount = () => {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: fetchedOrders })
            })
            .catch(err => {
                this.setState({ loading: false })
            })
    }

    render() {
        if (this.state.loading) {
            return <Spinner />;
        }

        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
