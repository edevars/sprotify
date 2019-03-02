import React, { Component } from "react";
import styled from "styled-components";
import MediaItem from "./MediaItem";
import slug from "../../../helpers/slug";

// *! STYLES
const MainGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-gap: 20px;
`;

const styleLink = {
  textDecoration: "none",
  color: "black",
  cursor: "pointer"
};

class Playlist extends Component {
  render() {
    const { clips, onClickPodcast } = this.props;

    return (
      <MainGrid>
        {clips.map(audio => {
          let src = audio.urls.post_image;
          if (src == undefined) {
            src = audio.channel.urls.logo_image.original;
          } else {
            src = audio.urls.post_image.original;
          }
          return (
            <a
              key={audio.id}
              style={styleLink}
              onClick={() => onClickPodcast(event, audio)}
            >
              <MediaItem key={audio.id} title={audio.title} src={src} />
            </a>
          );
        })}
      </MainGrid>
    );
  }
}

export default Playlist;
