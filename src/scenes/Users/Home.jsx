import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import Send from 'material-ui-icons/Send';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import Grid from 'material-ui/Grid';


//Cards
import TitlebarGridList from '../../components/chips/TitlebarGridList.jsx';

const styles = {
	container: {
		backgroundImage: 'url(images/setzlinge.jpeg)',
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
	},
	lien: {
    	textDecoration: 'none',
    	color: 'inherit',
  	},
	root: {
		flexGrow: 1,
		marginTop: 30,
    }
};

class Home extends React.Component {
	constructor(props) {
      super(props);
      this.state = {
			
			};
  }

	handleChange() {
		
	};

	render() {
		const { classes } = this.props;
		console.log("rien rien !!");
		return (
			<Grid container spacing={20} alignItems="stretch">
				<Grid item xs={12} sm={6}>
					<TitlebarGridList/>
				</Grid>
			</Grid>
		);
   	}
}

Home.propTypes = {
	children: PropTypes.node,
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
