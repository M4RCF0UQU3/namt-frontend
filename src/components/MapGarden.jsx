import React, { Component }  from 'react';
import ReactDOM,{ render } from 'react-dom';
import Leaflet from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';


class MapGarden extends React.Component {
  render() {
	const opa=0.75;
	const position=[43.578689 ,1.401336];
    const toulouse = [43.604652 , 1.444209];const blagnac =[43.6350870,1.3970299999999]; const union =[43.65719199,1.48418600]; const portet=[43.528559,1.3995350]; const labege=[43.5367334,1.52805560];
	const greenIcon = Leaflet.icon({
								iconUrl: 'https://icon-icons.com/icons2/277/PNG/512/MacFamilyTree_30181.png',
								iconSize:     [60, 60],
								iconAnchor:   [10, 50],
								popupAnchor:  [-3, -76],
								
							});
    return (
      <Map center={position} zoom={10}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
		<Marker icon={greenIcon} position={toulouse} opacity={opa}>
			<Popup>
			<span><strong>Toulouse</strong><br/>24 Jardins</span>
			</Popup>
		</Marker>
		<Marker icon={greenIcon} position={blagnac} opacity={opa}>
			<Popup>
			<span><strong>Blagnac</strong><br/>4 Jardins</span>
			</Popup>
		</Marker>
		<Marker icon={greenIcon} position={union} opacity={opa}>
			<Popup>
			<span><strong>L'Union</strong><br/>11 Jardins</span>
			</Popup>
		</Marker>
		<Marker icon={greenIcon} position={portet} opacity={opa}>
			<Popup>
			<span><strong>Portet-sur-Garonne</strong><br/>2 Jardins</span>
			</Popup>
		</Marker>
		<Marker icon={greenIcon} position={labege} opacity={opa}>
			<Popup>
			<span><strong>Labège</strong><br/>2 Jardins</span>
			</Popup>
		</Marker>
      </Map>
    );
  }
}

export default (MapGarden);
