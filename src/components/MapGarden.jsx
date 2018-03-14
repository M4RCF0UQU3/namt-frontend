import React, { Component }  from 'react';
import ReactDOM,{ render } from 'react-dom';
import Leaflet from 'leaflet';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
//import SearchBar from 'C:/Users/Marc/namt-frontend/src/components/tools/SearchBar.jsx';
import TextField from 'material-ui/TextField';

var curly='http://mass-cara2.univ-tlse2.fr/~marc.fouque';


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
					rec:'',
					posi:[],
					lati:'',
					longi:'',
					rayon:2000,
					center:[0,0],
					radius:0,
					nbJardin:'?'
					};
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.rechercheRayon = this.rechercheRayon.bind(this);
  };
  
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleSubmit() {
		this.setState({markersData:[{"id":9302,"proprio":"TomateMagic","adresse":"adresse",
									"info":"info","description":"pas de description","photo":"images/jardin.jpg","icon":"images/tomatoMarker/tomatoMarker.png",
									"geom":"01010000206A08000068791EDC9DCD4540E02D90A0F831F73F","nom":"nom",
									"ville":"Toulouse","code":"31000","pseudo":"Admin","photoproprio":"\/images\/phoque.png","geoj":{"type":"Point","coordinates":[43.598712 ,1.401465]}}] 
				})
		var requaeton;
		requaeton='?s='+this.state.rec;

	  	fetch(curly+'/namt-backend/filtreJardin.php'+requaeton, {
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
  
  getLL = (e) => {
    this.setState({posi:e.latlng});
	this.setState({lati:e.latlng.lat});
    this.setState({longi:e.latlng.lng});
  }
  rechercheRayon(){
		
		
		var paramm ='?limite='+this.state.rayon+'&lati='+this.state.lati+'&longi='+this.state.longi;
		
	  	fetch(curly+'/namt-backend/compteJardinRayon.php'+paramm, {
				method: 'get'}, {mode: 'cors'}
				)
				.then(function(resp){return resp.text()})
				.then(function(data) {
					
					this.setState({nbJardin: data[0],radius: this.state.rayon,center:[this.state.longi,this.state.lati]});
					
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
				<Grid container spacing={24}>
					<Grid item md={3}></Grid>
					<Grid item md={8}>
					
						<form >
							
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
							  Recherche
							</Button>
						</form>

					</Grid>
					<Grid item md={3}>
						<form>
						 <TextField
						  id="long"
						  name="long"
						  label="longitude..."
						  placeholder="longitude..."
						  margin="normal"
						  onChange={this.handleChange('lati')}
						  value={this.state.lati}
						/>
						<TextField
						  id="lati"
						  name="lati"
						  label="latitude... "
						  placeholder="latitude..."
						  margin="normal"
						  onChange={this.handleChange('longi')}
						  value={this.state.longi}
						/>
						<TextField
						  id="rayon"
						  name="rayon"
						  label="rayon en metre "
						  placeholder=">500m"
						  margin="normal"
						  onChange={this.handleChange('rayon')}
						  value={this.state.rayon}
						/>
						<Button raised onClick={this.rechercheRayon } >
						  Jardin à proximité ???
						</Button>
					</form>
					<p style={{ fontSize: 28}} onChange={this.handleChange('nbJardin')}>Il y a {this.state.nbJardin} Jardin(s) autour de vous</p>
					</Grid>
					
					<Grid item md={8}>
						<Map md={12} center={position} zoom={12} onClick={this.getLL} style={{ height: 350}}>
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
		
								 <Circle center={[this.state.lati ,this.state.longi]} radius={this.state.radius} onChange={this.handleChange('radius'),this.handleChange('longi'),this.handleChange('lati')}>
									<Popup>
										<span style={{ fontSize: 18}}>il y a {this.state.nbJardin} jardin(s) dans un rayon de {this.state.radius}m </span>	
									</Popup>
								 </Circle>
						</Map>
					</Grid>
				</Grid>
				
		
    );
  }
}


export default (MapGarden);
