import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { StateProvider } from "./state";

import MainPage from "./pages/MainPage";

import LightTheme from "./themes/light";
import { getRolls, getBonus } from "./functions/StatsRolls";

const theme = LightTheme;
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.colors.background};
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    font-family: 'Montserrat', sans-serif;
  }
`;

function App() {
  const initialState = {
    rollType: "4d6dl",
    rolls: [0, 0, 0, 0, 0, 0, 0],
    bonus: [0, 0, 0, 0, 0, 0, 0],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "setRolls":
        const rolls = getRolls(state.rollType);
        const bonus = getBonus(rolls);
        return { ...state, rolls, bonus };
      case "setRollType":
        return { ...state, rollType: action.rollType };
      default:
        return state;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <MainPage />
        <GlobalStyle />
      </StateProvider>
    </ThemeProvider>
  );
}

export default App;
