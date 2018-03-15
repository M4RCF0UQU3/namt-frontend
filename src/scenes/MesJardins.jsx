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

class MesJardins extends React.Component{
  constructor(props) {
      super(props);
	  this.getGardens = this.getGardens.bind(this);
  }
  state = {
	data:[]
  };
  componentDidMount() {
	  console.log(this.props.user);
	  if(this.props.connected)
		this.getGardens(this.props.user)
	else 
		alert("oups veuillez vous reconnecter");
  }
  getGardens(user){
	fetch(path+'/getJardins.php?email='+user, {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          },
          credentials: 'include'
        }).then(function(resp){return resp.json()})
			.then(function(data) {
				this.setState({"data": data});
				console.log(this.state);
			}.bind(this))
			.catch(function(error) {
				alert(error);
			}); 
  }

  
  render(){
    const { classes } = this.props;
    const photo = this.state.photo;	
    return(
        <Paper>
          <Grid container spacing={16} alignItems="stretch">
			  {this.state.data.map(jardin => (
					<Grid item xs={6}>  
					<Paper>
						  <img src={jardin.photo} width="90%" height="300px"/>
						  <Table>
								<TableBody>
									<TableRow>
										<TableCell>Nom</TableCell>
										<TableCell>{jardin.nom}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Info</TableCell>
										<TableCell>{jardin.info}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Icon</TableCell>
										<TableCell><Avatar src={jardin.icon} /></TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Surface</TableCell>
										<TableCell>{jardin.surface} m²</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Nombre max de jardiniers</TableCell>
										<TableCell>{jardin.nbmaxjardiniers}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Déscription</TableCell>
										<TableCell>{jardin.description}</TableCell>
									</TableRow>
								</TableBody>
						  </Table>
						  </Paper>
					</Grid>
			  ))}
            
          </Grid>
        </Paper>
    );
  }
}

MesJardins.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
	user: state.user,
	connected: state.connected,
	photo: state.photo
  };
}

export default withRouter(withStyles(styles)(connect(mapStateToProps)(MesJardins)));