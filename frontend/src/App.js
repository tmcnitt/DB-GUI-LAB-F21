import React, { useEffect, useState } from 'react';
import { Header } from "./Common/Header";
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import './App.css';
import { AddArticle, AddSource, Article, EditArticle, Homepage, Login, Profile, Signup } from './Pages';
// React functional component
function App() {
  // ENTER YOUR EC2 PUBLIC IP/URL HERE
  const ec2_url = ''
  // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
  const ec2 = false;
  // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
  const url = ec2 ? ec2_url : 'localhost'

  const [token, setToken] = useState();
  const [updateToken, setUpdateToken] = useState();
  
  useEffect(() => {
    setToken(localStorage.getItem('token'));
    console.log('in app useeffect');
    setUpdateToken(token);
  }, [token]);

  return (
    <div className="wrapper bg-secondary vh-auto min-vh-100 bg-gradient">
      <BrowserRouter>
        <Header token={updateToken} setToken={setToken}/>
        <Routes>
          <Route path="/signup" element={<Signup url={url} setToken={setToken} />} />
          <Route path="/login" element={<Login url={url} setToken={setToken}/>} />
          <Route exact path="/" element={<Homepage url={url} token={token} />} />
          <Route path="/addarticle" element={<AddArticle url={url} token={token} />} />
          <Route path="/article/:id/edit" element={<EditArticle url={url} token={token} />} />
          <Route path="/addsource" element={<AddSource url={url} token={token} />} />
          <Route path="/article/:id" element={<Article url={url} token={token} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
