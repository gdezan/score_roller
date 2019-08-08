import React from "react";
import styled from "styled-components";

import CheckBox from "../base-components/Checkbox";

const RollOptions = React.memo(props => {
  return (
    <>
      <Title>Roll Options</Title>
      <PbeWrapper>
        <Text
          onClick={() => {
            console.log("onchange");
            props.togglePbe();
          }}
        >
          Calculate PBE (Point Buy Equivalent)
        </Text>
        <CheckBox
          checked={props.isPbeOn}
          onChange={() => {
            console.log("onchange");
            props.togglePbe();
          }}
        />
      </PbeWrapper>
    </>
  );
});

export default RollOptions;

const Title = styled.p`
  margin: 60px 0 30px;
  font-size: 20px;
`;

const Text = styled.span``;

const PbeWrapper = styled.div``;
