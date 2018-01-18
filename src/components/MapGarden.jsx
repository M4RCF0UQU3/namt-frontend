import React, { Component }  from 'react';
import ReactDOM,{ render } from 'react-dom';
import Leaflet from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
//import SearchBar from 'C:/Users/Marc/namt-frontend/src/components/tools/SearchBar.jsx';
import TextField from 'material-ui/TextField';





class MapGarden extends React.Component {
	constructor(props) {
      super(props);
      this.state = { markersData:[{"id":1,"proprio":"TomateMagic","adresse":"adresse",
									"info":"info","description":"pas de description","photo":"images/jardin.jpg","icon":"images/tomatoMarker/tomatoMarker.png",
									"geom":"01010000206A08000068791EDC9DCD4540E02D90A0F831F73F","nom":"nom",
									"ville":"Toulouse","code":"31000","pseudo":"Admin","photoproprio":"\/images\/phoque.png","geoj":{"type":"Point","coordinates":[43.598712 ,1.401465]}}] ,
				
					value:'RECHERCHE ????',
					bobo:false,
					conn:false,
					rec:''
				};
	  this.handleSubmit = this.handleSubmit.bind(this);
  };
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleSubmit() {
		this.setState({markersData:[{"id":1,"proprio":"TomateMagic","adresse":"adresse",
									"info":"info","description":"pas de description","photo":"images/jardin.jpg","icon":"images/tomatoMarker/tomatoMarker.png",
									"geom":"01010000206A08000068791EDC9DCD4540E02D90A0F831F73F","nom":"nom",
									"ville":"Toulouse","code":"31000","pseudo":"Admin","photoproprio":"\/images\/phoque.png","geoj":{"type":"Point","coordinates":[43.598712 ,1.401465]}}] 
				})
		var requaeton;
		requaeton='?s='+this.state.rec;

	  	fetch('http://localhost/namt-backend/filtreJardin.php'+requaeton, {
				method: 'get'}, {mode: 'cors'}
				)
				.then(function(resp){return resp.json()})
				.then(function(data) {
					for (var i = 0; i < data.length; i++) {
						data[i]['geoj']=JSON.parse(data[i]['geoj']);
						const { markersData } = this.state;
						
					  this.setState({markersData: [...markersData,data[i]]});
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
	
	const marker = this.state.markers;  
	const opa=0.75;
	const position=[43.578689 ,1.401336];
    const toulouse = [43.604652 , 1.444209];
	const p=[[43.578689 ,1.401336],[43.58 ,1.401336],[43.579 ,1.402],[43.59 ,1.42]];
	const greenIcon = Leaflet.icon({
								iconUrl: '/images/tomatogif.gif',
								iconSize:     [60, 60],
								iconAnchor:   [10, 50],
								popupAnchor:  [-3, -76],
								
							});
	
    return (
				<Grid item xs={true} sm={true} md={true}>
					<form>
						
						 <TextField
						  fullWidth
						  id="rec"
						  name="rec"
						  label="recherche ton petit jardin d'amour "
						  placeholder="tape la,juste ici"
						  margin="normal"
						  onChange={this.handleChange('rec')}
						  value={this.state.rec}
						/>
						<Button raised onClick={this.handleSubmit } >
						  Appuie Bonhomme
						</Button>
					</form>
					<Map center={position} zoom={12}>
						<TileLayer
						  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						  url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
						/>
						 {
							this.state.markersData.map((m, idx) => 
						 <Marker key={`marker-${idx}`} position={m['geoj']['coordinates']} icon={Leaflet.icon({iconUrl: m['icon'],iconSize:     [60, 60],iconAnchor:   [10, 50],popupAnchor:  [-3, -76],})}>
							  <Popup>
								<span>{m['nom']}<br/> Jardin de {m['pseudo']}<br/> {m['description']}</span>
							  </Popup>
							</Marker>
						 )}
					</Map>
					
				</Grid>
				
		
    );
  }
}


export default (MapGarden);
