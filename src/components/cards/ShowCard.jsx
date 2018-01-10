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
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/B%C3%A9b%C3%A9_Phoque_de_Weddell_-_Baby_Weddell_Seal.jpg/290px-B%C3%A9b%C3%A9_Phoque_de_Weddell_-_Baby_Weddell_Seal.jpg"
          title="Présentation"
        />
        <CardContent>
          <Typography type="headline" component="h3">
            Marc :
          </Typography>
          <Typography component="p">
            Présentation de l'application
          </Typography>
        </CardContent>
      </MainPageCard>
  );
}

ShowCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowCard);
