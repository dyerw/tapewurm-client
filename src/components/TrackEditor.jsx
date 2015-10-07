import React from 'react';
import { getSpotifyTrackSuggestions } from '../services/APIService.js';
import { TrackSuggestionList } from './TrackSuggestionList.jsx';

export class TrackEditor extends React.Component {
  constructor() {
    super();

    this.state = {
      trackSuggestions: [],
      selectedTrack: null
    };

    // Bind instance functions
    this.titleUpdated = this.titleUpdated.bind(this);
    this.noteUpdated = this.noteUpdated.bind(this);
    this.updateSuggestionsForTrack = this.updateSuggestionsForTrack.bind(this);
    this.updateSelectedTrack = this.updateSelectedTrack.bind(this);
  }

  render() {
    // If a track has been selected we don't show an input box
    let trackTitleDiv;
    if (this.state.selectedTrack != null) {
      trackTitleDiv = (
        <div>
          <div>{this.state.selectedTrack.trackName}</div>
          <div>{this.state.selectedTrack.albumName}</div>
        </div>
      );
    } else {
      trackTitleDiv = (
        <div className="track-upper-row">
          <span className="track-order">{this.props.order}</span>
          <input type="text" placeholder="Enter track name"
                 value={this.props.title}
                 onChange={this.titleUpdated}/>
        </div>
      );
    }

    return (
      <div className="track-editor">

        {trackTitleDiv}

        {/* Note */}
        <div className="track-bottom-row">
          <input type="text" placeholder="Enter note" value={this.props.note}
                 onChange={this.noteUpdated} />
        </div>

        <TrackSuggestionList suggestions={this.state.trackSuggestions}
               onClickHandler={this.updateSelectedTrack} />
      </div>
    );
  }

  noteUpdated(e) {
    this.props.updateFunction(this.props.order, 'note', e.target.value);
  }

  titleUpdated(e) {
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

   updateSelectedTrack(data) {
     this.setState({selectedTrack: data, trackSuggestions: []});
   }
}
