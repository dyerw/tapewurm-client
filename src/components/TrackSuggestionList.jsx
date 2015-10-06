import React from 'react';
import { TrackSuggestionItem } from './TrackSuggestionItem.jsx';

export class TrackSuggestionList extends React.Component {
  render() {
    let items = this.props.suggestions.map(suggestion => {
      return <TrackSuggestionItem albumImageUrl={suggestion.albumImageUrl}
                                  trackName={suggestion.trackName}
                                  artistName={suggestion.artistName} />
    });

    return (
      <div>
        {items}
      </div>
    );
  }
}
