import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Section from "../components/tools/Section.jsx";
import MapGarden from "../components/MapGarden.jsx";
import Input from 'material-ui/Input';
import Send from 'material-ui-icons/Send';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import Grid from 'material-ui/Grid';


//Cards
import ShowCard from "../components/cards/ShowCard.jsx";
import GardenerCard from "../components/cards/GardenerCard.jsx";
import LanderCard from "../components/cards/LanderCard.jsx";
import EventsCard from "../components/cards/EventsCard.jsx";
import ValueCard from "../components/cards/ValueCard.jsx";

//import for scrolling
import scrollToComponent from 'react-scroll-to-component';
//Email Subscription
import validator from 'validator' ;
//Newsletter
//import Newsletter from '../components/Newsletter.jsx';
import Introduction from '../components/Introduction.jsx';
import { fade } from 'material-ui/utils/colorManipulator';

const styles = {
	container: {
		backgroundImage: 'url(images/setzlinge.jpeg)',
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
	},
	lien: {
    	textDecoration: 'none',
    	color: 'inherit',
  	},
	root: {
		flexGrow: 1,
		marginTop: 30,
    }
};

class Home extends React.Component {
	constructor(props) {
      super(props);
      this.state = {
			
			};
  }

	handleChange() {
		
	};

	render() {
		const { classes } = this.props;
		
		return (
			fade
		);
   	}
}

Home.propTypes = {
	children: PropTypes.node,
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
