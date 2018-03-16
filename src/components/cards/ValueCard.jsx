import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import MainPageCard from './MainPageCard.jsx';

var imagepath = require('../../backendPath.js').imagepath

const styles = {
  media: {
    height: '200px',
  },
};

function ShowCard(props) {
  const { classes } = props;
  return (
      <MainPageCard className={classes.card}>
        <CardMedia
          className={classes.media}
          image={imagepath+"images/gaertner.jpeg"}
          title="Présentation"
        />
        <CardContent>
          <Typography type="headline" component="h3">
            Nos Valeurs
          </Typography>
          <Typography component="p">
            Collaboratif / ensemble
          </Typography>
          <Typography component="p">
            Lien intergénérationnel et social
          </Typography>
        </CardContent>
      </MainPageCard>
  );
}

ShowCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowCard);
