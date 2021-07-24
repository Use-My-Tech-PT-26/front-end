import "./App.css";
import Register from './components/Register'
import Home from './components/Home'
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <h1>Use My Tech Stuff</h1>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='Register' component={Register} />
      </Switch>
    </div>
  );
}

export default App;
