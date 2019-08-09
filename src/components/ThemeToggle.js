import React, { useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ThemeToggle = React.memo(props => {
  const [isDark, toggleDark] = useState(props.isDark);
  return (
    <ButtonWrapper
      onClick={() => {
        props.onClick && props.onClick();
        toggleDark(!isDark);
      }}
    >
      <Toggle isDark={isDark}>
        <IconWrapper>
          <Moon isDark={isDark}>
            <FontAwesomeIcon icon={faMoon} />
          </Moon>
          <Sun isDark={isDark}>
            <FontAwesomeIcon icon={faSun} />
          </Sun>
        </IconWrapper>
      </Toggle>
    </ButtonWrapper>
  );
});

export default ThemeToggle;

const ButtonWrapper = styled.div`
  margin-top: 30px;
  width: 60px;
  height: 30px;
  background-color: ${props => props.theme.colors.accent};
  border-radius: 15px;

  &:hover {
    cursor: pointer;
  }
`;

const Toggle = styled.div`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: ${props => props.theme.colors.primary};
  transition: all 0.3s cubic-bezier(0.79, -0.03, 0.22, 1.55);
  overflow: hidden;

  ${props =>
    props.isDark &&
    css`
      transform: translateX(30px);
    `}
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const Moon = styled.div`
  /* position: absolute; */
  color: white;
  transition: all 0.3s;
  transform: translate(70px, 3px);

  ${props =>
    props.isDark &&
    css`
      transform: translate(10px, 3px);
    `}
`;

const Sun = styled.div`
  /* position: absolute; */
  color: orange;
  transition: all 0.3s;
  transform: translate(-10px, 3px);
  ${props =>
    props.isDark &&
    css`
      transform: translate(-70px, 3px);
    `};
`;
