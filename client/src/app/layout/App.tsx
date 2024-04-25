import Catalog from "../../features/Catalog/Catalog";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {

  
  const [darkMode,setDarkMode] = useState(false);

  const paletteType = darkMode ? 'dark' : 'light'

  const theme = createTheme({
    palette:{
      mode:paletteType
    }
  })

  function handleThemeMode()
  {
    setDarkMode(!darkMode);
  }
  
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline></CssBaseline>
      <Header darkMode={darkMode} handleThemeChange={handleThemeMode}/>

      <Container>
         <Outlet/>
      </Container>
      
    
    </ThemeProvider>
  )
}

export default App