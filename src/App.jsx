// Importa hooks e componentes do React e bibliotecas externas.
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaQrcode, FaSearch, FaTasks, FaRegQuestionCircle, FaGlobeAmericas, 
        FaNetworkWired, FaBars, FaArrowLeft } from "react-icons/fa";

import QRCodeGenerator from "./components/QRCodeGenerator/QRCodeGenarator";
import IPAddressFinder from "./components/IPAddressFinder/IPAddressFinder";
import MovieSearchEngine from "./components/MovieSearchEngine/MovieSearchEngine";
import TodoApp from "./components/TodoApp/TodoApp";
import QuizApp from "./components/QuizApp/QuizApp";
import LanguageTranslator from "./components/LanguageTranslator/LanguageTranslator";
import Login from "./components/Login/Login";
import "./App.css";
import { AppContainer, MainContent, CarouselContainer, NavBar, NavBarToggle, StyledLink,
          Footer, CarouselItem, ReturnButton, CustomCarousel, LogoutButton} from './App.styled' // Importa os estilos do App

// Define o componente principal do aplicativo.
const App = () => {
  // Cria estados para autenticação, visibilidade da barra de navegação, componente atual, e índice do carrossel.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate(); // Hook para navegação.

  // Efeito colateral que redireciona para a página de login se não estiver autenticado.
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Função para simular login e redirecionar para o gerador de QR code.
  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/qrcode-generator");
  };

  // Função para simular logout e redirecionar para a página de login.
  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  // Alterna a visibilidade da barra de navegação.
  const toggleNavBar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  // Função para definir o componente atual a ser exibido e atualizar o índice do carrossel.
  const handleAccess = (index, component) => {
    setCarouselIndex(index);
    setCurrentComponent(component);
  };

  // Função para retornar ao carrossel principal.
  const handleReturn = () => {
    setCurrentComponent(null);
  };

  // Função para renderizar o componente atual com base no estado.
  const renderComponent = () => {
    switch (currentComponent) {
      case "QRCodeGenerator":
        return <QRCodeGenerator />;
      case "IPAddressFinder":
        return <IPAddressFinder />;
      case "MovieSearchEngine":
        return <MovieSearchEngine />;
      case "TodoApp":
        return <TodoApp />;
      case "QuizApp":
        return <QuizApp />;
      case "LanguageTranslator":
        return <LanguageTranslator />;
      default:
        return null;
    }
  };

  // Renderiza o componente principal.
  return (
    <AppContainer>
      <NavBarToggle onClick={toggleNavBar}>
        <FaBars size={24} color="#2C3E50" />
      </NavBarToggle>
      {!isAuthenticated ? (
        <MainContent>
          <Login onLogin={handleLogin} />
        </MainContent>
      ) : (
        <>
          <NavBar $isOpen={isNavBarOpen}>
            <StyledLink onClick={() => handleAccess(0, "QRCodeGenerator")}>
              <FaQrcode />
              QR Code Generator
            </StyledLink>
            <StyledLink onClick={() => handleAccess(1, "IPAddressFinder")}>
              <FaNetworkWired />
              IP Address Finder
            </StyledLink>
            <StyledLink onClick={() => handleAccess(2, "MovieSearchEngine")}>
              <FaSearch />
              Movie Search
            </StyledLink>
            <StyledLink onClick={() => handleAccess(3, "TodoApp")}>
              <FaTasks />
              Todo App
            </StyledLink>
            <StyledLink onClick={() => handleAccess(4, "QuizApp")}>
              <FaRegQuestionCircle />
              Quiz App
            </StyledLink>
            <StyledLink onClick={() => handleAccess(5, "LanguageTranslator")}>
              <FaGlobeAmericas />
              Translator
            </StyledLink>
            <LogoutButton
              onClick={handleLogout}>
              Logout
            </LogoutButton>
          </NavBar>
          <MainContent>
            {currentComponent ? (
              <>
                {renderComponent()}
                <ReturnButton onClick={handleReturn}>
                  <FaArrowLeft /> Return
                </ReturnButton>
              </>
            ) : (
              <CarouselContainer>
                <CustomCarousel
                  showArrows={true}
                  infiniteLoop={true}
                  autoPlay={true}
                  interval={5000}
                  selectedItem={carouselIndex}
                  onChange={(index) => setCarouselIndex(index)}
                >
                  <CarouselItem>
                    <h2>QR Code Generator</h2>
                    <button onClick={() => handleAccess(0, "QRCodeGenerator")}>
                      Acessar
                    </button>
                  </CarouselItem>
                  <CarouselItem>
                    <h2>IP Address Finder</h2>
                    <button onClick={() => handleAccess(1, "IPAddressFinder")}>
                      Acessar
                    </button>
                  </CarouselItem>
                  <CarouselItem>
                    <h2>Movie Search Engine</h2>
                    <button
                      onClick={() => handleAccess(2, "MovieSearchEngine")}
                    >
                      Acessar
                    </button>
                  </CarouselItem>
                  <CarouselItem>
                    <h2>Todo App</h2>
                    <button onClick={() => handleAccess(3, "TodoApp")}>
                      Acessar
                    </button>
                  </CarouselItem>
                  <CarouselItem>
                    <h2>Quiz App</h2>
                    <button onClick={() => handleAccess(4, "QuizApp")}>
                      Acessar
                    </button>
                  </CarouselItem>
                  <CarouselItem>
                    <h2>Language Translator</h2>
                    <button
                      onClick={() => handleAccess(5, "LanguageTranslator")}
                    >
                      Acessar
                    </button>
                  </CarouselItem>
                </CustomCarousel>
              </CarouselContainer>
            )}
            <Footer>© 2024 Your Company | All rights reserved</Footer>
          </MainContent>
        </>
      )}
    </AppContainer>
  );
};

// Exporta o componente App para ser utilizado em outras partes da aplicação.
export default App;
