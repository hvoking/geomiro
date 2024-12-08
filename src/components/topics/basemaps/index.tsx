// App imports
import { listOfBaseMaps } from './options';
import './styles.scss';

// Context imports
import { useMapbox } from 'context/maps/mapbox';

export const Basemaps = () => {
	const { setMapStyle } = useMapbox();

	const mapbox: any = listOfBaseMaps[0];
	const carto: any = listOfBaseMaps[1];

	return (
		<div className="agent-selector">
			<div className="agent-selector-title">MAPBOX BASEMAPS</div>
			<div className="basemap-selectors">
				{Object.keys(mapbox.mapas).map((item: any, index: number) => {
					return (
						<div 
							style={{
								width: "100%", 
								height: "80px", 
								backgroundColor: "rgba(121, 244, 244, 0.2)"
							}}
							onClick={() => setMapStyle(mapbox.mapas[item])}
							>
							<img 
								src={process.env.PUBLIC_URL + `/static/basemaps/mapbox/${index + 1}.png`} 
								alt={`mapbox-${index + 1}`}
								width="100%"
								height="100%"
							/>
						</div>
					)
				})}
			</div>
			<div className="agent-selector-title">CARTO BASEMAPS</div>
			<div className="basemap-selectors">
				{Object.keys(carto.mapas).map((item: any, index: number) => {
					return (
						<div 
							style={{
								width: "100%", 
								height: "80px", 
								backgroundColor: "rgba(121, 244, 244, 0.2)"
							}}
							onClick={() => setMapStyle(carto.mapas[item])}
						>
							<img 
								src={process.env.PUBLIC_URL + `/static/basemaps/carto/${index + 1}.png`} 
								alt={`carto-${index + 1}`}
								width="100%"
								height="100%"
							/>
						</div>
					)
				})}
			</div>
		</div>
	)
}

Basemaps.displayName="Basemaps"