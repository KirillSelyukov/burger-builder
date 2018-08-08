import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from '../../components/UI/Input';
import { Button } from '../../components/UI/Button';
import { Spinner } from '../../components/UI/Spinner';
import * as actions from '../../store/actions';

import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

import './Auth.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false

            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false

            },

        },
        isSignup: true

    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true

            })
        });

        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            };
        })
    }

    render() {
        const formElements = [];

        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        const form = formElements.map(el => (
            <Input
                key={el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                invalid={!el.config.valid}
                shouldvalidate={el.config.validation}
                touched={el.config.touched}
                changed={(event) => this.inputChangedHandler(event, el.id)} />
        ));
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (<p>{this.props.error.message}</p>);
        }
        const spiner = <Spinner />;
        const authForm = (
            <div className='Auth'>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button className='Success'>Submit</Button>
                </form>
                <Button clicked={this.switchAuthModeHandler} className='Danger'>SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );

        return this.props.loading ? spiner : authForm;
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);