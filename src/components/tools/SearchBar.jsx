import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import SearchIcon from 'material-ui-icons/Search';
import GPSIcon from 'material-ui-icons/GpsFixed';

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing.unit,
		backgroundColor: '#909090',
		opacity: '0,5',
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
	withoutLabel: {
		marginTop: theme.spacing.unit * 3,
	},
});

class SearchBar extends React.Component {
  constructor(props) {
      super(props);
      this.state = { address: '' };
  }

  geoloc() {
	  console.log("Geoloc: TODO");
  }
  handleChange(prop, event) {
    this.setState({ [prop]: event.target.value });
  };

	filterByAddress() {
	  console.log("Filter by Address: TODO");
	  this.props.onSubmit();
  }
  render() {
    const { classes } = this.props;

    return (
        <FormControl className={classes.formControl}>
          <InputLabel></InputLabel>
          <Input
            placeholder={this.props.innerLabel}
            value={this.state.address}
            onChange={this.handleChange.bind(this)}
            startAdornment={<InputAdornment position="start">
                <IconButton
                  onClick={this.geoloc}
                ><GPSIcon />
                </IconButton>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={this.filterByAddress}
                ><SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);
