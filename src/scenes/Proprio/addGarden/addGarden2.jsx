import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';

const styles = {
  section: {
	  height: '800px',
  },
  h1: {
	color: 'white',
	textShadow: '-1px 1px #000000'
  },
  form: {
	  textAlign: 'center'
  },
 floatingLabelFocusStyle: {
    color: 'red',
  },
  floatingLabelStyle: {
	color: 'green'
  }
};

class AddGardenForm2 extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {nom: '', surface: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	  }

	  handleChange(event) {
		this.setState({value: event.target.value});
	  }

	  handleSubmit(event) {
		alert('A name was submitted: ' + this.state.value);
		event.preventDefault();
	  }
	 saveAndContinue = (e) => {
		e.preventDefault();

		// Get values via this.refs
		//this.props.saveValues(data)
		
		this.props.next();
	  }
	  backwards = (e) => {
		e.preventDefault();

		// Get values via this.refs
		//this.props.saveValues(data)
		
		this.props.prev();
	  }
	  render() {
		return (
			<form onSubmit={this.handleSubmit} style={styles.form}>
				<h2>Disponibilité</h2>
				<Button raised onClick = { this.backwards }>
					&lt;
				</Button>
				<Button raised onClick={ this.saveAndContinue }>
					&gt;
				</Button>
			</form>
		);
	   }
}
export default AddGardenForm2;
