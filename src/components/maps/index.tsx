// React imports
import { useState } from 'react';

// App imports
import { Tiles } from './tiles';
import { Agent } from './agent';
import { Pin } from './pin';
import { Wrapper } from './wrapper';

// Context imports
import { useMapEvents } from 'context/events/maps';
import { useGeo } from 'context/geo';

// Third-party imports
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const MapContainer = () => {
	const { viewport, mapRef, mapStyle } = useGeo();
	const { addAgent } = useMapEvents();
	
	const [ isMapLoaded, setIsMapLoaded ] = useState(false);

	return (
		<Wrapper> 
		  <Map
			  ref={mapRef}
			  initialViewState={viewport}
			  mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
			  mapStyle={mapStyle}
			  onClick={addAgent}
			  onLoad={() => setIsMapLoaded(true)}
			>
				{isMapLoaded && <>
					<Tiles/>
					<Pin/>
					<Agent/>
				</>}
			</Map>
		</Wrapper>
	)
}