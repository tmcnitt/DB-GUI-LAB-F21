import React, { useEffect, useState } from 'react';
import { Header } from "./Common/Header";
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import { ApiMain } from './Common';
import './App.css';
import './custom-theme.scss';
import { AddArticle, AddSource, ArticlePage, EditArticle, Homepage, Login, Signup, TagArticle } from './Pages';

// React functional component
function App() {
  const [token, setToken] = useState();
  const [username, setUserName] = useState();
  const [userType, setUserType] = useState();
  const [updateToken, setUpdateToken] = useState();

  const api = new ApiMain();

  useEffect(() => {
    const tokenn = localStorage.getItem('token');
    api.checkUser(tokenn).then(res => {
      console.log('token checked');
      setToken(tokenn);
      if (res.status == 200) {
        setUserName(res.data.username);
        setUserType(res.data.user_type);
      }
      else {
        setUserName(null);
        setUserType(null);
      }
    }).catch(err => {
      console.log(err);
      setUpdateToken(token);
    }
    ).finally(() => {
      setUpdateToken(token);
      console.log(username, " ", userType);
    }
    );
  }, [updateToken, token]);

  return (
    <div className="wrapper bg-secondary vh-auto min-vh-100 bg-gradient">
      <BrowserRouter>
        <Header token={updateToken} setToken={setToken} />
        <Routes>
          <Route path="/signup" element={<Signup setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route exact path="/" element={<Homepage token={token} username={username} userType={userType} />} />
          <Route path="/addarticle" element={<AddArticle token={token} username={username} userType={userType} />} />
          <Route path="/article/:id/edit" element={<EditArticle token={token} username={username} userType={userType} />} />
          <Route path="/article/:id/tag" element={<TagArticle token={token} username={username} userType={userType} />} />
          <Route path="/addsource" element={<AddSource token={token} username={username} userType={userType} />} />
          <Route path="/article/:id" element={<ArticlePage token={token} username={username} userType={userType} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
