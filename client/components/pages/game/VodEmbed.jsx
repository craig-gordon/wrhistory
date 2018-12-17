import React from 'react';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import TwitchPlayer from 'react-player/lib/players/Twitch';

const VodEmbed = (props) => {
  let embed;
  
  if (props.vodUrl.indexOf('youtube') > -1) {
    embed = <YouTubePlayer
      url={props.vodUrl}
      controls={true}
    />
  } else if (props.vodUrl.indexOf('twitch') > -1) {
    embed = <TwitchPlayer
      url={props.vodUrl}
      controls={true}
    />
  } else if (props.vodUrl.indexOf('nico') > -1) {
    embed = <iframe
      height='360'
      width='640'
      frameborder='0'
      src={`https://embed.nicovideo.jp/watch/${props.vodUrl.slice(props.vodUrl.indexOf('sm'))}`}
    />
  } else {
    embed = 'No VOD available for this record';
  }
  
  return embed;
};

export default VodEmbed;