import React, { Component } from "react";
import styled from "styled-components";
import MediaItem from "../component/MediaItem";
import Link from "next/link";

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
            <Link href={`/clip?id=${audio.id}`} key={audio.id}>
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
