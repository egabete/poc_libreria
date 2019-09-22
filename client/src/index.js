import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// import drizzle functions and contract artifact
import { Drizzle } from "drizzle";
import Libreria from "./contracts/Libreria.json";

// let drizzle know what contracts we want and how to access our test blockchain
const options = {
  contracts: [Libreria],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545",
    },
  },
};

// setup drizzle
const drizzle = new Drizzle(options);

ReactDOM.render(<App drizzle={drizzle}/>, document.getElementById('root'));