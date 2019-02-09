import { Component } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Media from "../src/UI/component/media";
import Header from "../src/UI/component/header";
import GlobalStyle from "../style/globalStyle";
import Head from "next/head";
import "isomorphic-fetch";
import Link from "next/link";

class Home extends Component {
  static async getInitialProps() {
    let req = await fetch("https://api.audioboom.com/channels/recommended");
    let { body: channels } = await req.json();
    return { channels };
  }

  render() {
    const { channels } = this.props;

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
            <Link href={`/channel?id=${channel.id}`} key={channel.id}>
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

  @media screen and (max-width:  2560px) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
`;
