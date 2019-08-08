import React, { useState } from "react";
import styled, { css } from "styled-components";
import { generate } from "shortid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Dropdown = React.memo(props => {
  const [isSelectorHidden, toggleSelector] = useState(true);
  return (
    <>
      <SelectedType onClick={() => toggleSelector(!isSelectorHidden)} isHidden={isSelectorHidden}>
        {props.value && props.value.description}
        <IconWrapper isHidden={isSelectorHidden}>
          <FontAwesomeIcon icon={faAngleDown} />
        </IconWrapper>
      </SelectedType>
      <TypesContainer>
        <TypesWrapper isHidden={isSelectorHidden}>
          {props.values.map(value => (
            <Type
              isHidden={isSelectorHidden}
              key={generate()}
              onClick={() => {
                if (!isSelectorHidden) {
                  props.onSelect(value.id);
                  toggleSelector(!isSelectorHidden);
                }
              }}
            >
              {value.description}
            </Type>
          ))}
        </TypesWrapper>
      </TypesContainer>
    </>
  );
});

export default Dropdown;

const SelectedType = styled.div`
  font-size: 15px;
  font-weight: 600;
  padding: 10px;
  position: relative;
  z-index: 20;
  background-color: white;
  width: 180px;
  display: flex;
  justify-content: space-between;
  border: 2px solid ${props => props.theme.colors.accent};
  user-select: none;
  transition: color 0.2s, transform 0.2s, box-shadow 0.2s;
  transform: scale(${props => (props.isHidden ? 1 : 1.03)});
  box-shadow: 0px ${props => (props.isHidden ? 0 : 3)}px ${props => (props.isHidden ? 0 : 5)}px 0px
    rgba(0, 0, 0, 0.75);

  &:hover {
    cursor: pointer;
    color: ${props => props.theme.colors.accent};
  }

  @media (max-width: 650px) {
    font-size: 13px;
    padding: 10px 5px;
  }
`;

const TypesWrapper = styled.div`
  text-align: left;
  background-color: white;
  width: inherit;
  width: 200px;
  overflow: hidden;
  user-select: none;
  transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
  opacity: 1;
  margin-top: 50px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.75);

  ${props =>
    props.isHidden &&
    css`
      opacity: 1;
      box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.75);
      transform: translateY(calc(-100% - 60px));
    `}
`;

const Type = styled.div`
  padding: 15px 20px;
  font-size: 15px;
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  /* border-radius: 8px; */

  &:hover {
    background-color: ${props => props.theme.colors.accent};
    color: white;
    cursor: ${props => (props.isHidden ? "default" : "pointer")};
  }

  @media (max-width: 650px) {
    font-size: 13px;
    padding: 10px 5px;
  }
`;

const IconWrapper = styled.div`
  transition: transform 0.2s, color 0.2s;
  transform: rotate(${props => (props.isHidden ? 0 : 180)}deg);

  ${SelectedType}:hover & {
    color: ${props => props.theme.colors.accent};
  }
`;

const TypesContainer = styled.div`
  position: absolute;
  z-index: 12;
  height: 200px;
  padding: 0 10px;
  overflow: hidden;
`;
