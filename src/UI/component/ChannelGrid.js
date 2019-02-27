import React, { Component } from "react";
import styled from "styled-components";
import Media from "./media";
import { Link } from "./../../../routes";
import slug from '../../../helpers/slug'

const ChannelsContainter = styled.div`
  display: grid;
  grid-gap: 15px;
  padding: 15px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
`;

class ChannelGrid extends Component {
  render() {
    const { channels } = this.props;

    return (
      <ChannelsContainter>
        {channels.map(channel => (
          <Link
            key={channel.id}
            route="channel"
            params={{ slug: slug(channel.title), 
            id: channel.id }}
          >
            <a href="" style={{ textDecoration: "none" }}>
              <Media
                key={channel.id}
                title={channel.title}
                src={channel.urls.logo_image.original}
              />
            </a>
          </Link>
        ))}
      </ChannelsContainter>
    );
  }
}

export default ChannelGrid;
