import styled from "styled-components";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import GlobalStyle from "../../../style/globalStyle";
const Header = styled.header`
  background-color: rgb(85, 212, 114);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65px;
  width: 100%;
`;

const Title = styled.h1`
  margin: 0;
  padding: 15px;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 1em;
  height: 1em;
  margin-left: 0.5em;
`;

const header = props => {
  return (
    <Header>
      <GlobalStyle />
      <Head>
        <title>{props.title}</title>
      </Head>
      <Link href="/index">
        <a
          style={{
            textDecoration: "none",
            color: "white"
          }}
        >
          <Title>
            Sprotify
            <Logo src="/static/Logo.png" />
          </Title>
        </a>
      </Link>
    </Header>
  );
};

export default header;
