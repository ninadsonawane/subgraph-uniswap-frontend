import './App.css';
import { createClient } from 'urql';
import { useEffect, useState } from 'react';

const API_URI = "https://gateway.thegraph.com/api/209db86b1a3686326c0e4f71c8171410/subgraphs/id/ELUcwgpm14LKPLrBRuVvPvNKHQ9HvwmtKgKSH6123cr7";

const query = `
{
  tokens {
    id
    name
    symbol
    decimals
  }
  rewardTokens {
    id
    token {
      id
    }
    type
  }
}
`

const client = createClient({
  url: API_URI
});

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    async function getData () {   
      const response = await client.query(query).toPromise();
      setData(response.data);
      }
     getData();
  },[])

  return (
    <div >
      <h1>Tokens</h1>
    {
      data?.tokens.map((token) => {
        return ( 
          <div key={token.id}>
            <h4>Name: {token.name}</h4>
            <h4>Symbol: {token.symbol}</h4>
            <h4>Decimals: {token.decimals}</h4>
          </div>
        );
      })
    }
    </div>
  );
}

export default App;
