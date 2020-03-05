import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App'
import Counter from './containers/Counter';


export default (
  <Route path='/'>
    <Route component={App}>
      <IndexRoute component={Counter} />
      <Route path='counter' component={Counter}/>
    </Route>
  </Route> 
)