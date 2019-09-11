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
  return (
    <Wrapper>
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
        <CustomSlider
          value={minValue}
          onChange={e => setMinValue(e.target.value)}
          onMouseUp={e => props.setOptionValue("minTotalValue", e.target.value)}
          min={getMinMax(props.rollType).min}
          max={getMinMax(props.rollType).max}
        />

        <CheckInput radio checked={option === "max"} onChange={() => setOption("max")} />
        <SliderText>{"Total must be less than"}</SliderText>
        <SliderValue>{maxValue}</SliderValue>
        <CustomSlider
          value={maxValue}
          onChange={e => setMaxValue(e.target.value)}
          onMouseUp={e => props.setOptionValue("maxTotalValue", e.target.value)}
          min={getMinMax(props.rollType).min}
          max={getMinMax(props.rollType).max}
        />

        <CheckInput radio checked={option === "fixed"} onChange={() => setOption("fixed")} />
        <SliderText>{"Total must be exactly"}</SliderText>
        <SliderValue>{fixedValue}</SliderValue>
        <CustomSlider
          value={fixedValue}
          onChange={e => setFixedValue(e.target.value)}
          onMouseUp={e => props.setOptionValue("fixedTotalValue", e.target.value)}
          min={getMinMax(props.rollType).min}
          max={getMinMax(props.rollType).max}
        />
      </SlidersWrapper>
    </Wrapper>
  );
});

export default RollOptions;

const CustomSlider = styled(Slider)`
  @media (max-width: 650px) {
    margin: 20px 0 40px;
  }
`;

const Wrapper = styled.div`
  @media (max-width: 650px) {
    font-size: 13px;
  }
`;

const Title = styled.p`
  margin: 60px 0 50px;
  font-size: 20px;

  @media (max-width: 650px) {
    margin: 40px 0 30px;
  }
`;

const Text = styled.span`
  margin: 10px;
`;

const SliderText = styled.span`
  justify-self: right;
  white-space: nowrap;
  @media (max-width: 650px) {
    margin: 0 10px 0 15px;
  }
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
  @media (max-width: 650px) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    width: 80%;
    margin: 0 auto;
  }
`;
