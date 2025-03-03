import React, { useState, useEffect } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import RoleSelection from "./RoleSelection";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Apply dark mode by default
    document.documentElement.classList.add("dark");
  }, []);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleRoleSelect = (role: string) => {
    console.log(`Navigating to ${role} dashboard`);
    navigate(`/${role}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header onThemeToggle={handleThemeToggle} isDarkMode={isDarkMode} />

      <main className="flex-grow flex items-center justify-center p-4">
        <RoleSelection onRoleSelect={handleRoleSelect} />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
