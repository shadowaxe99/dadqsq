import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CapTable from './components/CapTable';
import ShareholderList from './components/ShareholderList';
import EquityGrants from './components/EquityGrants';
import Settings from './components/Settings';
import authService from './services/authService';
import './styles/main.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogin = async (loginData) => {
    try {
      const user = await authService.login(loginData);
      setCurrentUser(user);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {currentUser ? <Redirect to="/dashboard" /> : <Login onLogin={handleLogin} />}
        </Route>
        <Route path="/dashboard">
          {currentUser ? <Dashboard onLogout={handleLogout} /> : <Redirect to="/" />}
        </Route>
        <Route path="/cap-table">
          {currentUser ? <CapTable /> : <Redirect to="/" />}
        </Route>
        <Route path="/shareholders">
          {currentUser ? <ShareholderList /> : <Redirect to="/" />}
        </Route>
        <Route path="/equity-grants">
          {currentUser ? <EquityGrants /> : <Redirect to="/" />}
        </Route>
        <Route path="/settings">
          {currentUser ? <Settings /> : <Redirect to="/" />}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;