import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import MainPage from "./pages/MainPage";

import LightTheme from "./themes/light";

const theme = LightTheme;
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.colors.background};
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <MainPage />
        <GlobalStyle />
      </>
    </ThemeProvider>
  );
}

export default App;
