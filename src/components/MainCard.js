import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import { useStateValue } from "../state";

import RollTypeSelector from "./RollTypeSelector";
import StatsGrid from "./StatsGrid";

import Button from "../base-components/Button";

const MainCard = React.memo(props => {
  const [state, dispatch] = useStateValue();
  return (
    <Container>
      <RollSelectorWrapper>
        <RollTypeSelector
          selectedType={state.rollType}
          changeType={rollType => dispatch({ type: "setRollType", rollType })}
        />
      </RollSelectorWrapper>
      <StatsGrid />
      <ButtonWrapper>
        <Button onClick={() => dispatch({ type: "setRolls" })}>
          <FontAwesomeIcon icon={faDice} />
          <RollText>ROLL</RollText>
        </Button>
      </ButtonWrapper>
    </Container>
  );
});

export default MainCard;

const Container = styled.div`
  color: ${props => props.theme.text.primary};
  background-color: ${props => props.theme.colors.primary};
  padding: 40px;
  width: 60vw;
  margin-top: 80px;
  box-shadow: -2px 10px 19px -4px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  margin-top: 40px;
`;

const RollText = styled.span`
  margin-left: 7px;
`;

const RollSelectorWrapper = styled.div`
  margin-bottom: 40px;
`;
