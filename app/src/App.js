import "./App.css";
import Register from './component/Register'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div>
      <h1>Use My Tech Stuff</h1>
      <Link to='/'>Home</Link>
      <Link to='/Register'>Register</Link>
    </div>
  );
}

export default App;
