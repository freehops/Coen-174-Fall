import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home'
import Playlist from './pages/Playlist'

const App = () => {

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/playlist">
            <Playlist/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
    


        


      </div>
    </Router>
  );
}

export default App;