import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import { AuthProvider, useAuth } from "./components/Login/AuthContext";
import Login from "./components/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";
import Launches from "./components/Launches/Launches";
import EnergyInformation from "./components/EnergyInformation/EnergyInformation";
import "./styles.css";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/" />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/launches" element={<ProtectedRoute><Launches /></ProtectedRoute>} />
    <Route path="/energy" element={<ProtectedRoute><EnergyInformation /></ProtectedRoute>} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <Router>
        <Navigation />
        <AppRoutes />
      </Router>
    </AuthProvider>
  </Provider>
);

export default App;
