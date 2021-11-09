import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Card } from "../Common/Card";
export const Homepage = (props) => {
    //var articles = props.articles;
    const [articles, setArticles] = useState([])

    const url = props.url;

    const fetchVals = () => {
        axios.get(`http://${url}:8000/articles`).then(
          res => {
            const articles = res.data;
            console.log(articles);
            setArticles(articles)
          }).catch(err => {
            console.log(err)
          });
      }

      useEffect(() => {
        fetchVals();
      }, [])

    return (
        <>
            <div class="w-75 m-auto">
                <div class="d-flex justify-content-end mt-3">
                <Link to="/add" class="btn btn-success">Add</Link>
                </div>
                <br></br>
                <div class="d-flex m-auto w-75 flex-column-reverse">
                    {articles.map(article => {
                        return (
                            <Link key={article.id} class="text-decoration-none text-reset mb-3" to={`/article`} state={article}> <Card article={article} /></Link>
                        )
                    })}
                </div>
            </div>
        </>)
}
