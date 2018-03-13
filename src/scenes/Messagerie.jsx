import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import FaceIcon from 'material-ui-icons/Face';
import Avatar from 'material-ui/Avatar';
import ExpansionPanel, {ExpansionPanelDetails,ExpansionPanelSummary,ExpansionPanelActions}  from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import classNames from 'classnames';
import Tabs, { Tab } from 'material-ui/Tabs';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import MessagerieCard from '../components/cards/MessagerieCard.jsx';
var path = require('../backendPath.js').backendpath


const styles = {
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
	},
	whatever: {
		backgroundColor: 'lightgreen',
	}
};

class Messagerie extends React.Component {
	
	constructor(props) {
      super(props);
	  this.loadMessages = this.loadMessages.bind(this);
	  this.getProfilePhoto = this.getProfilePhoto.bind(this);
	  this.getGardenerNumbers = this.getGardenerNumbers.bind(this);
	  this.acceptGardener = this.acceptGardener.bind(this);
	  this.refuseGardener = this.refuseGardener.bind(this);
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
  
	getGardenerNumbers(){
	fetch(path+'/getNombreJardiniersParJardin.php', {credentials: 'include', method: 'get', accept: 'application/json'})
		.then(function(resp){return resp.json()})
		.then(function(data) {
			
			if(data.info!="notconnected"){
				for (let x of data){
					this.setState(prevState => ({
						numberUsers: {
							...prevState.numberUsers,
							[x.id]: x.nbre+ " de "+x.nbrmax
						}
					}))
				}
			}
		
	}.bind(this))
	.catch(function(error) {
		alert(error);
	}); 
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
							//check if it's just a confirmation message:
							if(msg.requete==='t'){
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
						}
						this.setState({ demandesPourJardins: demandesPourmoi});
						this.getProfilePhoto(msg.demandeur);						
					}
					this.getGardenerNumbers();
					
			}.bind(this))
			.catch(function(error) {
				alert(error);
			}); 
   };
	
	acceptGardener(gardener, garden){
		console.log("accept gardener.....");
		//1 send request to add gardener 2 update view by removing demande from state
		console.log(gardener+" in garden "+garden);
		fetch(path+'/addGardener.php?gardener='+gardener+'&garden='+garden, {
			  method: 'GET',
			  headers: {
				Accept: 'application/json'
			  },
			  credentials: 'include'
			}).then(function(resp){return resp.json()}).then(function(data) {
				alert(data.Reponse);
				//UPDATE VIEW
				this.loadMessages();
			}.bind(this))
			.catch(function(error) {
				alert(error);
			}); 
	}
	refuseGardener(gardener, garden){
		
	}
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
						} title={jardin.nom} subheader={this.state.numberUsers[jardin.id]+" jardiniers"}/>
						{jardin.demandes.map(demande =>(
							<Card>
							 <ExpansionPanel style={{backgroundColor: demande.status=='p'?'#fffab3':(demande.status=='a'?'#ccffa9':' #ffc2a9')}}>
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
								<ExpansionPanelActions>{demande.status=='p'?(<div><Button dense>Refuser</Button><Button dense color="primary" onClick={() => this.acceptGardener(demande.demandeur, jardin.id)} >Accepter</Button></div>):(<div><Button dense>Virer cette personne de ce jardin</Button></div>)}

								</ExpansionPanelActions>
							 </ExpansionPanel>
							</Card>
						))}
					</Card>
				</Grid>))}
			</Grid>;
		return (
			<div>  
				<Tabs
				  value={this.state.value}
				  onChange={this.handleChange}
				  fullWidth>
				  <Tab label="Demandes pour mes Jardins" style={styles.tab} />
				  <Tab label="Mes Demandes pour d'autres Jardins" style={styles.tab} />
				</Tabs>
				{value === 0 && demandespourMoi}
				{value === 1 && mesdemandes} 	
				<Grid container spacing={24} alignItems="stretch"> 
				<Grid item xs={12}>
				<Card><Typography type="caption">
				rouge: demande refusée, jaune: demande en attente, vert: demande acceptée
							</Typography></Card>
				</Grid></Grid>
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
