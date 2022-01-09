import logo from './logo.svg';
import './App.css';
import CryptoConverter from './components/cryptoConverter';
import NewsFeed from './components/newsFeed';

function App() {
  return (
    <div className="App">
      <div className="container">
        <CryptoConverter />
        {/* <NewsFeed /> */}
      </div>
    </div>
  );
}

export default App;
