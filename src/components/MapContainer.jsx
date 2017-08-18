import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../css/mapContainer.css';

const google = window.google;

class MapContainer extends Component{

	componentWillReceiveProps(nextProps){
		let locateurl = nextProps.locateurl;
		let map = new google.maps.Map(this.mapElement, {
			zoom : 12,
			center : locateurl
		});

		if(nextProps.renderMarkers){

			let locations = nextProps.locations;
			
			let marker = locations.map((location) =>{
				return new google.maps.Marker({
					position: location,
					map: map
				});
			});
		}


	}


	render(){
		
		return (
			<div className="map-container" ref={(ele) => this.mapElement = ele}>

			</div>
		);
	}
}

MapContainer.propTypes = {
	locateurl: PropTypes.object,
	locations: PropTypes.arrayOf(PropTypes.object),
	renderMarkers: PropTypes.bool
}


export default MapContainer;