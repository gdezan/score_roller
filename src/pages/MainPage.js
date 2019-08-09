import React from "react";
import MainCard from "../components/MainCard";
import ThemeToggle from "../components/ThemeToggle";
import { useStateValue } from "../state";

const MainPage = props => {
  return (
    <>
      <MainCard useStateValue={useStateValue} />
      <ThemeToggle onClick={props.toggleTheme} isDark={props.isDark} />
    </>
  );
};

export default MainPage;
