import { Link } from 'react-router-dom';
import './Completed.css';

function Completed(){
    return(
        <div className="all-levels-completed">
      <h1>All Levels Completed!</h1>
      <h2>Congratulations !!!</h2>
      <Link to="/"> 
        <button>Replay</button> 
      </Link>
    </div>
    );
}

export default Completed;