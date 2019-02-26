import { Component } from "react";
import Header from "../src/UI/component/header";
import GlobalStyle from "../style/globalStyle";
import styled from "styled-components";
import "isomorphic-fetch";
import Head from "next/head";
import PlaylisItems from "../src/UI/component/Playlist";
import ErrorNext from "../src/UI/component/_error";

function seriesRendering(series) {
  if (series != 0) {
    return (
      <Series>
        <SeriesTitle>Top Series</SeriesTitle>
        <ul>
          {series.map(serie => {
            return <li key={serie.id}>{serie.title}</li>;
          })}
        </ul>
      </Series>
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
  @media screen and (max-width: 1024px) {
    width: 100%;
    grid-template-rows: auto auto auto;
    grid-template-columns: 1fr;
    grid-template-areas:
      "Banner"
      "Description"
      "Playlist";
  }
  @media screen and (max-width: 765px) {
    width: 100%;
    grid-template-rows: 150px auto auto;
    grid-template-columns: 1fr;
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
  position: absolute;
  bottom: -30px;
  left: Calc(440px - 220px / 2);
  line-height: 0px;
  border: 10px solid rgb(85, 212, 114);
  @media screen and (max-width: 768px) {
    width: 140px;
    height: 140px;
    background-color: orange;
    position: absolute;
    bottom: -30px;
    left: Calc(50vw - 140px / 2);
    line-height: 0px;
    border: 5px solid rgb(85, 212, 114);
  }
  @media screen and (max-width: 425px) {
    display: none;
  }
`;

const Description = styled.div`
  display: inline-block;
  grid-area: Description;
  text-align: justify;
`;

const Series = styled.div`
  //Envia un error a un servicio como Sentry
  border: 7px solid #009c4e;
  border-radius: 20px;
  @media screen and (max-width: 768px) {
    padding-bottom: 10px;
  }
`;

const Playlist = styled.div`
  grid-area: Playlist;
  background-color: ${props => props.Color || "cyan"};
  padding-top: 40px;
  padding-left: 30px;
  @media screen and (max-width: 1024px) {
    padding: 0px 30px;
  }
`;

const Image = styled.img`
  margin: 0px;
  width: 100%;
  height: 100%;
  line-height: 0px;
`;

//UI
const ChannelTitle = styled.h2`
  margin: 0px;
  padding-left: 25px;
  display: inline-block;
  margin-top: 50px;
`;
const Paragraph = styled.p`
  margin: 15px 30px;
  line-height: 1.5;
  @media screen and (max-width: 425px) {
    font-size: 13 px;
  }
`;

const SeriesTitle = styled.h3`
  padding-left: 30px;
  padding-top: 15px;
`;

class ChannelContainer extends Component {
  static async getInitialProps({ query, res }) {
    try {
      let idChannel = query.id;
      let [reqChannel, reqSeries, reqAudios] = await Promise.all([
        fetch(`https://api.audioboom.com/channels/${idChannel}`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
      ]);

      if (reqChannel.status >= 400) {
        res.statusCode = reqChannel.status;
        return {
          channel: null,
          series: null,
          audios: null,
          statusCode: reqChannel.status
        };
      }

      let dataChannel = await reqChannel.json();
      let channel = dataChannel.body.channel;

      let dataSeries = await reqSeries.json();
      let series = dataSeries.body.channels;

      let dataAudios = await reqAudios.json();
      let audios = dataAudios.body.audio_clips;

      return { channel, series, audios, statusCode: 200 };
    } catch (e) {
      return { channel: null, series: null, audios: null, statusCode: 503 };
    }
  }

  render() {
    const { channel, series, audios, statusCode } = this.props;
    if (statusCode != 200) {
      return <ErrorNext statusCode={statusCode} />;
    }
    return (
      <div style={{ height: "100vh" }}>
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
            {seriesRendering(series)}
          </Description>
          <Playlist Color="white">
            <h3>Escucha lo que más te guste :)</h3>
            <PlaylisItems clips={audios} />
          </Playlist>
        </GridWrapper>
      </div>
    );
  }
}

export default ChannelContainer;
