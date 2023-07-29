import React from "react";
import { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {Routes, Route, BrowserRouter,  useLocation } from "react-router-dom"
import Topbar from "./scenes/global/topbar";
import Header from "./components/Header";
import Sidebar from "./scenes/global/sidebar";
import Dashboard from "./scenes/dashboard/index";
import SignUpPage from "./scenes/SignUpPage";
import SignInPage from "./scenes/SignInPage";
import { AuthProvider } from "./AuthContext";
import SelectedCandidates from "./scenes/SelectedCandidates";
import AppliedCandidates from "./scenes/AppliedCandidates";
import FormDialog from "./scenes/candidate_form";
import VoteAction from "./scenes/vote";


function SidebarWrapper() {
  const location = useLocation();
  const isSidebar = location.pathname !== '/signup' && location.pathname !== '/signin' && location.pathname !== '/' && location.pathname !== '/signup/';

  return isSidebar ? <Sidebar /> : null;
}


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>

        <div className="app">
        <BrowserRouter>
        <Header/>
        <SidebarWrapper />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar}/>
            <AuthProvider>
            <Routes>

              <Route path="/" element={<SignInPage />}  />
              <Route path="/signin" element={<SignInPage />}  />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/applied_candidates" element={<AppliedCandidates/>} />
              <Route path="/selected_candidates" element={<SelectedCandidates />} />
              <Route path="/signup" element={<SignUpPage />}  />
              <Route path="/details" element={<FormDialog />}  />
              <Route path="/vote" element={<VoteAction/>} />
              

              
            </Routes>
          </AuthProvider>

          </main>
        </BrowserRouter>
    </div>

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
