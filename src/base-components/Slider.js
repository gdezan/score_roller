import React from "react";
import styled from "styled-components";

const Slider = React.memo(({ min, max, onChange, ...props }) => {
  return <SliderWrapper min={min} max={max} onChange={onChange} {...props} />;
});

export default Slider;

const SliderWrapper = styled.input.attrs(props => ({
  type: "range",
  ...props,
}))`
  -webkit-appearance: none;
  width: 100%;
  background: transparent;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 25px;
    width: 12px;
    border: 1px solid black;
    background-color: white;
    border-radius: 3px;
    cursor: pointer;
    box-shadow: 0px 1px 3px #00000077, 0px 0px 1px #0d0d0d;
    margin-top: -9px;
  }

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
    background-color: ${props => props.theme.colors.accent};
    height: 8px;
    border-radius: 3px;
    border: 1px solid black;
    transition: filter 0.2s;
  }

  &:focus::-webkit-slider-runnable-track {
    filter: brightness(1.1);
  }
`;
