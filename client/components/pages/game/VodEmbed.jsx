import React from 'react';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import TwitchPlayer from 'react-player/lib/players/Twitch';
import styled from 'styled-components';

const Iframe = styled.iframe`
  position: absolute;
  top: 20px;
  left: 20px;
  height: calc(100% - 40px);
  width: calc(100% - 40px);
`;

const youtubeStyles = {
  position: 'absolute',
  left: '10px',
  height: '100%',
  width: '100%'
};

const twitchStyles = {
  position: 'absolute',
  top: '20px',
  left: '20px',
  height: 'calc(100% - 40px)',
  width: 'calc(100% - 40px)'
};

const VodEmbed = props => {
  let embed;

  if (props.vodUrl.indexOf('youtube') > -1) {
    embed = (
      <YouTubePlayer
        url={props.vodUrl}
        controls={true}
        style={youtubeStyles}
        height='calc(100% - 40px'
        width='calc(100% - 40px)'
      />
    );
  } else if (props.vodUrl.indexOf('twitch') > -1) {
    embed = (
      <TwitchPlayer
        url={props.vodUrl}
        controls={true}
        style={twitchStyles}
        height='calc(100% - 40px'
        width='calc(100% - 40px)'
      />
    );
  } else if (props.vodUrl.indexOf('nicovideo') > -1) {
    embed = (
      <Iframe
        frameBorder='0'
        src={`https://embed.nicovideo.jp/watch/${props.vodUrl.slice(
          props.vodUrl.indexOf('sm')
        )}`}
      />
    );
  } else {
    embed = 'No VOD available for this record';
  }

  return embed;
};

export default VodEmbed;
