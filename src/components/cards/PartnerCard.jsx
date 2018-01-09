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

function ShowCard(props) {
  const { classes } = props;
  return (
      <MainPageCard className={classes.card}>
        <CardMedia
          className={classes.media}
          image="images/vegetable.jpg"
          title="Présentation"
        />
        <CardContent>
          <Typography type="headline" component="h3">
            Nos Partenaires
          </Typography>
          <Typography component="p">
            Adopte ma tomate veut travailler avec tous les acteurs du co-jardinage
            car nous visons tous un même objectif et nous croyons fermement qu’il y a besoin de
            fédérer l’action de tous pour proposer une expérience du co-jardinage qui permettra
            son développement et sa généralisation.
          </Typography>
        </CardContent>
      </MainPageCard>
  );
}

ShowCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowCard);
