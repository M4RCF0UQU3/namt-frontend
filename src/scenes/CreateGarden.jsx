import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Section from "../components/tools/Section.jsx";
import MapGarden from "../components/MapGarden.jsx";
import Input from 'material-ui/Input';
import Send from 'material-ui-icons/Send';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';



import Leaflet from 'leaflet';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';


import { connect } from 'react-redux';

import FaceIcon from 'material-ui-icons/Face';
import Avatar from 'material-ui/Avatar';

import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
}  from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Chip from 'material-ui/Chip';
import classNames from 'classnames';

import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

//import for scrolling
import scrollToComponent from 'react-scroll-to-component';
//Email Subscription
import validator from 'validator' ;
//Newsletter
//import Newsletter from '../components/Newsletter.jsx';
import Introduction from '../components/Introduction.jsx';
import TextField from 'material-ui/TextField';

var path = require('../backendPath.js').backendpath


const tomaticon = [
  'images/tomatoMarker/tomatoMarker.png',
  'images/tomatoMarker/apple.gif',
  'images/tomatoMarker/watermelon.gif',
  'images/tomatoMarker/tomatogif.gif',
  'images/tomatoMarker/sunflower.gif',
  'images/tomatoMarker/strawberry.gif',
  'images/tomatoMarker/violette.gif',
  'images/tomatoMarker/tomato2.png',
  'images/tomatoMarker/tomato1.png',
  'images/tomatoMarker/babyTomato.gif',
  'images/tomatoMarker/navet.png',
  'images/tomatoMarker/navet.gif',
  'images/tomatoMarker/pumpkin.gif',
  'images/tomatoMarker/pumkin2.gif',
  'images/tomatoMarker/carrot.gif',
  'images/tomatoMarker/lemon.gif',
  'images/tomatoMarker/broco.gif',
  'images/tomatoMarker/pumpkin3.gif',
  'images/tomatoMarker/apple2.gif',
  'images/tomatoMarker/cherries.gif',
  'images/tomatoMarker/flower.gif',
  'images/tomatoMarker/flower1.gif',
  'images/tomatoMarker/flower2.gif',
  'images/tomatoMarker/flower4.png',
  'images/tomatoMarker/flower5.png',




];


class CreateGarden extends React.Component {
	constructor(props) {
      super(props);
	  this.state={
					proprio:"@dmin",
					adresse:"",
					info:"",
					desc:"",
					nom:"",
					ville:"Toulouse",
					cp:"",
					nbmax:"",
					icon:"images/tomatoMarker/tomatoMarker.png",
					lati:40,
					longi:0,
					anchorEl: null,
					selectedIndex: 0,
					
					
					}
		
		
		this.adresseToLonglat = this.adresseToLonglat.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}
	
	
     handleClickListItem = event => {
		this.setState({ anchorEl: event.currentTarget });
	  };

	 handleMenuItemClick = (event, index,option) => {
		this.setState({ selectedIndex: index, anchorEl: null,icon:option });
	  };

	 handleClose = () => {
		this.setState({ anchorEl: null });
	  };

	
	
	
	
	
	handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  
  
  
  adresseToLonglat(){
	  var s=this.state.adresse+' '+this.state.ville;
	  var seq=s.split(" ");
	  var req='';
	  for (let i in seq){req+=seq[i]+'+';}
	  
	let clef='AIzaSyAwS3fKlWZk_cZUoRwzfrdfjhd7Sf5PsU4';
	fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+req+'France&key='+clef,
			{method: 'get'}, {mode: 'cors'})
				.then(function(resp){return resp.json()})
				.then(function(data) {
					this.setState({
							lati: data['results'][0]['geometry']['location']['lat'],
							longi:data['results'][0]['geometry']['location']['lng'],
							});
					
					
			}.bind(this))
			.catch(function(error) {
				console.log(error);
			}); 
  }
  longlatToAdresse(){
	  let clef='AIzaSyAwS3fKlWZk_cZUoRwzfrdfjhd7Sf5PsU4';
	fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.state.lati+','+this.state.longi+'&key='+clef,
			{method: 'get'}, {mode: 'cors'})
				.then(function(resp){return resp.json()})
				.then(function(data) {
					let ru=data['results'][0]['address_components'][0]['long_name']+' '+data['results'][0]['address_components'][1]['long_name'];
					this.setState({
							adresse: ru,
							ville:data['results'][0]['address_components'][2]['long_name'],
							cp:data['results'][0]['address_components'][6]['long_name']
							});
					
			}.bind(this))
			.catch(function(error) {
				console.log(error);
			}); 

  }
  
	getLL = (e) => {
	this.setState({lati:e.latlng.lat});
    this.setState({longi:e.latlng.lng});
	this.longlatToAdresse();
	
  }
  handleSubmit() {
		let corpus={
					'proprio':this.state.proprio,
					'adresse':this.state.adresse,
					'info':this.state.info,
					'desc':this.state.desc,
					'nom':this.state.nom,
					'ville':this.state.ville,
					'cp':this.state.cp,
					'nbmax':this.state.nbmax,
					'icon':this.state.icon,
					'lati':this.state.lati,
					'longi':this.state.longi
				  };
		fetch(path+'/createJardin.php', 
				{
				method: 'post',
				body: JSON.stringify(corpus)
				}
				)
				.then(function(resp){return resp.text()})
				.then(function(data) {
					if(true){
						alert("Votre Jardin a bien été ajouté");
					}
					
					//data.map((litchi)=>{this.setState({markersData: [...markersData,litchi]})})
					//this.setState({markersData: [...markersData, data[0],data[1],data[2]]});
					//})
						
			}.bind(this))
			.catch(function(error) {
				console.log(error);
			}); 
	  	
  };
  
  
	render() {
		const { classes } = this.props;
		const { anchorEl } = this.state;
	
		return (
			<Grid container spacing={24}>
				<Grid item md={12}><h2>Enregistrer mon jardin</h2></Grid>
						<Grid item md={1}></Grid>
						<Grid md={5}>
							<TextField
							 fullWidth
							 id="nom"
							 name="nom"
							 label="nom "
							 placeholder="Qui est-il ???"
							 margin="normal"
							 onChange={this.handleChange('nom')}
							 value={this.state.nom}
							/>
							
							<TextField
							 fullWidth
							 multiline
							 rows="5"
							 id="info"
							 name="info"
							 label="info "
							 placeholder="information"
							 margin="normal"
							 onChange={this.handleChange('info')}
							 value={this.state.info}
							/>
							<TextField
							 fullWidth
							 multiline
							 rows="5"
							 id="desc"
							 name="desc"
							 label="description "
							 placeholder="dis moi ce que tu jardines, je te dirais qui tu es"
							 margin="normal"
							 onChange={this.handleChange('desc')}
							 value={this.state.desc}
							/>
							<List component="nav">
							  <ListItem
								aria-haspopup="true"
								aria-controls="lock-menu"
								aria-label="Selectionnez l'icon de votre jardin"
								onClick={this.handleClickListItem}
							  >
								<ListItemText
								  primary="Selectionnez l'icon de votre jardin"
								/>
							  </ListItem>
							  <ListItemIcon>
									<img src={tomaticon[this.state.selectedIndex]} alt="tomatefarcie" style={{ height: 50,width:50}}/>
								</ListItemIcon>
							</List>
							<Menu
							  id="lock-menu"
							  anchorEl={anchorEl}
							  open={Boolean(anchorEl)}
							  onClose={this.handleClose}
							>
							  {tomaticon.map((option, index) => (
								<MenuItem
								  key={option}
								  selected={index === this.state.selectedIndex}
								  value={option}
								  onClick={event => this.handleMenuItemClick(event, index,option) }
								>
								<ListItemIcon>
									<img src={option} alt="crap" style={{ height: 50,width:50}}/>
								</ListItemIcon>
								</MenuItem>
							  ))}
							</Menu>
							<TextField
							 fullWidth
							 id="nbmax"
							 name="nbmax"
							 label="nbmax"
							 placeholder="nombre de jardinier max"
							 margin="normal"
							 onChange={this.handleChange('nbmax')}
							 value={this.state.nbmax}
							/>
							</Grid>
							<Grid item md={1}></Grid>
							<Grid  md={4}>
							<TextField
							 fullWidth
							 id="adresse"
							 name="adresse"
							 label="Adresse"
							 placeholder="Et juste là un petit geranium"
							 margin="normal"
							 onChange={this.handleChange('adresse')}
							 value={this.state.adresse}
							/>
							<TextField
							 fullWidth
							 id="ville"
							 name="ville"
							 label="ville "
							 placeholder="city"
							 margin="normal"
							 onChange={this.handleChange('ville')}
							 value={this.state.ville}
							/>
							<TextField
							 fullWidth
							 id="cp"
							 name="cp"
							 label="code postal"
							 placeholder="31400 sisi"
							 margin="normal"
							 onChange={this.handleChange('cp')}
							 value={this.state.cp}
							/>
							<Button raised onClick={this.adresseToLonglat } >
								localiser mon jardin sur la carte
							</Button>
							
							<Map md={12} center={[43.603496, 1.435203]} zoom={10} onClick={this.getLL} style={{ height: 350}}>
							<TileLayer
							  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							  url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
							/>
							 <Marker position={[this.state.lati ,this.state.longi]} icon={Leaflet.icon({iconUrl: "images/tomatoMarker/metm.svg",iconSize:     [60, 60],iconAnchor:   [30, 60]})}>
								</Marker>
						</Map>
						<TextField
						  id="long"
						  name="long"
						  label="longitude"
						  placeholder="longitude"
						  margin="normal"
						  onChange={this.handleChange('longi')}
						  value={this.state.longi}
						/>
						<TextField
						  id="lati"
						  name="lati"
						  label="latitude"
						  placeholder="latitude"
						  margin="normal"
						  onChange={this.handleChange('lati')}
						  value={this.state.lati}
						/>
							
							</Grid>
							<Grid item md={12}>
								<Button raised onClick={this.handleSubmit } >
									Ajouter mon nouveau jardin
								</Button>
							</Grid>
				
			</Grid>
		);
   	}
}

function mapStateToProps(state) {
  return {
	connected: state.connected,
	user: state.user
  };
}



export default ((connect(mapStateToProps)(CreateGarden)));
