import React from 'react';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import TwitchPlayer from 'react-player/lib/players/Twitch';

const VodEmbed = (props) => {
  if (props.vodUrl.indexOf('youtube') > -1) {
    return <YouTubePlayer
      url={props.vodUrl}
      controls={true}
    />
  } else if (props.vodUrl.indexOf('twitch') > -1) {
    return <TwitchPlayer
      url={props.vodUrl}
      controls={true}
    />
  } else if (props.vodUrl.indexOf('nico') > -1) {
    return 'Nicovideo VODs are not currently supported';
  } else {
    return 'No VOD available for this record'
  }
};

export default VodEmbed;