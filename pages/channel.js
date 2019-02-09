import { Component } from "react";
import Header from "../src/UI/component/header";
import GlobalStyle from "../style/globalStyle";
import styled from "styled-components";
import "isomorphic-fetch";
import Head from "next/head";

function seriesRendering(series) {
  if (series != 0) {
    return (
      <div>
        <h3>Top Series</h3>
        <ul>
          {series.map(serie => {
            return <li key={serie.id}>{serie.title}</li>;
          })}
        </ul>
      </div>
    );
  }
  return "";
}

//GridWrapper

const GridWrapper = styled.div`
  display: grid;
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 40vh auto;
  grid-template-columns: 440px 1fr 1fr;
  grid-template-areas:
    "Banner Banner Banner"
    "Description Playlist Playlist";
  grid-gap: 0px;
  margin: 0 auto;
  @media screen and (max-width: 767px) {
    width: 100%;
    grid-template-rows: 30vh 1fr 1fr;
    grid-template-columns: 1fr;
    grid-template-areas:
      "Banner"
      "Description"
      "Playlist";
  }
`;

//Areas

const Banner = styled.section`
  grid-area: Banner;
  background-color: blue;
  line-height: 0px;
  position: relative;
`;

const Cover = styled.div`
  width: 220px;
  height: 220px;
  background-color: orange;
  position: absolute;
  bottom: -30px;
  left: Calc(440px - 220px / 2);
  line-height: 0px;
  border: 10px solid rgb(85, 212, 114);
  @media screen and (max-width: 767px) {
    width: 140px;
    height: 140px;
    background-color: orange;
    position: absolute;
    bottom: -30px;
    left: Calc(50vw - 140px / 2);
    line-height: 0px;
    border: 5px solid rgb(85, 212, 114);
  }
`;

const Description = styled.div`
  grid-area: Description;
  text-align: justify;
  width: 100%;
`;

const Series = styled.div`
  background-color: lime;
`;

const Playlist = styled.div`
  grid-area: Playlist;
  background-color: cyan;
`;

const Image = styled.img`
  margin: 0px;
  width: 100%;
  height: 100%;
  line-height: 0px;
`;

//UI
const ChannelTitle = styled.h2`
  margin-left: 35px;
  width: 250px;
  @media screen and (max-width: 767px) {
    margin-top: 50px;
    width: 100%;
  }
`;
const Paragraph = styled.p`
  margin: 15px 20px;
  line-height: 1.5;
`;


class ChannelContainer extends Component {
  static async getInitialProps({ query }) {
    let idChannel = query.id;

    let [reqChannel, reqSeries, reqAudios] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${idChannel}`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
    ]);

    let dataChannel = await reqChannel.json();
    let channel = dataChannel.body.channel;

    let dataSeries = await reqSeries.json();
    let series = dataSeries.body.channels;

    let dataAudios = await reqAudios.json();
    let audios = dataAudios.body.channels;

    return { channel, series, audios };
  }


  render() {
    const { channel, series, audios } = this.props;
    return (
      <div style={{ height: "100vh", width: '100vw' }}>
        <Head>
          <title>{channel.title}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <GlobalStyle />
        <Header />
        <GridWrapper>
          <Banner>
            <Image src={channel.urls.banner_image.original} />
            <Cover>
              <Image src={channel.urls.logo_image.original} />
            </Cover>
          </Banner>
          <Description>
            <ChannelTitle>{channel.title}</ChannelTitle>
            <Paragraph>{channel.description}</Paragraph>
            <Series>{seriesRendering(series)}</Series>
          </Description>

          <Playlist />
        </GridWrapper>
      </div>
    );
  }
}

export default ChannelContainer;
