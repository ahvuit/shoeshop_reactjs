import React from "react";
import {} from "antd";
import { BrowserRouter } from "react-router-dom";
//import logo from './logo.svg';
import "./App.css";
import AppHeader from "./Components/Header";
import AppFooter from "./Components/Footer";
import PageContent from "./Components/PageContent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        <PageContent />
        <AppFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />

//     <p>
//       Edit <code>src/App.js</code> and save to reload.
//     </p>
//     <span>
//       <span>Learn </span>
//       <a
//         className="App-link"
//         href="https://reactjs.org/"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         React
//       </a>
//       <span>, </span>
//       <a
//         className="App-link"
//         href="https://redux.js.org/"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Redux
//       </a>
//       <span>, </span>
//       <a
//         className="App-link"
//         href="https://redux-toolkit.js.org/"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Redux Toolkit
//       </a>
//       ,<span> and </span>
//       <a
//         className="App-link"
//         href="https://react-redux.js.org/"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         React Redux
//       </a>
//     </span>
//   </header>
// </div>
