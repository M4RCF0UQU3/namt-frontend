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

import { connect } from 'react-redux';

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
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

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
		marginRight: 20,
	},	
	column2: {
		flexBasis: '66.6%',
		textAlign: 'left'
	}
};

class Messagerie extends React.Component {
	constructor(props) {
      super(props);
	  this.loadMessages = this.loadMessages.bind(this);
	}
    state = {
		value: 0,
		demandesPourJardins: [],
		mesDemandes: [],
		user: ''
	  };
	
	componentDidMount(){
		this.loadMessages();
    }
	
	handleChange = (event, value) => {
    this.setState({ value });
  };

  getProfilePhoto(email){
	fetch('http://localhost/namt-backend/getPhoto.php?email='+email, {credentials: 'include', method: 'get', accept: 'application/json'})
		.then(function(resp){return resp.json()})
		.then(function(data) {
			if(data.info!="notconnected")
				return data.photo;
		
	}.bind(this))
	.catch(function(error) {
		alert(error);
	}); 
  }
  
  loadMessages() {
		fetch('http://localhost/namt-backend/getMessages.php', {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          },
          credentials: 'include'
        }).then(function(resp){return resp.json()})
				.then(function(data) {
					console.log(this.props.user)
					//trier entre demandes pour Jardins et mes demandes.
					for (let msg of data.message){
						if(msg.demandeur==this.props.user){
							this.setState({ mesDemandes: [...this.state.mesDemandes,msg]});
							
						} else {
							this.setState({ demandesPourJardins: [...this.state.demandesPourJardins,msg]});
						}
						console.log(msg);
					}				
			}.bind(this))
			.catch(function(error) {
				alert(error);
			}); 
   };
	render() {
		const { value } = this.state;
		const { classes } = this.props;
		const mesjardins = 	this.state.demandesPourJardins.map( message => (<Grid container spacing={24} alignItems="stretch">
				<Grid item xs={12}>
					<Card>
						 <ExpansionPanel>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<div className={classes.column}>
								<Typography className={classes.heading}>{message.date} {message.sujet}</Typography>
						  </div>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails className={classes.details}>
						  
						  <div className={classes.column}>
							<Avatar> <FaceIcon /> </Avatar>
						  </div>
						  <div className={classNames(classes.column2, classes.helper)}>
							<Typography type="caption">
							  {message.commentaire}
							</Typography>
						  </div>
						</ExpansionPanelDetails>
						<Divider />
						<ExpansionPanelActions>
						  <Button dense>Accepter</Button>
						  <Button dense color="primary">Refuser</Button>
						</ExpansionPanelActions>
					  </ExpansionPanel>
					</Card>
				</Grid>
			</Grid>));
		const mesdemandes = this.state.mesDemandes.map( message =>(<Grid container spacing={24} alignItems="stretch">
				<Grid item xs={12}>
					<Card>
						 <ExpansionPanel>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<div className={classes.column}>
								<Typography className={classes.heading}>{message.sujet}</Typography>
						  </div>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails className={classes.details}>
						  
						  <div className={classes.column}>
							<Avatar> <FaceIcon /> </Avatar>
						  </div>
						  <div className={classNames(classes.column2, classes.helper)}>
							<Typography type="caption">
							  {message.commentaire}
							</Typography>
						  </div>
						</ExpansionPanelDetails>
						<Divider />
						<ExpansionPanelActions>
						  <Button dense>Supprimer</Button>
						  <Button dense color="primary">Retirer</Button>
						</ExpansionPanelActions>
					  </ExpansionPanel>
					</Card>
				</Grid>
				<Grid item xs={12}>
					<Card>Demande 2</Card>
				</Grid>
			</Grid>));
		return (
			<div>  <Tabs
          value={this.state.value}
  
          onChange={this.handleChange}
		  fullWidth>
          <Tab label="Demandes pour mes Jardins" style={styles.tab} />
          <Tab label="Mes Demandes pour d'autres Jardins" style={styles.tab} />
        </Tabs>
		{value === 0 && mesjardins}
        {value === 1 && mesdemandes} 	
			</div>
		);
   	}
}

function mapStateToProps(state) {
  return {
	connected: state.connected,
	user: state.user
  };
}

Messagerie.propTypes = {
	children: PropTypes.node,
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)((connect(mapStateToProps)(Messagerie)));
