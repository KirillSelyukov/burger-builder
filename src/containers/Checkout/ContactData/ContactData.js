import React, { Component } from 'react';
import { Button } from '../../../components/UI/Button';

import './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        }
    }

    render() {
        return (
            <div className='ContactData'>
                <h4>Enter Your Contact Data</h4>
                <form>
                    <input className='Input' type="text" name='name' placeholder='Your Name' />
                    <input className='Input' type="text" name='email' placeholder='Your Email' />
                    <input className='Input' type="text" name='street' placeholder='Your Street' />
                    <input className='Input' type="text" name='postalCode' placeholder='Your Postal Code' autoComplete='postalCode' />
                    <Button className='Success'>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;
