import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

// Components
import Header from './components/header';
import Footer from './components/footer';

// Pages
import About from './Pages/home';
import LoginForm from './Pages/login';
import { useEffect } from "react";

//Intstuctor and Student page
import Dashboard from './Pages/dashboard';

//admin
import Admin from './Pages/Admin';

function App() {
  // useEffect(() => {
  //   // Disable Right Click
  //   const disableRightClick = (event: MouseEvent) => {
  //     event.preventDefault();
  //   };

  //   // Disable Developer Tools Shortcuts
  //   const disableDevToolsShortcuts = (event: KeyboardEvent) => {
  //     if (
  //       (event.ctrlKey && event.shiftKey && event.key === "I") || // Ctrl + Shift + I
  //       (event.ctrlKey && event.shiftKey && event.key === "C") || // Ctrl + Shift + C
  //       (event.ctrlKey && event.shiftKey && event.key === "J") || // Ctrl + Shift + J
  //       (event.ctrlKey && event.key === "U") // Ctrl + U (View Source)
  //     ) {
  //       event.preventDefault();
  //     }
  //   };

  //   document.addEventListener("contextmenu", disableRightClick);
  //   document.addEventListener("keydown", disableDevToolsShortcuts);

  //   return () => {
  //     document.removeEventListener("contextmenu", disableRightClick);
  //     document.removeEventListener("keydown", disableDevToolsShortcuts);
  //   };
  // }, []);


  return (
    <Router>
      {/* Fixed Header */}
      <Header />

      {/* Page Content with padding to avoid overlap */}
      <div className="pt-13"> {/* Adjust based on your header height */}
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
