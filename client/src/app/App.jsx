import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Menu, Navbar } from '../components';
import { darkTheme, lightTheme } from '../utils/Theme';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home, Login, Video } from '../pages';

// Styles
const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
  transition: 0.5s;
`;

const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App() {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem('themeColor') === null
      ? 'darkTheme'
      : localStorage.getItem('themeColor')
  );

  // Save current theme to local storage
  useEffect(() => {
    localStorage.setItem('themeColor', themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider theme={themeMode === 'lightTheme' ? lightTheme : darkTheme}>
      <Container>
        <BrowserRouter>
          {/* Sidebar  */}
          <Menu themeMode={themeMode} setThemeMode={setThemeMode} />
          {/* Main section */}
          <Main>
            <Navbar />
            <Wrapper>
              {/* Routes  */}
              <Routes>
                <Route path='/'>
                  <Route index element={<Home />} />
                  <Route path='login' element={<Login />} />
                  <Route path='video'>
                    <Route path=':id' element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
