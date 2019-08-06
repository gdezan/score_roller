import React from "react";
import styled from "styled-components";

function renderTopRow() {
  let cells = [<Cell />];
  // for (let i = 0; i < )
}

function renderGridCells() {
  let arr = [];
  for (let i = 0; i < 24; i++) {
    arr.push(<Cell>1</Cell>);
  }
  return (
    <>
      {renderTopRow()}
      <LeftRowCell>Roll</LeftRowCell>
      {renderRow(rolls)}
      <LeftRowCell>Bonus</LeftRowCell>
      {renderRow(bonus)}
    </>
  );
}

const StatsGrid = props => {
  return <Grid>{renderGridCells()}</Grid>;
};

export default StatsGrid;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 20% repeat(6, 1fr) 15%;
  grid-template-rows: 1fr 1fr 1fr;
`;

const Cell = styled.div`
  height: 30px;
  background-color: ${props => props.theme.colors.cell};
  border: 1px solid ${props => props.theme.colors.border};
`;

const LeftRowCell = styled(Cell)`
  background-color: ${props => props.theme.color.secondary}
  text-align: left;
`;
