import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

const styles = {
  card: {
	backgroundColor: 'green'
  },
  media: {
    height: '200px',
  },
  info: {
    fontStyle: 'italic',
  },
  indication: {
    fontWeight: 'bold',
    paddingTop: '50px',
    position: 'absolute',
    bottom: '0',
    right: '0',
    left: '0',
    marginBottom: '20px'
  },
  icons: {
    width: 'unset',
    height: 'unset',
    margin: '10px'
  }
};

class MessagerieCard extends React.Component {
	render() {
	  return (
		  <Card style={{backgroundColor: this.props.color}}>
			  {this.props.children}
		  </Card>
	  );
	}
}


MessagerieCard.propTypes = {
	children: PropTypes.node,
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessagerieCard);