import React from "react";
import styled from "styled-components";
import { generate } from "shortid";
import { useStateValue } from "../state";

function renderTopRow() {
  let cells = [<TopRowCell key={generate()} />];
  for (let i = 1; i <= 6; i++) cells.push(<TopRowCell key={generate()}>{i}</TopRowCell>);
  cells.push(<TopRowCell key={generate()}>Total</TopRowCell>);
  return cells;
}

function renderRow(array, isPbe = false) {
  return array.map((e, i) => <Cell key={generate()}>{e}</Cell>);
}

function renderGridCells(rolls, bonus) {
  return (
    <>
      {renderTopRow()}
      <LeftRowCell key={generate()}>Roll</LeftRowCell>
      {renderRow(rolls)}
      <LeftRowCell key={generate()}>Bonus</LeftRowCell>
      {renderRow(bonus)}
    </>
  );
}

const StatsGrid = props => {
  const [state] = useStateValue();
  return <Grid>{renderGridCells(state.rolls, state.bonus)}</Grid>;
};

export default StatsGrid;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 20% repeat(6, 1fr) 15%;
  grid-template-rows: 1fr 1fr 1fr;
  border: 1px solid ${props => props.theme.colors.border};
  width: 80%;

  @media (max-width: 750px) {
    width: 100%;
  }

  @media (max-width: 650px) {
    font-size: 13px;
  }
`;

const Cell = styled.div`
  height: 30px;
  background-color: ${props => props.theme.colors.cell};
  border: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
`;

const LeftRowCell = styled(Cell)`
  background-color: ${props => props.theme.colors.secondary};
  justify-content: left;
  font-weight: 600;
  padding-left: 10px;
  @media (max-width: 650px) {
    padding-left: 2px;
  }
`;

const TopRowCell = styled(Cell)`
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.text.contrast};
  font-weight: 600;
`;
