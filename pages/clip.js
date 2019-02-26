import React, { Component } from "react";
import Header from "../src/UI/component/header";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import GlobalStyle from "../style/globalStyle";
import Head from "next/head";
import Link from "next/link";

const MainWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 0%,
    rgba(196, 255, 205, 1) 42%,
    rgba(85, 212, 114, 1) 73%,
    rgba(8, 195, 139, 1) 100%
  );
`;

const ClipTitle = styled.h2`
    @media screen and (max-width: 768px) {
      font-size: 16px;
      padding: 0px 45px;
      margin-bottom: 30px;
  }
`

const TagLink = styled.h3`
  color: #08c38b;
  font-weight: bold;
  font-size: 24px;
  margin-left: 15px;
`;

const AudioPlayer = styled.audio`
  width: 40%;
  margin-top: 30px;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
  @media screen and (max-width: 350px) {
    width: 98%;
  }
`;

const PodcastImage = styled.div`
  background-image: url(${props => props.src || ""});
  background-size: cover;
  background-position: center;
  width: 240px;
  height: 240px;
`;

const StyledLink = styled.a`
  margin-left: 45px;
  margin-top: 20px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  color: inherit;
  text-decoration: none;
  align-self: flex-start;
`;

class ClipContainer extends Component {
  static async getInitialProps({ query }) {
    let idClip = query.id;
    let req = await fetch(
      `https://api.audioboom.com/audio_clips/${idClip}.mp3`
    );
    let dataClip = await req.json();
    let clip = dataClip.body.audio_clip;
    return { clip };
  }

  render() {
    const { clip } = this.props;
    {
      console.log(clip);
    }
    return (
      <MainWrapper>
        <GlobalStyle />
        <Head>
          <title>{clip.title}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Header />

        <Link href={`/channel?id=${clip.channel.id}`}>
          <StyledLink href="">
            <FontAwesomeIcon icon={faArrowAltCircleLeft} size="lg" />
            <TagLink>Volver</TagLink>
          </StyledLink>
        </Link>

        <ClipTitle>{clip.title}</ClipTitle>
        {clip.urls.image ? (
          <PodcastImage src={clip.urls.image} alt="" />
        ) : (
          <PodcastImage src={clip.channel.urls.logo_image.original} alt="" />
        )}

        <AudioPlayer controls autoPlay={true}>
          <source src={clip.urls.high_mp3} type="audio/mpeg" />
        </AudioPlayer>
      </MainWrapper>
    );
  }
}

export default ClipContainer;
