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
          image='/images/shovel.jpeg'
          title="Présentation"
        />
        <CardContent>
          <Typography type="headline" component="h3">
            Événements
          </Typography>
          <Typography component="p">
            Nous vous proposons des ateliers sur des thèmes diverses comme la permaculture, la préparation de la terre, planter ses graines, répliquer les jeunes pousses et encore d’autres.
          </Typography>
          <Typography component="p">
            Trouvez la date et le thème qui vous conviennent le mieux et inscrivez-vous ! Nous nous occupons de tout le reste.
          </Typography>
        </CardContent>
      </MainPageCard>
  );
}

CustomCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomCard);
