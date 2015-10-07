import React from 'react';

export class TrackSuggestionItem extends React.Component {
  constructor() {
    super();
    // Bind instance functions
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <img src={this.props.albumImageUrl} />
        <div>{this.props.trackName}</div>
        <div>{this.props.artistName}</div>
      </div>
    );
  }

  handleClick() {
    this.props.handleClick(this.props);
  }
}
