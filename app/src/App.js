import Register from "./components/Register";
import Home from "./components/Home";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { PrivateRoute } from "./auth/PrivateRoute";
import { Equipment } from "./components/Equipment";

function App() {
  return (
    <div>
      <H1>Use My Tech Stuff</H1>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Register" component={Register} />
        <PrivateRoute path="/Equipment" component={Equipment} />
      </Switch>
    </div>
  );
}

const H1 = styled.h1`
  font-size: 3rem;
  color: black;
`;

export default App;
