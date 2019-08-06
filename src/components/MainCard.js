import React from "react";
import styled from "styled-components";

import RollTypeSelector from "./RollTypeSelector";
import StatsGrid from "./StatsGrid";

const MainCard = props => {
  console.log(props);
  return (
    <Container>
      <RollTypeSelector />
      <StatsGrid />
    </Container>
  );
};

export default MainCard;

const Container = styled.div`
  color: ${props => props.theme.text.primary};
  background-color: ${props => props.theme.colors.primary};
  padding: 40px;
  width: 60vw;
  margin-top: 80px;
  box-shadow: -2px 10px 19px -4px rgba(0, 0, 0, 0.75);
`;
