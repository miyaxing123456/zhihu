import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
const Index = React.lazy(() => import('./pages/index/index'))
const Detail = React.lazy(() => import('./pages/detail/detail'))
const Comment = React.lazy(() => import('./pages/comment/comment'))
const Collection = React.lazy(() => import('./pages/collection/collection'))

function App() {
  return (
    <div className="App">
      <Switch>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Route path='/index' component={Index}></Route>
          <Route path='/detail' component={Detail}></Route>
          <Route path='/comment' component={Comment}></Route>
          <Route path='/collection' component={Collection}></Route>
          <Redirect to="/index"></Redirect>
        </React.Suspense>
      </Switch>
    </div>
  );
}

export default App;
