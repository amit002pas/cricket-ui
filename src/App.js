import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Signup from './components/Signup'
import store from './store/store'
import CakeComponent from './components/CakeComponent';
import { Provider} from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MatchScheduleComponent from './components/MatchScheduleComponent'



function App() {
  return (
    <Provider store={store}>
    <div className="App">
    <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/matchschedule" component={MatchScheduleComponent}/>
                    <Route component={Error}/>
                </Switch>
            </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
