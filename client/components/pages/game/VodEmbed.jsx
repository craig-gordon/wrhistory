import React from 'react';
import ReactPlayer from 'react-player';

class VodEmbed extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ReactPlayer
      url={this.props.vodUrl}
      controls={true}
    />
  }
}

export default VodEmbed;