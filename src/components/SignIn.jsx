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

import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from "amazon-cognito-identity-js";

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
  };


  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });

  };

  handleSubmit = async event => {
    event.preventDefault();

    try {
      await this.login(this.state.email, this.state.password);
      alert("Logged in");
    } catch (e) {
      alert(e);
    }
  };

  login(email, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: __CONFIG__.cognito.userPoolID,
      ClientId: __CONFIG__.cognito.appClientID
    });
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authenticationData = { Username: email, Password: password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(),
        onFailure: err => reject(err)
      })
    );
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

            <form className={classes.form} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
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
                <Button raised color="primary" className={classes.button} type="submit">
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

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
