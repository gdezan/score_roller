import React from "react";
import styled, { css } from "styled-components";

const CheckInput = ({ radio, className, checked, ...props }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} radio={radio} {...props} />
    <StyledCheckbox checked={checked} radio={radio}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

export default CheckInput;

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs(props => ({
  type: props.radio ? "radio" : "checkbox",
}))`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${props =>
    props.checked ? props.theme.colors.accent : props.theme.colors.secondary};
  border-radius: 3px;
  transition: all 150ms;
  ${props =>
    props.radio &&
    css`
      border-radius: 50%;
    `}

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  ${Icon} {
    visibility: ${props => (props.checked ? "visible" : "hidden")};
  }

  @media (max-width: 650px) {
    width: 12px;
    height: 12px;
  }
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  @media (max-width: 650px) {
    width: 12px;
    height: 12px;
  }
`;
