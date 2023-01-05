import React, { useState } from "react";
import {
  Container,
  LogoContainer,
  Wrapper,
  Menu,
  MenuItem,
  MenuItemLink,
  MobileIcon,
} from "./MainMenu.elements";
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

const MainMenu = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(true);
  const navigate = useNavigate();
  
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
            <div className="h-16 px-8 flex items-center" >
                <h1 className="text-orange-400 text font-bold text-4xl">Bienvenido al Generador de Codigo</h1>
            </div>
            <div className="h-16 px-8 flex items-center" >
                <h2 className="text-orange-400 font-bold text-2xl">Seleccione la base de datos que desea utilizar</h2>
            </div>
            <MenuItem>
              <MenuItemLink onClick={() => navigate("/ConexionList")}>
                <div className="flex align-middle">
                  <FaCloud />
                  <p className="flex align-middle"> Oracle</p> 
                </div>
              </MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink onClick={() => navigate("/ConexionListPost")}>
                <div className="flex align-middle">
                  <FaFileCode />
                  <p className="flex align-middle"> Postgresql</p>
                </div>
              </MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink onClick={() => navigate("/ConexionListMysql")}>
                <div className="flex align-middle">
                  <FaDragon />
                  <p className="flex align-middle"> Mysql</p>
                </div>
              </MenuItemLink>
            </MenuItem>
          </Menu>
        </IconContext.Provider>
      </Wrapper>
    </Container>
  );
};

export default MainMenu;