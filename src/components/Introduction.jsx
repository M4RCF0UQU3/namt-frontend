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

var imagepath = require('../backendPath.js').imagepath

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
};

class Introduction extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        openDialog: false,
        openSnack: false,
        email: ''
      };
  }

  handleClickOpenDialog = () => {
    this.setState({ openDialog: true });
  };

  handleRequestCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  handleRequestCloseSnack = () => {
    this.setState({ openSnack: false });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
    if (event.target.type === 'email') {
      console.log("Email validity:", event.target.validity.valid);
      console.log("Email validation message:", event.target.validationMessage);
    }
  };


  handleSubscription = () => {
    if (!validator.isEmail(this.state.email)) {
        console.log(this.state.email, " is not a valid email.");
        alert("'"+this.state.email + "' is not a valid email.");
        return;
    }

    var request = new Request(__CONFIG__.amtApi.prefixUrl + 'newsletter-api/subscription', {
    	method: 'POST',
      headers: new Headers({
    		'Content-Type': 'application/json'
    	}),
      body: JSON.stringify({
    		email: this.state.email
    	})
    });

    console.log("Request: "+ request);
    this.setState({ openDialog: false });

    fetch(request).then( response => {
	     console.log("Registration OK");
       this.setState({ openSnack: true });
    }).catch( err => {
    	 console.log("Registration KO");
       console.log(err);
    });
  };


  render(){
    const { classes } = this.props;

    const newsletterDialog = (
      <Dialog open={this.state.openDialog} onClose={this.handleRequestCloseDialog}>
          <DialogTitle>Inscription à la Newsletter</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pour s'inscrire à la newslette d'AdopteMaTomate, entrez votre email ici.
              Nous vous écrirons pour vous tenir informés de l'évolution de nos services.
            </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Adresse Email"
                type="email"
                name="email"
                onChange={this.handleChange('email')}
                value={this.state.email}
                fullWidth
                required />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestCloseDialog} color="primary">
              Annuler
            </Button>
            <Button onClick={this.handleSubscription} color="primary">
              S'incrire
            </Button>
          </DialogActions>
        </Dialog>
    )

    const subscribeStatuSnack = (
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openSnack}
          autoHideDuration={4000}
          onClose={this.handleRequestCloseSnack}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Un email vient de vous être envoyé pour valider votre inscription.</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleRequestCloseSnack}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
    )

    return(
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={imagepath+"/images/bille.jpg"}
            title="Présentation"
          />
          <CardContent>
            <Typography type="headline" component="h2">
              Abandonne ta Tomate...
            </Typography>
            <Typography component="p">
              Vu qu'on a été viré, nous faisons de la concurrence !
            </Typography>
          </CardContent>
          <CardActions disableActionSpacing>

              <div className={classes.flexGrow} />
              <Button onClick={this.handleClickOpenDialog}>C'est le newletter</Button>
            </CardActions>
        </Card>
        {newsletterDialog}
        {subscribeStatuSnack}
      </div>
    );
  }
}

Introduction.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Introduction);
