import React, { useEffect, useState } from 'react';
import { Header } from "./Common/Header";
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import './App.css';
import './custom-theme.scss';
import { AddArticle, AddSource, ArticlePage, EditArticle, Homepage, Login, Signup } from './Pages';
// React functional component
function App() {
  const [token, setToken] = useState();
  const [updateToken, setUpdateToken] = useState();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(localStorage.getItem('token'));
    setUpdateToken(token);
  }, [token]);

  return (
    <div className="wrapper bg-secondary vh-auto min-vh-100 bg-gradient">
      <BrowserRouter>
        <Header token={updateToken} setToken={setToken}/>
        <Routes>
          <Route path="/signup" element={<Signup setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken}/>} />
          <Route exact path="/" element={<Homepage token={token} />} />
          <Route path="/addarticle" element={<AddArticle token={token} />} />
          <Route path="/article/:id/edit" element={<EditArticle token={token} />} />
          <Route path="/addsource" element={<AddSource token={token} />} />
          <Route path="/article/:id" element={<ArticlePage token={token} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
