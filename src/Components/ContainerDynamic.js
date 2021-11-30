import {useEffect, useState} from 'react';
import '../App.css';

const ContainerDynamic = ({latitude, longitude}) => {
	
	let urlIconShowPage;
	const [city, setCity] = useState('');
	const [abbreviatonCity, setAbbreviatonCity] = useState('');
	const [urlIcon, setUrlIcon] = useState('');
	const [temperature, setTemperature] = useState(0);
	const [stateSky, setStateSky] = useState('');
	const [windSpeed, setWindSpeed] = useState(0);
	const [stateClouds, setStateClouds] = useState(0);
	const [pressure, setPressure] = useState(0);
	const [celsius, setCelsius] = useState('on');
	const [units, setUnits] = useState('ms');
	const API_key_Two = "4a1dd36e65134f5bdcffc85fca19bad0";
	let url;

	if(celsius==='on'){
		url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_key_Two}`;
	}else {
		url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_key_Two}`;
	}

	useEffect(()=>{
		fetch(url)
	    .then(response => {
	      return response.json();
	    })
	    .then(data => {
			setCity(data.name);
			setAbbreviatonCity(data.sys.country);
			setUrlIcon(data.weather[0].icon);
			setTemperature(data.main.temp);
			setStateSky(data.weather[0].description);
			setWindSpeed(data.wind.speed);
			setPressure(data.main.pressure);
			setStateClouds(data.clouds.all);
	      });
	}, [])
	
	urlIconShowPage = `https://openweathermap.org/img/wn/${urlIcon}@2x.png`;

	return (
		<div className="container-info">
			<div className="NameApp">
				<h3>{city}, {abbreviatonCity}</h3>
			</div>
			<div className="Weather">
				<div>
					<img src={urlIconShowPage} alt={"icon weather"} />
				</div>
				<div>
					{temperature}°C
				</div>
			</div>
			<div className="DescriptionWeather">
				<ul>
					<li>{stateSky}</li>
					<li>Wind speed: {windSpeed} {units} </li>
					<li>Clouds: {stateClouds}% </li>
					<li>Pressure: {pressure} mb</li>
				</ul>
			</div>
				{/* <button onClick={()=>{
		            if(celsius=== 'on'){
		              setCelsius('off');
		              setUnits('miles');
		            }  
		            else {
		              setCelsius('on');
		              setUnits('ms');
		            }
		        }} >Degrees °F/°C
		        </button> */}
		</div>
	)
}

export default ContainerDynamic;