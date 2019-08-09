import React from "react";
import styled, { css } from "styled-components";
import { generate } from "shortid";
import { useStateValue } from "../state";

import { GridAnim, PbeRowAnim } from "../base-components/Keyframes";

function renderTopRow() {
  let cells = [<TopRowCell key={generate()} />];
  for (let i = 1; i <= 6; i++) cells.push(<TopRowCell key={generate()}>{i}</TopRowCell>);
  cells.push(<TopRowCell key={generate()}>Total</TopRowCell>);
  return cells;
}

function renderRow(array, isPbe = false) {
  return array.map((e, i) => {
    if (isPbe) return <PbeCell key={generate()}>{e}</PbeCell>;
    return <Cell key={generate()}>{e}</Cell>;
  });
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

const PbeRow = React.memo(({ pbe, isPbeOn }) => {
  return (
    <PbeRowWrapper isPbeOn={isPbeOn}>
      <PbeLeftRow>PBE</PbeLeftRow>
      {renderRow(pbe, true)}
    </PbeRowWrapper>
  );
});

const StatsGrid = React.memo(props => {
  const [{ rolls, bonus, pbe, isPbeOn }] = useStateValue();
  return (
    <GridWrapper>
      <Grid isPbeOn={isPbeOn}>{renderGridCells(rolls, bonus)}</Grid>
      <PbeRow pbe={pbe} isPbeOn={isPbeOn} />
    </GridWrapper>
  );
});

export default StatsGrid;

const GridWrapper = styled.div`
  margin: 60px 0;
  width: 55vw;

  @media (max-width: 650px) {
    font-size: 13px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 20% repeat(6, 1fr) 15%;
  grid-template-rows: 1fr 1fr 1fr;
  position: relative;
  z-index: 10;
  transition: transform 0.3s;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.75);

  ${props =>
    props.isPbeOn &&
    css`
      animation: ${GridAnim} 0.5s;
      transform: scale(1.05) translateY(-20px);
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.75);
    `}
`;

const Cell = styled.div`
  height: 30px;
  background-color: ${props => props.theme.colors.cell};
  color: ${props => props.theme.text.cell};
  border: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
`;

const LeftRowCell = styled(Cell)`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.text.primary};
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

const PbeRowWrapper = styled.div`
  position: absolute;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: calc(20%) repeat(6, 1fr) calc(15%);
  width: 55vw;
  transform: translateY(-80px) scale(0.95);
  transition: transform 0.3s;
  margin-left: 1px;

  ${props =>
    props.isPbeOn &&
    css`
      transform: translateY(-30px);
      animation: ${PbeRowAnim} 0.5s;
    `}
`;

const PbeLeftRow = styled(LeftRowCell)`
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.text.constrast};
  padding-top: 20px;
`;

const PbeCell = styled(Cell)`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.text.constrast};
  padding-top: 20px;
`;
