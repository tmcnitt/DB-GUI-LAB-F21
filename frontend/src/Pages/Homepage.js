import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Card } from "../Common/Card";
export const Homepage = (props) => {
  const [articles, setArticles] = useState([])

  const url = props.url;

  const getArticles = () => {
    axios.get(`http://${url}:8000/articles`).then(
      res => {
        const articles = res.data;
        setArticles(articles)
      }).catch(err => {
        console.log(err)
      });
  }

  useEffect(() => {
    getArticles();
  }, [])

  return (
    <>
      <div class="w-75 m-auto">
        <div class="d-flex justify-content-end mt-3">
          <Link to="/addarticle" class="btn btn-success">Add Article</Link>
          <Link to ="/addsource" class="btn btn-success ms-3">Add Source</Link>
        </div>
        <br></br>
        <div class="d-flex m-auto w-75 flex-column-reverse">
          {articles.map(article => {
            return (
              <Link key={article.id} class="text-decoration-none text-reset mb-3" to={`/article/${article.id}`}> <Card article={article} /></Link>
            )
          })}
        </div>
      </div>
    </>)
}
