import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Link from "./components/ShortLink";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:shorturl" component={Link} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
