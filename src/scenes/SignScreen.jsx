import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import SignIn from '../components/SignIn';

class SignScreen extends React.Component{

  render(){

      return(
          <div>
            <Grid container spacing={24} justify="center">
              <Grid item xs={12} sm={6}>
                <SignIn />
              </Grid>
            </Grid>
          </div>
      );
  }
}

export default (SignScreen);
