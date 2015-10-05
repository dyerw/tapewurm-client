import React from 'react';
import { TrackEditor } from './TrackEditor.jsx';
import { makeCreateMixCall } from '../services/MixService.js';

class MixMaker extends React.Component {

  constructor() {
    super();

    this.state = {
      name: '',
      // Begins with an empty track editor
      tracks: [],
      image_url: ''
    };

    // Manually bind instance functions
    this.trackUpdated = this.trackUpdated.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.createMix = this.createMix.bind(this);
  }

  componentDidMount() {
    // For some reason sticking this info in the state field
    // isn't working
    // FIXME: Do this in constructor?
    this.addTrack();
  }

  render() {
    // Create an array of all the track editors
    let trackEditors = [];
    for (var i = 0; i < this.state.tracks.length; i++) {
      let track = this.state.tracks[i];
      trackEditors.push(<TrackEditor key={i} order={i + 1} title={track.title}
                               note={track.note} updateFunction={this.trackUpdated} />);
    }

    return (
      <div id="mix-maker">

        {/* Mix Image Editor */}
        <div id="mix-image-preview">
          <img src={this.state.image_url != '' ?
                    this.state.image_url : 'default_img.jpg'} />
          <input type="text" placeholder="Image URL" value={this.state.image_url}
                 onChange={e => this.setState({image_url: e.target.value})} />
        </div>

        {/* Mix Name Editor */}
        <div id="mix-name-editor">
          <input type="text" value={this.state.name} placeholder="Mix name"
                 onChange={e => this.setState({name: e.target.value})} />
        </div>

        {/* Track Editors */}
        {trackEditors}

        {/* Add Track Button */}
        <button onClick={this.addTrack}> + </button>

        {/* Create Button */}
        <button onClick={this.createMix}>Create</button>

      </div>
    );
  }

  // Behaviors

  /*
   * Adds an empty new track editor at the bottom of the mix.
   */
  addTrack() {
    var newTracks = this.state.tracks.slice();
    newTracks.push(
      {musicbrainz_id: null,
       title: "",
       note: ""}
    );
    console.log(newTracks);

    this.setState({tracks: newTracks});
  }

  /*
   * Sends all mix info up to server and then provides a link
   * to the newly created mix.
   */
  createMix() {
    makeCreateMixCall(this.state.name, this.state.image_url, this.state.tracks,
                      this.handleSuccessfulCreate, this.handleErrorCreate);
  }

  /*
   * Fired off whenever the user edits a track.
   */
  trackUpdated(trackOrder, field, value) {
    // FIXME: Do this immutably
    let newTracks = this.state.tracks.slice();
    let newTrack = newTracks[trackOrder - 1];
    newTrack[field] = value;
    newTracks[trackOrder - 1] = newTrack;
    this.setState({tracks: newTracks});
  }

  // Service Call Callbacks
  handleSuccessfulCreate() {

  }

  handleErrorCreate() {

  }
}

React.render(<MixMaker/>, document.body);
