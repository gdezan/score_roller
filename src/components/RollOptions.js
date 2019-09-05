import React, { useState } from "react";
import styled from "styled-components";

import CheckInput from "base-components/CheckInput";
import Slider from "base-components/Slider";

const getMinMax = rollType => {
  switch (rollType) {
    case "4d6dl":
      return { min: 0, max: 100 };
    case "3d6":
      return { min: 0, max: 100 };
    case "2d6p6":
      return { min: 0, max: 100 };
    default:
      return { min: 50, max: 70 };
  }
};

const RollOptions = React.memo(props => {
  const [minValue, setMinValue] = useState(props.minTotalValue);
  const [maxValue, setMaxValue] = useState(props.maxTotalValue);
  const [fixedValue, setFixedValue] = useState(props.fixedTotalValue);
  const [option, setOption] = useState("");
  console.log(option);
  return (
    <>
      <Title>Roll Options</Title>
      <PbeWrapper>
        <Label>
          <Text>Calculate PBE (Point Buy Equivalent)</Text>
          <CheckInput checked={props.isPbeOn} onChange={() => props.togglePbe()} />
        </Label>
      </PbeWrapper>

      <SlidersWrapper>
        <CheckInput
          radio
          checked={option === "min"}
          onChange={() => {
            console.log(1);
            // setOption("min");
          }}
          onClick={() => {
            console.log(1);
            // setOption("min");
          }}
        />
        <SliderText>{"Total must be greater than"}</SliderText>
        <SliderValue>{minValue}</SliderValue>
        <Slider
          value={minValue}
          onChange={e => setMinValue(e.target.value)}
          onMouseUp={e => props.setOptionValue("minTotalValue", e.target.value)}
          min={getMinMax(props.rollType).min}
          max={getMinMax(props.rollType).max}
        />

        <CheckInput radio checked={option === "max"} onChange={() => setOption("max")} />
        <SliderText>{"Total must be less than"}</SliderText>
        <SliderValue>{maxValue}</SliderValue>
        <Slider
          value={maxValue}
          onChange={e => setMaxValue(e.target.value)}
          onMouseUp={e => props.setOptionValue("maxTotalValue", e.target.value)}
          min={getMinMax(props.rollType).min}
          max={getMinMax(props.rollType).max}
        />

        <CheckInput radio checked={option === "fixed"} onChange={() => setOption("fixed")} />
        <SliderText>{"Total must be exactly"}</SliderText>
        <SliderValue>{fixedValue}</SliderValue>
        <Slider
          value={fixedValue}
          onChange={e => setFixedValue(e.target.value)}
          onMouseUp={e => props.setOptionValue("fixedTotalValue", e.target.value)}
          min={getMinMax(props.rollType).min}
          max={getMinMax(props.rollType).max}
        />
      </SlidersWrapper>
    </>
  );
});

export default RollOptions;

const Title = styled.p`
  margin: 60px 0 50px;
  font-size: 20px;
`;

const Text = styled.span`
  margin: 10px;
`;

const SliderText = styled.span`
  justify-self: right;
  white-space: nowrap;
`;

const SliderValue = styled.div`
  font-weight: 600;
  display: inline-block;
  text-align: center;
`;

const PbeWrapper = styled.div`
  margin-bottom: 30px;
`;

const Label = styled.label``;

const SlidersWrapper = styled.div`
  display: grid;
  grid-template-columns: 8% min-content 10% 40%;
  grid-row-gap: 30px;
  width: 100%;
  justify-content: center;
`;
