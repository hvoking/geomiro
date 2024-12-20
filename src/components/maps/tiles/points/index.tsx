// React imports
import { useState, useEffect } from 'react';

// Third party imports
import { Source, Layer } from 'react-map-gl';

// Context imports
import { useStylesApi } from 'context/api/styles';

export const Points = ({ tableSchema, tableName, sourceId }: any) => {
	const { fetchData, getTilesUrl } = useStylesApi();
	const [ styleData, setStyleData ] = useState<any[]>([]);
	
	const url = getTilesUrl(tableSchema, tableName);

  	useEffect(() => {
    	const loadData = async () => {
			const data = await fetchData(tableSchema, tableName);
			setStyleData(data);
		}
		loadData();
	}, []);

  	const layers = styleData.map((style: any, index: number) => {
  		style.paint['circle-opacity'] = 0;
		return (
			<Layer key={index} {...style}/>
		)
	});
	
	return (
		<Source 
			id={sourceId} 
			type="vector" 
			tiles={[ url ]}
		>
			{layers}
		</Source>

	)
}