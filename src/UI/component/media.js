import React from "react";
import styled from "styled-components";

const MediaContainer = styled.div`
  display: block;
  border-radius: 3px;
  margin-bottom: 0.5em;
  color: #333;
  text-decoration: none;
`;

const Cover = styled.img`
  border-radius: 3px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0, 0.15);
  width: 100%;
`;

const SubTitle = styled.h2`
  padding: 5px;
  font-size: 0.9em;
  font-weight: 600;
  margin: 0;
  text-align: center;
`;

const Media = props => {
  return (
      <MediaContainer>
        <Cover src={props.src} />
        <SubTitle>{props.title}</SubTitle>
      </MediaContainer>
  );
};

export default Media;
