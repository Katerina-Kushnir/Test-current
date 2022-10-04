import './App.css';
import React from 'react';
import PropTypes from 'prop-types';

export const CurrencyInput = (props) => {
    return (
        <div className="group">
            <input type="number" value={props.amount}
                    onChange={e => props.onAmountChange(e.target.value)}/>
            <select value={props.currency} onChange={e => props.onCurrencyChange(e.target.value)}>
                {props.currencies.map((currency => (
                    <option value={currency}>{currency}</option>
                )))}
            </select>
        </div>
    )
}

CurrencyInput.propTypes = {
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.array,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,
}