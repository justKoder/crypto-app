import { useState } from 'react';

import axios from 'axios';

import ExchangeRate from "./exchangeRate";

const CryptoConverter = () => {
    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA', 'INR']

    const [chosenPrimaryKey, setChosenPrimaryKey] = useState('BTC');
    const [chosenSecondaryKey, setChosenSecondaryKey] = useState('BTC');
    const [amount, setAmount] = useState(1);
    const [exchangeRate, setExchangeRate] = useState(0);
    const [result, setResult] = useState(0);

    // console.log(result)
    // console.log(amount)

    const convert = () => {

        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: { to_currency: chosenSecondaryKey, function: 'CURRENCY_EXCHANGE_RATE', from_currency: chosenPrimaryKey },
            headers: {
                'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
                'x-rapidapi-key': 'ed562813f2msha3e7dd71c34d9a8p1ee9b3jsnc469401eb357'
            }
        };
        axios.request(options).then((response) => {
            // console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount);
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <div className="crypto-converter">
            <h3>Currency Converter</h3>
            <div className="table">
                <table>
                    <tbody>
                        <tr>
                            <td className="td">Primary Key: </td>
                            <td>
                                <input value={amount} type="number" onChange={(e) => setAmount(e.target.value)} />
                            </td>
                            <td>
                                <select value={chosenPrimaryKey} name="crypto-currency-1" onChange={(e) => setChosenPrimaryKey(e.target.value)}>
                                    {currencies.map(((currency, _Index) => {
                                        return (
                                            <option key={_Index} value={currency}>{currency}</option>
                                        )
                                    }))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className="td">Secondary Key: </td>
                            <td>
                                <input value={result} disabled={true} />
                            </td>
                            <td>
                                <select value={chosenSecondaryKey} name="crypto-currency-2" onChange={(e) => setChosenSecondaryKey(e.target.value)}>
                                    {currencies.map(((currency, _Index) => {
                                        return (
                                            <option key={_Index} value={currency}>{currency}</option>
                                        )
                                    }))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="btn">
                    <button id="convert-button" onClick={convert}>Convert</button>
                </div>
            </div>
            <ExchangeRate exchangeRate={exchangeRate} setExchangeRate={setExchangeRate} />
        </div>
    )
}

export default CryptoConverter;
