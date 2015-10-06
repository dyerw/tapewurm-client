import React from 'react';

export class TrackSuggestionItem extends React.Component {
  render() {
    return (
      <div>
        <img src={this.props.albumImageUrl} />
        <div>{this.props.trackName}</div>
        <div>{this.props.artistName}</div>
      </div>
    );
  }
}
