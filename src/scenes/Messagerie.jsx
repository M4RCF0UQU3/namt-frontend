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

import FaceIcon from 'material-ui-icons/Face';
import Avatar from 'material-ui/Avatar';

import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
}  from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Chip from 'material-ui/Chip';
import classNames from 'classnames';

import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

//Cards
import MainPageCard from "../components/cards/MainPageCard.jsx";

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
    },	
	tab: {
		maxWidth: 1000,
	},
	column: {
		flexBasis: '33.3%',
	},	
	column2: {
		flexBasis: '66.6%',
		textAlign: 'left'
	}
};

class Messagerie extends React.Component {
	constructor(props) {
      super(props);
	}
    state = {
		value: 0,
	  };

	handleChange = (event, value) => {
    this.setState({ value });
  };

	render() {
		const { value } = this.state;
		const { classes } = this.props;
		const mesjardins = 	(<Grid container spacing={24} alignItems="stretch">
				<Grid item xs={12}>
					<MainPageCard>
					 <ExpansionPanel>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<div className={classes.column}>
							<Typography className={classes.heading}>Votre jardin est trop beau!</Typography>
					  </div>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails className={classes.details}>
					  
					  <div className={classes.column}>
						<Avatar> <FaceIcon /> </Avatar>
					  </div>
					  <div className={classNames(classes.column2, classes.helper)}>
						<Typography type="caption">
						  node_modules/leaflet/dist/images/layers-2x.png
(Emitted value instead of an instance of Error) DEPRECATED. Configure optipng's optimizationLevel option in its own options. (optipng.optimizationLevel)
 @ ./node_modules/css-loader!./node_modules/leaflet/dist/leaflet.css 6:8782-
						</Typography>
					  </div>
					</ExpansionPanelDetails>
					<Divider />
					<ExpansionPanelActions>
					  <Button dense>Accepter</Button>
					  <Button dense color="primary">Refuser</Button>
					</ExpansionPanelActions>
				  </ExpansionPanel>
				  
					</MainPageCard>
				</Grid>
				<Grid item xs={12}>
					<MainPageCard>Jardin 2</MainPageCard>
				</Grid>
			</Grid>);
		const mesdemandes = (<Grid container spacing={24} alignItems="stretch">
				<Grid item xs={12}>
					<MainPageCard>Demande 1</MainPageCard>
				</Grid>
				<Grid item xs={12}>
					<MainPageCard>Demande 2</MainPageCard>
				</Grid>
			</Grid>);
		return (
			<div>  <Tabs
          value={this.state.value}
  
          onChange={this.handleChange}
		  fullWidth
		  
        >
          <Tab label="Demandes pour mes Jardins" style={styles.tab} />
          <Tab label="Mes Demandes pour d'autres Jardins" style={styles.tab} />
        </Tabs>
		{value === 0 && mesjardins}
        {value === 1 && mesdemandes} 	
			</div>
		);
   	}
}

Messagerie.propTypes = {
	children: PropTypes.node,
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Messagerie);
