// React imports
import { useEffect, useContext, createContext } from 'react';

// App imports
import { useMarkers } from 'context/agents/markers';

const MapEventsContext: React.Context<any> = createContext(null);

export const useMapEvents = () => {
	return (
		useContext(MapEventsContext)
	)
}

export const MapEventsProvider = ({children}: any) => {
	const { markers, setMarkers, setCurrentMarker, addPin, setAddPin, currentImage } = useMarkers();

	const getId = (markers: any) => {
		const lastIndex = markers.length - 1;
		const lastMarker = markers[lastIndex];
		const currentId = markers.length > 0 ? lastMarker.id + 1 : 1;
		return currentId

	}

    const addAgent = (event: any) => {
    	if (addPin === true) {
    		const { lng, lat } = event.lngLat;

    		const currentId = getId(markers);
			
			const newMarker = {
				id: currentId,
				latitude: lat,
				longitude: lng,
				color: "rgba(244, 173, 79, 1)",
				image: currentImage,
			};

			setCurrentMarker(newMarker);
			setMarkers((prev: any) => [...prev, newMarker]);
			setAddPin(false);
			}
		};

    // Remove add pin state
	useEffect(() => {
		const handleKeyDown = (event: any) => 
			event.keyCode === 27 && setAddPin(false);

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<MapEventsContext.Provider value={{
			addAgent
		}}>
			{children}
		</MapEventsContext.Provider>
	)
}

MapEventsContext.displayName = "MapEventsContext";