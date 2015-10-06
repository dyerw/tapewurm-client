import React from 'react';
import { getSpotifyTrackSuggestions } from '../services/APIService.js';
import { TrackSuggestionList } from './TrackSuggestionList.jsx';

export class TrackEditor extends React.Component {
  constructor() {
    super();

    this.state = {
      trackSuggestions: []
    };

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

        <TrackSuggestionList suggestions={this.state.trackSuggestions} />
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
    if (title == "") {
      this.setState({trackSuggestions: []});
    } else {
      getSpotifyTrackSuggestions(title,
        data => this.setState({trackSuggestions: this.parseSuggestions(data)}),
        err => console.log(err));
    }
  }

  /*
   * Parses Spotify API response into an object like:
   * {albumImageUrl: ..., albumName: ..., trackName: ...}
   */
   parseSuggestions(data) {
     console.log(data);
     return data.tracks.items.map(item => {
       // Takes all artists and joins them into a single
       // comma separated string
       let artistName = item.artists.map(artist => {
         return artist.name;
       }).join(', ');

       return {albumImageUrl: item.album.images[2].url,
               artistName: artistName,
               trackName: item.name}
     }).slice(0, 3);
   }
}
