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
				address_entered: false,
				email: '',
				address_entered: false
			};
  }

	handleChange() {
		this.setState({ address_entered: true });
		//scrolls faster then element is added!
		scrollToComponent(this.Map, { offset: -100, align: 'top', duration: 1500});
	};

	render() {
		const { classes } = this.props;
		const map = <Section><h1 style={styles.h1}>Carte</h1><MapGarden/></Section>;
		return (
			<Grid container spacing={20} alignItems="stretch">
				<Grid item xs={12}>
					<Introduction />
				</Grid>
				<Grid item xs={12} sm={6}>
					<GardenerCard/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<LanderCard/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Link to="/project" style={styles.lien}><ShowCard/></Link>
				</Grid>
				<Grid item xs={12} sm={6}>
					<EventsCard/>
				</Grid>
			</Grid>
		);
   	}
}

Home.propTypes = {
	children: PropTypes.node,
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
