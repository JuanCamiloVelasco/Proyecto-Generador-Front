import React, { useState } from "react";
import {
  Container,
  LogoContainer,
  Wrapper,
  Menu,
  MenuItem,
  MenuItemLink,
  MobileIcon,
} from "./Navbar.elements";
import {
  FaBattleNet,
  FaBars,
  FaTimes,
  FaCloud,
  FaFileCode,
  FaDragon

} from "react-icons/fa";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import Splash from "../SplashScreen";
import { ThemeProvider } from "styled-components";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  
  const LightTheme = {
    pageBackground: "white",
    titleColor: "orange",
    tagLineColor: "orange"
  };
  
  const DarkTheme = {
    pageBackground: "#23394d",
    titleColor: "orange",
    tagLineColor: "orange"
  }
  
  const themes = {
    light: LightTheme,
    dark: DarkTheme,
  }

  const [theme, setTheme] = useState("light")

  return (
    <Container>
      <Wrapper>
        <IconContext.Provider value={{ style: { fontSize: "2em" } }}>
          <LogoContainer>
            <FaBattleNet />
            <p>Generador </p>
            <p>Codigo</p>
          </LogoContainer>

          <MobileIcon onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <FaTimes /> : <FaBars />}
          </MobileIcon>

          <Menu open={showMobileMenu}>
          <MenuItem>
              <MenuItemLink onClick={() => navigate("/")}>
                <div>
                  <FaDragon />
                  Inicio
                </div>
              </MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink onClick={() => navigate("/ConexionList")}>
                <div>
                  <FaCloud />
                  Oracle
                </div>
              </MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink onClick={() => navigate("/ConexionListPost")}>
                <div>
                  <FaFileCode />
                  Postgresql
                </div>
              </MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink onClick={() => navigate("/ConexionListMysql")}>
                <div>
                  <FaDragon />
                  Mysql
                </div>
              </MenuItemLink>
            </MenuItem>
          </Menu>
        </IconContext.Provider>
      </Wrapper>
      <ThemeProvider theme={themes[theme]}>
        <Splash theme={theme} setTheme={setTheme} />
      </ThemeProvider>
    </Container>
  );
};

export default Navbar;