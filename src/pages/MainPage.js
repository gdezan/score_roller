import React from "react";
import styled from "styled-components";

import MainCard from "components/MainCard";
import ThemeToggle from "components/ThemeToggle";
import { useStateValue } from "state";

const MainPage = props => {
  return (
    <Wrapper>
      <Title>Ability Score Roller</Title>
      <MainCard useStateValue={useStateValue} />
      <ThemeToggle onClick={props.toggleTheme} isDark={props.isDark} />
    </Wrapper>
  );
};

export default MainPage;

const Title = styled.h1`
  color: ${props => props.theme.text.primary};
  margin: 40px 0;
  font-family: "Almendra", serif;
  font-size: 2.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
