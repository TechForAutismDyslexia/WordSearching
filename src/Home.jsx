import { Link } from 'react-router-dom';
import './Home.css';
// import Confetti from 'react-confetti';

function Home() {
  return (
    <>
    {/* <Confetti/> */}
    <div className="App1">
      <div className="header-container">
        <h1 className='head1'>Word Search</h1>
        <img src="word_search icon.png" alt="Search Icon"  className='image'/>
      </div>
      <h3>Welcome to the Puzzle Game</h3>
      <Link to="/game1">
        <button className="Start-button">Start</button>
      </Link>
    </div>
    </>
  );
}

export default Home;