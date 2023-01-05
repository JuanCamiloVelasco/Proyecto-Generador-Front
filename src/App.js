import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import MainMenu from './components/oracle/MainMenu';
import AddConexion from './components/oracle/AddConexion';
import ConexionList from './components/oracle/ConexionList';
import GetMetadata from "./components/oracle/GetMetadata";
import Navbar from './components/oracle/Navbar';
import UpdateConexion from "./components/oracle/UpdateConexion";

import AddConexionPost from './components/postgres/AddConexionPost';
import ConexionListPost from './components/postgres/ConexionListPost';
import GetMetadataPost from "./components/postgres/GetMetadataPost";
import UpdateConexionPost from "./components/postgres/UpdateConexionPost";

import AddConexionMysql from './components/mysql/AddConexionMysql';
import ConexionListMysql from './components/mysql/ConexionListMysql';
import GetMetadataMysql from "./components/mysql/GetMetadataMysql";
import UpdateConexionMysql from "./components/mysql/UpdateConexionMysql";

import { useState } from "react";
import Splash from "./components/SplashScreen";
import { ThemeProvider } from "styled-components";

const LightTheme = {
  pageBackground: "white",
  titleColor: "#dc658b",
  tagLineColor: "black"
};

const DarkTheme = {
  pageBackground: "#282c36",
  titleColor: "lightpink",
  tagLineColor: "lavender"
}

const themes = {
  light: LightTheme,
  dark: DarkTheme,
}


function App() {
  
  const [theme, setTheme] = useState("light")

  return (
    
    <>
    
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<MainMenu />} />
          <Route path="/" element={<MainMenu />} />
          <Route path="/conexionList" element={<ConexionList />} />
          <Route path="/addConexion" element={<AddConexion />} />
          <Route path="/editConexion/:id" element={<UpdateConexion />} />
          <Route path="/getMeta/:url/:schema/:user/:password" element={<GetMetadata />} />

          <Route path="/conexionListPost" element={<ConexionListPost />} />
          <Route path="/addConexionPost" element={<AddConexionPost />} />
          <Route path="/editConexionPost/:id" element={<UpdateConexionPost />} />
          <Route path="/getMetaPost/:url/:schema/:user/:password" element={<GetMetadataPost />} />

          <Route path="/conexionListMysql" element={<ConexionListMysql />} />
          <Route path="/addConexionMysql" element={<AddConexionMysql />} />
          <Route path="/editConexionMysql/:id" element={<UpdateConexionMysql />} />
          <Route path="/getMetaMysql/:url/:schema/:user/:password" element={<GetMetadataMysql />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
