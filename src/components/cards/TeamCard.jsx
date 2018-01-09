import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import MainPageCard from './MainPageCard.jsx';

const styles = {
  media: {
    height: '200px',
  },
};

function CustomCard(props) {
  const { classes } = props;
  return (
      <MainPageCard className={classes.card}>
        <CardMedia
          className={classes.media}
          image="./images/Penguins.jpg"
          title="About Us"
        />
        <CardContent>
          <Typography type="headline" component="h3">
            L'equipe !
          </Typography>
          <Typography component="p">
            Pour bien faire l’accompagnement, nous sommes des tomates avec plein des savoirs faire différents...
          </Typography>
        </CardContent>
      </MainPageCard>
  );
}

CustomCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomCard);
