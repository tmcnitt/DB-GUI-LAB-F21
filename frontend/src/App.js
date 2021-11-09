import React, { useEffect, useState } from 'react';
import { Header } from "./Common/Header";
import { BrowserRouter, Route } from 'react-router-dom';
import {Routes} from 'react-router';
import './App.css';
import axios from 'axios';
import {Add, Article, Homepage, Login, Profile, Signup} from './Pages';
// React functional component
function App() {
  // ENTER YOUR EC2 PUBLIC IP/URL HERE
  const ec2_url = ''
  // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
  const ec2 = false;
  // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
  const url = ec2 ? ec2_url : 'localhost'

  return (
    <div className="wrapper bg-secondary vh-auto min-vh-100 bg-gradient">
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route exact path="/" element={<Homepage url = {url}/>}/>
        <Route path="/add" element={<Add url={url}/>}/>
        <Route path="/article" element={<Article/>}/>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
