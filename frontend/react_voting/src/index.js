// import React from 'react';
// import ReactDOM from 'react-dom';

// import './index.css';
// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import App from './App';

// import Sidebar from './scenes/global/sidebar';
// import Topbar from './scenes/global/topbar';


// const routing = (
// 	<Router>
// 		<React.StrictMode>
//       <Topbar/>
// 			<Sidebar />

// 			<Routes>
// 				<Route exact path="/" component={App} />
// 			</Routes>

// 		</React.StrictMode>
// 	</Router>
// );

// ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA




import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    
      <App />
    
  </React.StrictMode>
);