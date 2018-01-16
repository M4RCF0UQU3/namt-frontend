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

const styles = {
  card: {
    margin: 'auto 10px',
    marginBottom: '20px'
  },
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
      this.state = {
        openDialog: false,
        openSnack: false,
        email: ''
      };
  }


  render(){
    const { classes } = this.props;

    return(
      <div>
        <Card className={classes.card}>
          <Grid container spacing={20} alignItems="stretch">
            <Grid item xs={12} sm={12}>

              <Avatar alt="Chat" src="/images/chat.png" className={classes.bigAvatar} />

              <Typography type="headline" component="h2">
                Michel
              </Typography>

              <Typography type="headline" component="h3">
                Propriétaire des jardins suivants :
              </Typography>
              <ListLanderOwner/>

              <Typography type="headline" component="h3">
                Exploite les jardins suivants :
              </Typography>
              <ListLanderExploit/>

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

export default withStyles(styles)(ProfilUserPublic);