import React from "react";
import styled from "styled-components";
import { ripple } from "./Keyframes";

const Button = props => {
  return <ButtonWrapper onClick={props.onClick}>{props.children}</ButtonWrapper>;
};

export default Button;

const ButtonWrapper = styled.button`
  background-color: ${props => props.theme.colors.accent};
  border: none;
  font-size: 18px;
  color: ${props => props.theme.text.contrast};
  padding: 10px;
  border-radius: 1px;
  transition: filter 0.2s, transform 0.1s, box-shadow 0.1s;
  border: 2px solid rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    filter: brightness(1.15);
    cursor: pointer;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.3);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }

  &:focus:not(:active)::after {
    animation: ${ripple} 1s ease-out;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 650px) {
    font-size: 15px;
    padding: 10px 5px;
  }
`;
