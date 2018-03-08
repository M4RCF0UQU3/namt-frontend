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
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';

//import for scrolling
import scrollToComponent from 'react-scroll-to-component';
//Email Subscription
import validator from 'validator' ;
//Newsletter
//import Newsletter from '../components/Newsletter.jsx';
import Introduction from '../components/Introduction.jsx';

var path = require('../backendPath.js').backendpath


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
	  this.getProfilePhoto = this.getProfilePhoto.bind(this);
	  this.linkbyUser = this.linkbyUser.bind(this);
	}
    state = {
		value: 0,
		demandesPourJardins: [],
		mesDemandes: [],
		user: '',
		avatars: [],
		numberUsers: [],
	  };
	
	componentDidMount(){
		this.loadMessages();
    }
	
	handleChange = (event, value) => {
    this.setState({ value });
  };

  getProfilePhoto(email){
	fetch(path+'/getPhoto.php?email='+email, {credentials: 'include', method: 'get', accept: 'application/json'})
		.then(function(resp){return resp.json()})
		.then(function(data) {
			
			if(data.info!="notconnected"){
				this.setState(prevState => ({
					avatars: {
						...prevState.avatars,
						[email]: data.photo
					}
				}))
				//this.setState({avatars: {...this.state.avatars, {email, data.photo}}});
			}
		
	}.bind(this))
	.catch(function(error) {
		alert(error);
	}); 
  }
  linkbyUser(user){
	  for (name of state.avatars){
		  if (name[0] == user)
			return name[1]; 
	  }
	  return "none";
  }
  loadMessages() {
		fetch(path+'/getMessages.php', {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          },
          credentials: 'include'
        }).then(function(resp){return resp.json()})
				.then(function(data) {
					//trier entre demandes pour Jardins et mes demandes. et creer un objet par jardin
					let demandesPourmoi = [];
					for (let msg of data.message){				
						if(msg.demandeur==this.props.user){
							this.setState({ mesDemandes: [...this.state.mesDemandes,msg]});	
						} else {
							//check if id of garden is in array of demandes
							let found = demandesPourmoi.find(function(element) {
							  return element.id === msg.id_jardin;
							});
							//doesnt exist
							if (typeof found === 'undefined'){
								demandesPourmoi.push({
									id: msg.id_jardin,
									nom: msg.nom_jardin,
									icon: msg.icon_jardin,
									demandes: [msg]
								});
							} else {
								found.demandes.push(msg);
							}
						}
						this.setState({ demandesPourJardins: demandesPourmoi});
						this.getProfilePhoto(msg.demandeur);						
					}
					
			}.bind(this))
			.catch(function(error) {
				alert(error);
			}); 
   };
	render() {
		const { value } = this.state;
		const { classes } = this.props;
		const avs = this.state.avatars;
		
		const mesdemandes = this.state.mesDemandes.map( message =>(
			<Grid container spacing={24} alignItems="stretch">
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
							<Avatar src={this.state.avatars[message.demandeur]}/>
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
			</Grid>));
			
		const demandespourMoi = 
			<Grid container spacing={24} alignItems="stretch"> 
				{this.state.demandesPourJardins.map( jardin =>(
				<Grid item xs={12}>
					<Card>
						<CardHeader
						avatar={
						  <Avatar src={jardin.icon}/>
						} title={jardin.nom} subheader="5/6 Jardiniers actifs dans ce jardin" />
						{jardin.demandes.map(demande =>(
							<Card>
							 <ExpansionPanel>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
									<div className={classes.column}>
									<Typography className={classes.heading}>{demande.sujet}</Typography>
							  </div>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails className={classes.details}>
								  
								  <div className={classes.column}>
									<Avatar src={this.state.avatars[demande.demandeur]}/>
								  </div>
								  <div className={classNames(classes.column2, classes.helper)}>
									<Typography type="caption">
									  {demande.commentaire}
									</Typography>
								  </div>
								</ExpansionPanelDetails>
								<Divider />
								<ExpansionPanelActions>
								  <Button dense>Refuser</Button>
								  <Button dense color="primary">Accepter</Button>
								</ExpansionPanelActions>
							 </ExpansionPanel>
							</Card>
						))}
					</Card>
				</Grid>))}
			</Grid>;
		return (
			<div>  <Tabs
          value={this.state.value}
  
          onChange={this.handleChange}
		  fullWidth>
          <Tab label="Demandes pour mes Jardins" style={styles.tab} />
          <Tab label="Mes Demandes pour d'autres Jardins" style={styles.tab} />
        </Tabs>
		{value === 0 && demandespourMoi}
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
