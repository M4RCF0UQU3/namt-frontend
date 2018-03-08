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
import InfoIcon from 'material-ui-icons/Info';
import ListLanderOwner from '../components/ListLanderOwner.jsx';
import ListLanderExploit from '../components/ListLanderExploit.jsx';
{/*import Test from '../components/Test.jsx';*/}


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
	  this.getProfilePhoto = this.getProfilePhoto.bind(this);
  }
  
  state = {
		photo: '',			//profile image
		accountType: 'user',	//profile type
		user: '',
		connected: false
	};
  
  getProfilePhoto(email){
	fetch(path+'/getPhoto.php?email='+email, {credentials: 'include', method: 'get', accept: 'application/json'})
		.then(function(resp){return resp.json()})
		.then(function(data) {
			if(data.info!="notconnected")
				this.setState({photoLink: data.photo});
		
	}.bind(this))
	.catch(function(error) {
		alert(error);
	}); 
  }
  componentDidMount() {
	  console.log("disconnect dispatched");
	  this.props.dispatch({ type: 'DISCONNECT' });
  }


  render(){
    const { classes } = this.props;
    const photo = this.state.photo;	
    return(
      <div>
        <Card className={classes.card}>
          <Grid container spacing={16} alignItems="stretch">
            <Grid item xs={12}>
              <CardMedia
                className={classes.media}
                image={photo}
                title=""
              />
              <CardContent>
                <Avatar alt="Chat" src={this.props.photo} className={classes.bigAvatar} />
                <Typography type="headline" component="h3">
                  Michel
                </Typography>
                <Typography component="p">
                  petite phrase d'accroche
                </Typography>
              </CardContent>
			  <Button onClick={() => console.log(this.props)}>touch me </Button>
            </Grid>
              
            <Grid item xs={12}>

              <Typography type="headline" component="h3">
                Propriétaire des jardins suivants :
              </Typography>
              <ListLanderOwner/>

            </Grid>

            <Grid item xs={12}>

              <Typography type="headline" component="h3">
                Exploite les jardins suivants :
              </Typography>
              <ListLanderExploit/>

            </Grid>  

            <Grid item xs={12}>

              <Typography type="headline" component="h3">
                Évaluations 
              </Typography>
     
            </Grid>
          </Grid>
        </Card>
      </div>
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

export default withStyles(styles)(connect(mapStateToProps)(ProfilUserPublic));