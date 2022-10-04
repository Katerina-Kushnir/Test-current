import './App.css';
import { CurrencyInput } from './CurrencyInput';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('UAH');
  const [rates, setRates] = useState([]);
  const [date, setDate] = useState();

  const [cur1, setCur1] = useState('UAH');
  const [cur2, setCur2] = useState('EUR');
  const [cur3, setCur3] = useState('USD');


  useEffect(() => {
    axios.get('https://api.apilayer.com/fixer/latest?base=USD&apikey=WU4kcZQADs2My7hrUJatjP6U2YS2jimB')
    .then(response => {
      setRates(response.data.rates);
      setDate(response.data.date);
    })
  }, [])

  useEffect(() => {
    if (!!rates) {
      handleAmount1Change(1);
    }
  }, [rates])

  const format = (number) => {
    return number.toFixed(2);
  }

  const handleAmount1Change = (amount1) => {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setAmount1(amount1);
  }

  const handleCurrency1Change = (currency1) => {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setCurrency1(currency1)
  }

  const handleAmount2Change = (amount2) => {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setAmount2(amount2);
  }

  const handleCurrency2Change = (currency2) => {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setCurrency2(currency2)
  }

  return (
    <div className='App'>
      <h1>Currency converter</h1>
      <h3>{date}</h3>
      <p>{format(1 * rates[cur1] / rates[cur3])} $ / {format(1 * rates[cur1] / rates[cur2])} €</p>
      <CurrencyInput 
        currencies={Object.keys(rates)} 
        amount={amount1} 
        currency={currency1} 
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
      />
      <CurrencyInput 
        currencies={Object.keys(rates)} 
        amount={amount2} 
        currency={currency2} 
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
      />
    </div>
  );
}

export default App;
