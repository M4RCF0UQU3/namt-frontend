import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import validator from 'validator' ;
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import { SocialIcon } from 'react-social-icons';
import Snackbar from 'material-ui/Snackbar';
import CloseIcon from 'material-ui-icons/Close';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import { 
  GridList, 
  GridListTile, 
  GridListTileBar
} from 'material-ui/GridList';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import InfoIcon from 'material-ui-icons/Info';
import List, { ListItem, ListItemText } from 'material-ui/List';
{/*import Test from '../components/Test.jsx';*/}
import {withRouter} from 'react-router';
import { connect } from 'react-redux';


var path = require('../backendPath.js').backendpath

const styles = {
  media: {
    height: '30vh',
  },
  info: {
    fontStyle: 'italic',
  },

  flexGrow: {
    flex: '1 1 auto',
  },
  button: {
	backgroundColor: 'red'
  },

  indication: {
    fontWeight: 'bold',
    paddingTop: '50px',
  	position: 'absolute',
  	bottom: '0',
  	right: '0',
  	left: '0',
  	marginBottom: '20px'
  },

  icons: {
  	width: 'unset',
  	height: 'unset',
  	margin: '10px'
  },

  close: {
    width: 4,
    height: 4,
  },
  tests: {
	  backgroundColor: 'red'
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },

  avatar: {
    margin: 10,
  },

  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto',
  },

  imageProfil: {
    height: '50px',
    width: '50px',
  },
};

class ProfilUserPublic extends React.Component{
  constructor(props) {
      super(props);
	  this.getProfileInformation = this.getProfileInformation.bind(this);
	  this.getGardenerNumbers = this.getGardenerNumbers.bind(this);
	  this.getEvaluations = this.getEvaluations.bind(this);
	  this.sendMessage = this.sendMessage.bind(this);
  }
  state = {
	"nombreJardiniers":0,	
	"evaluation": [null, null],
	"evaluationLoaded": false,
	"dialogOpen": false,
	"id": -1,
	"message":"",
	"sujet":"",
  };
  componentDidMount() {
	  if (typeof this.props.location.id === 'undefined'){
		 alert("oups...un petit problème est apparu. Retour au page d'acceuil");
		this.props.history.push("/");
	  }
	  this.getProfileInformation(this.props.location.id);
	  this.setState({"id":this.props.location.id});
	  
  }
  getProfileInformation(id){
	fetch(path+'/getSingleGarden.php?id='+id, {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          },
          credentials: 'include'
        }).then(function(resp){return resp.json()})
			.then(function(data) {
				this.setState(data[0]);
				this.getGardenerNumbers(id);
				this.getEvaluations(id);
			}.bind(this))
			.catch(function(error) {
				alert(error);
			}); 
  }
  getEvaluations(id){
	  fetch(path+'/getGardenEvaluations.php?id='+id, {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          },
          credentials: 'include'
        }).then(function(resp){return resp.json()})
			.then(function(data) {
				this.setState(data);
				
				this.setState({evaluationLoaded: true});
				console.log(this.state);
			}.bind(this))
			.catch(function(error) {
				alert(error);
			}); 
  }
  
  getGardenerNumbers(id){
	fetch(path+'/getNombreJardiniersParJardin.php?id='+id, {credentials: 'include', method: 'get', accept: 'application/json'})
		.then(function(resp){return resp.json()})
		.then(function(data) {	
			if(data.info!="notconnected"){
				this.setState({"nombreJardiniers":data.nbre});
				console.log(data.nbre);
			}
		
	}.bind(this))
	.catch(function(error) {
		alert(error);
	}); 
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = event => {
    this.setState({ message: event.target.value });
  };
  handleSubChange = event => {
    this.setState({ sujet: event.target.value });
  };
  sendMessage(){
	  if(this.state.message=='' || this.state.sujet==''){
		  alert("S'il vous plait ca sert a rien de pas mettre un sujet ou un message!");		  
	  } else {
		this.handleClose();
		  let formData  = new FormData();
		  console.log("forming");
		  console.log(this.state.id);
		  formData.append("jardin", this.state.id);
		  formData.append("message", this.state.message);
		  formData.append("sujet", this.state.sujet);
		  fetch(path+'/sendMessage.php', {method: 'post', body: formData, credentials: 'include'})
			.then(function(resp){return resp.json()})
			.then(function(data) {	
					console.log(data);
					alert(data.Reponse);
			}.bind(this))
			.catch(function(error) {
				alert(error);
			}); 
	  }
  };
  
  render(){
    const { classes } = this.props;
    const photo = this.state.photo;	
    return(
        <Paper>
          <Grid container spacing={16} alignItems="stretch">
            <Grid item xs={6}>
              <Typography type="headline" component="h1">
			  {this.state.gardenname}
              </Typography>			
			  <Typography>
				{this.state.gardeninfo}
              </Typography>	
			  <Table>
					<TableBody>
						<TableRow>
							<TableCell>Proprietaire</TableCell>
							<TableCell>{this.state.userfirstname} {this.state.username}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Adresse</TableCell>
							<TableCell>{this.state.gardenaddress}, {this.state.city}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Surface</TableCell>
							<TableCell>{this.state.surface} m²</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Nombre de jardiniers</TableCell>
							<TableCell>{this.state.nombreJardiniers} sur {this.state.gardenmaxgardeners}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Déscription</TableCell>
							<TableCell>{this.state.gardendescription}</TableCell>
						</TableRow>
					</TableBody>
			  </Table>
            </Grid>
              
            <Grid item xs={6}>
				<img src={this.state.gardenphoto} width="90%" />
            </Grid>

            <Grid item xs={6}>
				<Typography type="title" component="h3">Commentaires</Typography>
				{this.state.evaluationLoaded?(this.state.evaluation.map(comment => (
						<ListItem>
						  <Avatar src={comment.icon}/>
					<ListItemText primary={comment.note+"/5"} secondary={comment.commentaire} />
						</ListItem>	
					))):""}
            </Grid>  
				
            <Grid item xs={6}>
				
              <Typography type="title" component="h3">
				Note: {this.state.moyenne} / 5
              </Typography><br/>	<br/>	
			<Button dense onClick={this.handleClickOpen}className={classes.button} >Composer une demande</Button>
			<Dialog
			  open={this.state.open}
			  onClose={this.handleClose}
			  aria-labelledby="form-dialog-title"
			>
			  <DialogTitle id="form-dialog-title">Demande de Jardinage à {this.state.userfirstname} {this.state.userfirstname} pour le jardin {this.state.gardenname}</DialogTitle>
			  <DialogContent>
				<TextField
				  autoFocus
				  margin="dense"
				  placeholder="Sujet"
				  type="email"
				  fullWidth
				  value={this.state.sujet} 
				  onChange={this.handleSubChange}
				/>
				<TextField
				  margin="dense"
				  placeholder="Mon Message"
				  type="email"
				  fullWidth
				  multiline="true"
				  value={this.state.message} 
				  onChange={this.handleChange}
				/>
			  </DialogContent>
			  <DialogActions>
				<Button onClick={this.handleClose} color="primary">
				  Annuler
				</Button>
				<Button onClick={this.sendMessage} color="primary">
				  Envoyer
				</Button>
			  </DialogActions>
			</Dialog>
            </Grid>
          </Grid>
        </Paper>
    );
  }
}

ProfilUserPublic.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
	user: state.user,
	connected: state.connected,
	photo: state.photo
  };
}

export default withRouter(withStyles(styles)(connect(mapStateToProps)(ProfilUserPublic)));