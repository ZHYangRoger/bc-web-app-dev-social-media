import css from './App.module.css';
import React from 'react';
import {useState} from 'react';
//import publicUrl from 'utils/publicUrl';
import initialStore from 'utils/initialStore';
import StoreContextProvider from 'contexts/StoreContext';

import Header from './Header';
import Navbar from './Navbar';
import Home from './Home';

import Explore from './Explore';
import NewPost from './NewPost';
import Activity from './Activity';
import Profile from './Profile';

import uniqueId from 'utils/uniqueId';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App(props){
	//const [page, setPage] = useState('home');

  return (
    <Router basename={process.env.PUBLIC_URL}>
    <StoreContextProvider>
    <div className={css.container}>
      <Header/>
      <main className={css.content}>
        <Switch>
          <Route path="/explore">
            <Explore/>
          </Route>
          <Route path="/newpost">
            <NewPost />
          </Route>
          <Route path="/activity">
            <Activity/>
          </Route>
          <Route path="/profile/:userId?">
            <Profile />
          </Route>
          <Route path="/:postId?">
            <Home />
          </Route>
        </Switch>
      </main>
      <Navbar/>
    </div>
    </StoreContextProvider>
    </Router>
  );
}

export default App;

