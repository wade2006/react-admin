import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Admin from './pages/admin/Admin'
import Login from './pages/login/Login'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
      {/* Switch只匹配其中的某一个 */}
   <Switch>  
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
          </Switch>

      </BrowserRouter>
    );
  }
}

export default App;

