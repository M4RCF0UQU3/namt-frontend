import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  browserHistory,
  Route,
  Link
} from 'react-router-dom'
import Header from "./Header";
import Footer from "./Footer";
import Home from "../scenes/Home";
import Project from "../scenes/Project";
import Events from "../scenes/Events";
import SignScreen from "../scenes/SignScreen";
import ProfilUserPublic from "../scenes/ProfilUserPublic";
import SearchGarden from "../scenes/Users/SearchGarden";
import ProfilUserPrivate from "../scenes/Users/Home"
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const styles = {
  container: {
    textAlign: 'center',
  	backgroundColor: '#F5F5F5',
  },

  main: {
    paddingTop:'80px',
  },
}

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <div style={styles.container}>
          <Header/>
          <div style={styles.main}>
            <Route exact path='/' component={Home}/>
            <Route exact path='/events' component={Events}/>
            <Route exact path='/prensentation' component={Events}/>
            <Route exact path='/project' component={Project}/>
            <Route  path='/signin' component={SignScreen}/>
            <Route exact path='/profil' component={ProfilUserPublic}/>
            <Route  path='/search_garden' component={SearchGarden}/>
            <Route exact path='/accueilUser' component={ProfilUserPrivate}/>
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default (App);
