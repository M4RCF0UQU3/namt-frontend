import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import MainPageCard from './MainPageCard.jsx';
import Button from 'material-ui/Button';

const styles = {
  media: {
    height: '200px',
  },
  flexGrow: {
    flex: '1 1 auto',
  },
};

function CustomCard(props) {

  const { classes } = props;

  return (
      <MainPageCard className={classes.card}>
        <CardMedia
          className={classes.media}
          image="/images/plage.jpeg"
          title="Blog"
        />
      <CardContent>
          <Typography type="headline" component="h3">
            Offrir une belle plage !
          </Typography>
          <Typography component="p">
            Inscrire un jardin.
          </Typography>
        </CardContent>
        <CardActions>
          <div className={classes.flexGrow} />
          <Button label="Remplir le formulaire"
              href="https://docs.google.com/forms/d/e/1FAIpQLScARUhLXGZmND_pBvti02oi_sZvJce35jnfejglIAY4FHxxSQ/viewform"
                target="_blank">Inscrire Jardin (être inscrit)</Button>
        </CardActions>
      </MainPageCard>
  );
}

CustomCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomCard);
