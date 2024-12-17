// React imports
import { useState, useEffect, useCallback, useContext, createContext } from 'react';

// App imports
import { useGeo } from 'context/geo';
import { useMarkers } from 'context/agents/markers';

const MapEventsContext: React.Context<any> = createContext(null);

export const useMapEvents = () => {
	return (
		useContext(MapEventsContext)
	)
}

export const MapEventsProvider = ({children}: any) => {
		const { mapRef } = useGeo();
		const { markers, setMarkers, currentMarker, setCurrentMarker, addPin, setAddPin, currentImage } = useMarkers();

		const [ isDragging, setIsDragging ] = useState(false);
		const [ dragOffset, setDragOffset ] = useState({ x: 0, y: 0 });

		const isClickInsideCircle = useCallback((point: { x: number, y: number }) => {
      const features = mapRef.current?.queryRenderedFeatures(point, {layers: ['layer-mask']});
      return features && features.length > 0;
    }, [ mapRef ]);

	    const onDragStart = useCallback(
        (event: any) => {
          if (isClickInsideCircle(event.point) && currentMarker) {
						setIsDragging(true);
						const { x, y } = event.point;
						const projected = mapRef.current.project([currentMarker.longitude, currentMarker.latitude]);
						setDragOffset({ x: x - projected.x, y: y - projected.y });
          }
        },
        [ isClickInsideCircle, currentMarker, mapRef ]
	    );

	    const onMouseMove = useCallback(
        (event: any) => {
            if (isDragging) {
            	const newCenter = mapRef.current.unproject({
            	    x: event.point.x - dragOffset.x,
            	    y: event.point.y - dragOffset.y
            	});

            	const { lat, lng } = newCenter;
                
              const updatedMarkers = markers.map((item: any) => {
      					if (item.id === currentMarker.id) {
        					const updatedMarker = {...item, latitude: lat, longitude: lng};
        					setCurrentMarker(updatedMarker)
        					return updatedMarker
        				}
        				return item
        			});
      				updatedMarkers && setMarkers(updatedMarkers);
            }

        },[ isDragging, dragOffset, mapRef, setCurrentMarker ]);

	    const onDragEnd = useCallback(() => {
	      setIsDragging(false);
	    }, []);

    const addAgent = (event: any) => {
    	if (addPin === true) {
    		const { lng, lat } = event.lngLat;

    		const lastIndex = markers.length - 1;
    		const lastMarker = markers[lastIndex];
	      
	      const currentId = 
	      	markers.length > 0 ? 
	      	lastMarker.id + 1 : 
	      	1;

	      const newMarker = {
	        id: currentId,
	        latitude: lat,
	        longitude: lng,
	        color: "rgba(244, 173, 79, 1)",
	        image: currentImage
	      };
	      setCurrentMarker(newMarker);
	      setMarkers((prev: any) => [...prev, newMarker]);
	      setAddPin(false);
      }
    };

		useEffect(() => {
			const handleKeyDown = (event: any) => event.keyCode === 27 && setAddPin(false);
			window.addEventListener('keydown', handleKeyDown);
			return () => {
				window.removeEventListener('keydown', handleKeyDown);
			};
		}, []);

	return (
		<MapEventsContext.Provider value={{
			isDragging,
			onDragStart,
			onMouseMove,
			onDragEnd,
			addAgent
		}}>
			{children}
		</MapEventsContext.Provider>
	)
}

MapEventsContext.displayName = "MapEventsContext";