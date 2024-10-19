import './App.css';
import { useEffect, useState } from 'react';
import Table from './Components/Table';

function App() {

  const [Exchange, setExchange] = useState(null);
  const [ExchangeIcon, setExchangeIcon] = useState(null);
  const [filterExchange, setFilterExchange] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filterExchangeFunction = () =>{
    console.log(Exchange);
    let result = Exchange?.filter((item) =>
      item?.name ? (item.name.toLowerCase().includes(searchTerm.toLowerCase())) : []
    );
    setFilterExchange(result);
  }

  useEffect(() =>{
    fetchExchangeIcon();
    fetchExchange();
  }, []);

  const fetchExchange = async () => {
    const url = 'https://rest.coinapi.io/v1/exchanges';
    const headers = {
      'Accept': 'text/plain',
      'X-CoinAPI-Key': 'ba02b299-867a-4034-bee3-f03164738883', // Replace with your API key
    };

    try {
      const response = await fetch(url, { method: 'GET', headers });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      setExchange(result); // Set the fetched data to the state
      setFilterExchange(result);
    } catch (error) {
      setError(error.message); // Set any error that occurs
    }
  };


  const fetchExchangeIcon = async () => {
    const url = 'https://rest.coinapi.io/v1/assets/icons/32';
    const headers = {
      'Accept': 'text/plain',
      'X-CoinAPI-Key': 'ba02b299-867a-4034-bee3-f03164738883', // Replace with your API key
    };

    try {
      const response = await fetch(url, { method: 'GET', headers });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      setExchangeIcon(result); // Set the fetched data to the state
    } catch (error) {
      setError(error.message); // Set any error that occurs
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <input value={searchTerm} onChange={(e) =>{
                        setSearchTerm(e.target.value)
                    }}/> <button onClick={ () => filterExchangeFunction()}>Filter</button>
        <Table data={{"Exchange": filterExchange, 'cols': 3, 'rowName': {"sn":"SN", "name":'Name', "data_symbols_count":"Price"}, 'ExchangeIcon': ExchangeIcon}}/>
      </header>
    </div>
  );
}

export default App;
