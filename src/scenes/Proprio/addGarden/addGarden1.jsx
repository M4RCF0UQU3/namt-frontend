import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import MenuIcon from 'material-ui-icons/Menu';

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

class AddGardenForm1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {nom: '', surface: '', rue: '', codePostale:'', pays:''};
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
	  render() {
		return (
			<form onSubmit={this.handleSubmit} style={styles.form}>
				<h2>Général</h2>
				  <TextField value={this.state.nom} label="Nom du Jardin" onChange={this.handleChange} /><br/>
				  <TextField value={this.state.surface} label="Surface" onChange={this.handleChange} /><br/>
				<h2>Adresse du jardin</h2>
				  <TextField value={this.state.rue} label="N° et Rue" onChange={this.handleChange} /><br/>
				  <TextField value={this.state.codePostale} label="Code Postale" onChange={this.handleChange} /><br/>
				  <TextField value={this.state.pays} label="Pays" onChange={this.handleChange} /><br/>
				<Button raised onClick={ this.saveAndContinue }>
					&gt;
				</Button>
			</form>
		);
	   }
}


export default AddGardenForm1;
