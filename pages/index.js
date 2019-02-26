import { Component } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Media from "../src/UI/component/media";
import Header from "../src/UI/component/header";
import GlobalStyle from "../style/globalStyle";
import Error from "../src/UI/component/_error";
import Head from "next/head";
import "isomorphic-fetch";
import { Link } from "../routes";
import slug from '../helpers/slug'

class Home extends Component {
  static async getInitialProps({ res }) {
    try {
      let req = await fetch("https://api.audioboom.com/channels/recommended");
      let { body: channels } = await req.json();
      return { channels, statusCode: 200 };
    } catch (e) {
      res.statusCode = 503;
      return { channels: null, statusCode: 503 };
    }
  }

  render() {
    const { channels, statusCode } = this.props;
    if (statusCode != 200) {
      return <Error statusCode={statusCode} />;
    }

    return (
      <>
        <GlobalStyle />
        <Head>
          <title>Welcome to Sprotify</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Header />
        <ChannelsContainter>
          {channels.map(channel => (
            <Link
              route="channel"
              params={{
                slug: slug(channel.title),
                id: channel.id
              }}
              key={channel.id}
            >
              <a style={{ textDecoration: "none" }}>
                <Media
                  key={channel.id}
                  title={channel.title}
                  src={channel.urls.logo_image.original}
                />
              </a>
            </Link>
          ))}
        </ChannelsContainter>
      </>
    );
  }
}

export default Home;

const ChannelsContainter = styled.div`
  display: grid;
  grid-gap: 15px;
  padding: 15px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
`;
