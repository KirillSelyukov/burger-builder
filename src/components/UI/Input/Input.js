import React from 'react';
import './Input.css';

export const input = (props) => {
    let inputElement = null;
    const inputClasses = ['InputElement']
    if (props.shouldvalidate && props.invalid && props.touched) {
        inputClasses.push('Invalid')
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />;
            break;
        case ('textarea'):
            inputElement = <textarea onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />;
            break;
        case ('select'):
            inputElement = (
                <select onChange={props.changed}
                    className={inputClasses.join(' ')}
                    value={props.value}>
                    {props.elementConfig.options.map(op => (
                        <option key={op.value} value={op.value}>
                            {op.displayValue}
                        </option>
                    ))}
                </select>
            )

            break;
        default:
            inputElement = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />;
            break;
    }

    return (
        <div className='Input'>
            <label className='Label'>{props.label}</label>
            {inputElement}
        </div>
    )
}