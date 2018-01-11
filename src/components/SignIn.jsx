import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import validator from 'validator' ;
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Toolbar from 'material-ui/Toolbar';
import Grid from 'material-ui/Grid';
import { green, red } from 'material-ui/colors';
import { withRouter } from 'react-router'

import {browserHistory} from 'react-router-dom';

const primary = green[500];
const accent = red['A200'];

const styles = theme => ({
  form: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  }),

  container: theme.mixins.gutters({
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    paddingRight: 0,
    paddingLeft: 0,
  }),

  mainGrid: theme.mixins.gutters({
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0,
    margin: 0,
  }),

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },

  links: {
    width: '100%',
  },

  header: {
    width: '100%',
    backgroundColor: accent,
    padding: theme.spacing.unit * 1,
    margin: 0,
  }

});
class SignIn extends React.Component{
  constructor(props) {
      super(props);
      this.state = { email: '', password: '' };
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.forward = this.forward.bind(this);
  };
  forward() {
	  alert(this.prop.pute);
  }
	

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });

  };
  handleSubmit() {
	//I NEED A FUCKING COPY OF THIS 
	var samere = this.props.pute;
	//alert(samere);
	  var tamere = this.forward();
	  	fetch('http://localhost/namt-backend/TraitConnexion.php?email='+this.state.email+'&password='+this.state.password, {
				method: 'get'}, {mode: 'cors'}
				)
				.then(function(resp){return resp.text()})
				.then(function(data) {
				if(data=="Connection refused")
					alert("Vous identifiants ne sont pas corrects");
				else{
					alert(samere);
				}
				
			})
			.catch(function(error) {
				alert(error);
			}); 
  };


  render(){
      const { classes } = this.props;

      return(
          <Paper className={classes.container} elevation={4}>
            <div className={classes.header}>
              <Typography type="headline" component="h3">
                  Login
              </Typography>
            </div>

            <form className={classes.form} noValidate autoComplete="off">
              <div>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Login"
                  placeholder="Enter your login"
                  margin="normal"
                  onChange={this.handleChange('email')}
                  value={this.state.email}
                />
              </div>
              <div>
                <TextField fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  onChange={this.handleChange('password')}
                  value={this.state.password}
                />
              </div>
              <div>
                <Button raised color="primary" className={classes.button} onClick={this.handleSubmit } >
                  Connexion
                </Button>
              </div>
            </form>

            <div className={classes.links}>
                <Divider />
                  <Grid container spacing={16} justify="space-between">
                    <Grid item>
                      <Button href="#flat-buttons">
                        Mot de passe perdu
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button href="#flat-buttons">
                        Créer un compte
                      </Button>
                    </Grid>
                  </Grid>
              </div>
          </Paper>

      );
  }
}
SignIn.defaultProps = {
   pute: "tonpere",
}
SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
