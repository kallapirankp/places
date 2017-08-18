import React,{Component} from 'react';
import MapContainer from './MapContainer';
import axios from 'axios';
import '../css/category.css';


class Places extends Component{
	constructor(){
		super();
		this.state = {
			value: '',
			locateurl: {},
			renderMarkers: false,
			locations: []
		}
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.checkForLocation = this.checkForLocation.bind(this);
		this.showPosition = this.showPosition.bind(this);
		this.showError = this.showError.bind(this);
		this.getPlaces = this.getPlaces.bind(this);
	}

	componentDidMount(){
		this.checkForLocation();
		
	}

	checkForLocation(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
		}else{
			this.showError();
		}
	}

	showPosition(position){
		let lat = position.coords.latitude;
		let lng = position.coords.longitude;
		this.setState({
			locateurl: {lat, lng},
			renderMarkers:  true
		});
	}

	showError(error){
		let lat = 39.50;
		let lng = -98.35;
		this.setState({
			locateurl: {lat, lng},
			renderMarkers:  true
		});
	}

	getPlaces(){
		let url = "https://api.foursquare.com/v2/venues/search?near="+this.state.value+"&client_id=Y3IJYG0QFIGAYYX14UG1WPZFCQA4PLR1QIUOC1SEDIYUQD3A&client_secret=X3WUPOY0RRL0M1AVVCHWYWVVUMBLCQY2PPNROM1WKG1NTF5V&v=20170817&query=Restaurants";
		axios.get(url)
		.then((response) => {
			this.createLocations(response.data.response.venues);
			
		})
		.catch((error) => {
			console.log(error);
			alert("please enter a valid value");
		})
	}

	createLocations(data){
		let locations = [];
		locations = data.map((eachLoc) => {
			let lat = eachLoc.location.lat;
			let lng = eachLoc.location.lng;
			if(lat && lng){
				return {lat, lng};
			}
		});
		this.setState({
			locations: locations
		})
	}


	handleInput(event){
		this.setState({
			value : event.target.value
		});
	}

	handleSubmit(event){
		event.preventDefault();
		let value = this.state.value;
		if(value === ''){
			alert("please enter a value");
		}else{
			this.getPlaces();
		}
		
	}

	render(){

		return(
			<div className="places">
				<div className="category">
					<label> Enter the area to lookup </label> 
					<input autoFocus type="text" value={this.state.value} onChange={this.handleInput} placeholder="Enter city and state"/>
					<input type="submit" value="Go" onClick={this.handleSubmit} />
				</div>
				<div className="explanation">
					<label> Eg: San Jose, CA </label>
				</div>
				<MapContainer locations={this.state.locations} locateurl={this.state.locateurl} renderMarkers={this.state.renderMarkers}/>
			</div>	
		)
	}
}

export default Places;