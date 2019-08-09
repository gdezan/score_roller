import React, { useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { StateProvider } from "./state";

import MainPage from "./pages/MainPage";

import LightTheme from "./themes/light";
import DarkTheme from "./themes/dark";
import { getRolls, getBonus, getPointBuy } from "./functions/StatsRolls";

const GlobalStyle = createGlobalStyle`
    body {
      background-color: ${props => props.theme.colors.background};
      text-align: center;
      display: flex;
      align-items: center;
      flex-direction: column;
      font-family: 'Montserrat', sans-serif;
      transition: background-color 0.4s, color 0.4s;
    }
  `;

function App() {
  const [isDark, toggleTheme] = useState(false);
  const theme = isDark ? DarkTheme : LightTheme;

  const initialState = {
    rollType: "4d6dl",
    rolls: [0, 0, 0, 0, 0, 0, 0],
    bonus: [0, 0, 0, 0, 0, 0, 0],
    pbe: [0, 0, 0, 0, 0, 0, 0],
    isPbeOn: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "setRolls":
        const rolls = getRolls(state.rollType);
        const bonus = getBonus(rolls);
        const pbe = getPointBuy(rolls);
        return { ...state, rolls, bonus, pbe };
      case "setRollType":
        return { ...state, rollType: action.rollType };
      case "togglePbe":
        return { ...state, isPbeOn: !state.isPbeOn };
      default:
        return state;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <MainPage toggleTheme={() => toggleTheme(!isDark)} isDark={isDark} />
        <GlobalStyle theme={theme} />
      </StateProvider>
    </ThemeProvider>
  );
}

export default App;
