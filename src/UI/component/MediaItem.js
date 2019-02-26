import React from "react";
import styled from "styled-components";

const MediaContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  margin-bottom: 0.5em;
  color: #333;
  text-decoration: none;
`;

const Cover = styled.div`
  background-image: url(${props => props.Src || ''});
  background-size: cover;
  background-position: center;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0, 0.15);
  width: 160px;
  height: 160px;
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
        <Cover Src={props.src} />
        <SubTitle>{props.title}</SubTitle>
      </MediaContainer>
  );
};

export default Media;
