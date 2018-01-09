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
          image="/images/medium-logo.jpg"
          title="Blog"
        />
      <CardContent>
          <Typography type="headline" component="h3">
            Blog
          </Typography>
          <Typography component="p">
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
            chicken and chorizo in the pan.
          </Typography>
        </CardContent>
        <CardActions>
          <div className={classes.flexGrow} />
          <Button label="Decouvrir le Blog"
              href="https://medium.com/acc%C3%A9l%C3%A9rateur-momentum/adopte-ma-tomate-b595ac29d5ef"
                target="_blank">Découvir le Blog</Button>
        </CardActions>
      </MainPageCard>
  );
}

CustomCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomCard);
