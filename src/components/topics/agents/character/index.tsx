// Context imports
import { useMarkers } from 'context/agents/markers';

export const Character = ({ src, alt }: any) => {
	const { setAddPin, setCurrentImage } = useMarkers();

	const onClick = () => {
		setAddPin((prev: boolean) => !prev);
		setCurrentImage(src);
	}

	return (
		<div className="agent-selector-item">
    		<img 
    			src={src} 
    			alt={alt} 
    			onClick={onClick} 
    			width="100%"
    		/>
    	</div>
	)
}

Character.displayName="Character";