import React, { Component } from "react";
import styled from "styled-components";
import MediaItem from "../component/MediaItem";
import {Link} from "../../../routes";
import slug from './../../../helpers/slug'

const MainGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-gap: 20px;
`;

const styleLink = {
  textDecoration: "none",
  color: "black"
};

class Playlist extends Component {
  render() {
    const { clips } = this.props;
  
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
            <Link 
            key={audio.id} 
            route='clip'
            params={{
              slugChannel: slug(audio.channel.title),
              idChannel: audio.channel.id,
              slug: slug(audio.title),
              id: audio.id
            }}>
              <a style={styleLink}>
                <MediaItem key={audio.id} title={audio.title} src={src} />
              </a>
            </Link>
          );
        })}
      </MainGrid>
    );
  }
}

export default Playlist;
