// React imports
import { useState, useRef } from 'react';

// App imports
import { Suggestions } from './suggestions';
import { SearchIcon } from './icon';
import { Cross } from './cross';
import './styles.scss';

// Context imports
import { useMapbox } from '../../../../context/maps/mapbox';
import { useGoogleSearchApi } from '../../../../context/api/google/search';

export const Search = () => {
	const inputRef = useRef<any>(null);
	const [ suggestionIndex, setSuggestionIndex ] = useState(0);
	const [ suggestionsActive, setSuggestionsActive ]= useState(false);
	
	const { setPlaceId } = useMapbox();
	const { googleSearchData, searchText, setSearchText } = useGoogleSearchApi();

	const suggestions = googleSearchData && googleSearchData.predictions.reduce((total: any, item: any) => {
		const placeName = item.description.toLowerCase()
		total.push(placeName)
		return total
	}, []);

	const handleChange = (e: any) => {
		const query = e.target.value;
		setSearchText(query);

		if (query.length > 0) {
			setSuggestionsActive(true);
		}
		else {
			setSuggestionsActive(false)
		}
	};

	const handleKeyDown = (e: any) => {
		// up arrow
		if (e.keyCode === 38) {
			if (suggestionIndex === 0) {
				return;
			}
			setSuggestionIndex(suggestionIndex - 1);
		}
		// down arrow
		else if (e.keyCode === 40) {
			if (suggestionIndex - 1 === suggestions.length) {
				return
			}
			setSuggestionIndex(suggestionIndex + 1);
		}
		// enter
		else if (e.keyCode === 13) {
			const currentSearchValue: any = suggestions && suggestions[suggestionIndex]
			getCurrentPrediction(currentSearchValue)
			currentSearchValue && setSearchText(currentSearchValue);
			setSuggestionIndex(0);
			setSuggestionsActive(false);
		}

		// scape
		else if (e.keyCode === 27) {
			setSearchText("");
			setSuggestionIndex(0);
			setSuggestionsActive(false);
		}
	};


	const cleanSuggestions = () => {
		setSearchText("");
		setSuggestionIndex(0);
		setSuggestionsActive(false);
	}

	const getCurrentPrediction = (currentSearchValue: any) => {
		googleSearchData && googleSearchData.predictions.forEach((item: any) => {
			const placeName = item.description.toLowerCase().trim();
			if (placeName === currentSearchValue) {
				setPlaceId(item.place_id);
			}
		})
	}

	const handleClick = (e: any) => {
		const currentSearchValue = e.target.innerText.trim();
		getCurrentPrediction(currentSearchValue)
		setSearchText(currentSearchValue);
		setSuggestionsActive(false);
	};

	return (
		<div className="maps-search-wrapper">
			<div className="maps-search">
				<SearchIcon/>
				<input 
					ref={inputRef}
					className="maps-input"
					type="text" 
					placeholder="Find a place"
					value={searchText}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					spellCheck={false}
				/>
				<Cross cleanSuggestions={cleanSuggestions}/>
				{suggestionsActive && suggestions &&
					<Suggestions 
						suggestions={suggestions}
						setSuggestionIndex={setSuggestionIndex}
						suggestionIndex={suggestionIndex}
						handleClick={handleClick}
					/>
				}
			</div>
		</div>
	)
}

Search.displayName="Search";