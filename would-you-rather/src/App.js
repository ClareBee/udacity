import React from "react";
import "./App.css";
import Homepage from "./components/Homepage";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Nav />
      <main>
        <Homepage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
