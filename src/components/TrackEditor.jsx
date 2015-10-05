import React from 'react';
import { getSpotifyTrackSuggestions } from '../services/APIService.js';

export class TrackEditor extends React.Component {
  constructor() {
    super();

    // Bind instance functions
    this.titleUpdated = this.titleUpdated.bind(this);
    this.noteUpdated = this.noteUpdated.bind(this);
    this.updateSuggestionsForTrack = this.updateSuggestionsForTrack.bind(this);
  }

  render() {
    return (
      <div className="track-editor">
        <div className="track-upper-row">
          <span className="track-order">{this.props.order}</span>
          <input type="text" placeholder="Enter track name" value={this.props.title}
                 onChange={this.titleUpdated} />
        </div>
        <div className="track-bottom-row">
          <input type="text" placeholder="Enter note" value={this.props.note}
                 onChange={this.noteUpdated} />
        </div>
      </div>
    );
  }

  noteUpdated(e) {
    this.props.updateFunction(this.props.order, 'note', e.target.value);
  }

  titleUpdated(e) {
    //TODO: Autocomplete using last.fm data
    this.props.updateFunction(this.props.order, 'title', e.target.value);
    this.updateSuggestionsForTrack(e.target.value);
  }

  /*
   * Fetches track suggestions for user
   */
  updateSuggestionsForTrack(title) {
    getSpotifyTrackSuggestions(title,
      data => console.log(data), err => console.log(err));
  }
}
