import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Card } from "../Common/Card";
export const Homepage = (props) => {
  const [articles, setArticles] = useState([])
  const [sources, setSources] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const url = props.url;

  const getArticles = () => {
    axios.get(`http://${url}:8000/articles`).then(
      res => {
        const articles = res.data;
        setArticles(articles);
        setLoading(false);
      }).catch(err => {
        console.log(err)
      });
  }

  const getSources = () => {
    axios.get(`http://${props.url}:8000/sources`)
        .then(res => {
            const sources = res.data;
            setSources(sources);
            setLoading2(false);
        })
        .catch(err => {
            console.log(err);
        })
}

  useEffect(() => {
    getArticles();
    getSources();
  }, [])


  if (isLoading || isLoading2) {
    return <div></div>
  }

  return (
    <>
      <div class="w-75 m-auto">
        <div class="d-flex justify-content-end mt-3">
          {props.token && <Link to="/addarticle" class="btn btn-success">Add Article</Link>}
          {props.token && <Link to ="/addsource" class="btn btn-success ms-3">Add Source</Link>}
        </div>
        <br></br>
        <div class="d-flex flex-column-reverse">
          {articles.map(article => {
            return (
              <Card key={article.id} article={article} source={sources[article.source_id - 1].name} getArticles={getArticles} url={url}/>
            )
          })}
        </div>
      </div>
    </>)
}
