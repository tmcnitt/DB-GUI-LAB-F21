import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Card } from "../Common/Card";
import { ApiMain } from "../Common/ApiMain";
import { SearchBar } from "../Common/SearchBar";
export const Homepage = (props) => {
  const [articles, setArticles] = useState([])
  const [sources, setSources] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoading2, setLoading2] = useState(true);

  const api = new ApiMain();

  useEffect(() => {
    api.getArticles().then(res => {
      const articles = res.data;
      setArticles(articles);
      console.log(articles);
      setLoading(false);
    });
    api.getSources().then(res => {
      const sources = res.data;
      setSources(sources);
      setLoading2(false);
    });
  }, [])

  let onSearch = params => {
    api.getArticles().then(res => {
      let sources = res.data;
      sources.map((x, i) => console.log(x.title));
      
      if(params.title) {
        sources = sources.filter(sources => sources.title.toLowerCase().includes(params.title.toLowerCase()));
      }
      if(params.authorLastName) {
        sources = sources.filter(sources => sources.author_last_name.toLowerCase().includes(params.authorLastName.toLowerCase()));
      }
      setArticles(sources);
    });
  }

  if (isLoading || isLoading2) {
    return <div></div>
  }

  return (
    <>
      <div class="m-auto">
        <div class="d-flex flex-column-reverse">
          {articles.map(article => {
            return (
              <Card key={article.id} article={article} source={sources[article.source_id - 1].name} token={props.token} username={props.username} userType={props.userType} />
            )
          })}
          <br></br>
          <SearchBar onSearch={params => onSearch(params)}/>

          <div class="d-flex justify-content-end w-75 mt-3 mx-auto">
            {props.token && props.userType === "curator" && <Link to="/addarticle" class="btn btn-primary">Add Article</Link>}
            {props.token && props.userType === "curator" && <Link to="/addsource" class="btn btn-primary ms-3">Add Source</Link>}
          </div>

        </div>
      </div>
    </>)
}
