import './App.css';

//IMPORT BROWSERROUTER
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//IMPORT
import NavBar from './components/navBar/navBar';
import Categories from './components/categories/categories';
import CreateRoom from './components/createRoom/createRoom';
import CreateCategory from './components/createCategory/createCategory';
import RoomList from './components/categories/roomList';
import SelectedPayCost from './components/categories/selectedPayCost';
import Rooms from './components/rooms/rooms';


function App() {
  return (
    <div>
      <Router>
          <NavBar/>
          <section>
            <Switch>
              <Route path = "/" component={Categories} exact/>
              <Route path = "/create-room" component={CreateRoom} />
              <Route path = "/create-category" component={CreateCategory} />
              <Route path="/room/:id" component={RoomList} exact/>
              <Route path="/cost/:id/:cid" component={SelectedPayCost}/>
              <Route path="/view-room" component={Rooms}/>
            </Switch>
          </section>
      </Router>
    </div>
  );
}

export default App;
