import styled from "styled-components";
import React from "react";
import Link from "next/link";

const Header = styled.header`
  background-color: rgb(85, 212, 114);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7.2vh;
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
