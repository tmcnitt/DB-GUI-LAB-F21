const pool = require('./db')
const bcrypt = require("bcryptjs")
const jwt = require("./jwt")

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });

  // Create new user
  app.post("/users", (req, res) => {
    const { username, password, user_type } = req.body;
    const saltRounds = 10;

    const error = (err) => {
      logger.error("Error adding new user: \n", err);
      res.status(400).send({
        success: false,
        msg: "There was an error creating your user.",
      });
    };

    bcrypt.genSalt(saltRounds, (err, salt) => {

      if (err) {
        error(err);
        return;
      }

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          error(err);
          return;
        }

        const sql = "INSERT INTO db.users (username, password, user_type) VALUES(?, ?, ?)";

        pool.query(sql, [username, hash, user_type], (err, result) => {
          if (err) {
            error(err);
            return;
          }

          const JWT = jwt.makeJWT(result.insertId);
          res.status(200).send({
            success: true,
            data: { jwt: JWT, username, user_type: req.body.user_type, id: result.insertId },
          });


        });
      });
    });
  });

  // Login user
  app.post("/login", (req, res) => {
    const { username, password } = req.body;

    var sql = "SELECT * FROM db.users WHERE username = ?";

    pool.query(sql, [username], (err, rows) => {

      if (err || !rows.length) {
        logger.error("Error while username salt: \n", err);
        res
          .status(400)
          .send({ success: false, msg: "Invalid username or password" });
      } else {
        const hash = rows[0]["password"];

        bcrypt.compare(password, hash, (err, result) => {

          if (result && !err) {

            let { username, user_type, id } = rows[0];
            const JWT = jwt.makeJWT(rows[0].id);
            res.status(200).send({
              success: true,
              data: { jwt: JWT, username, user_type, id },
            });

          } else {

            logger.error("Error no matching password: \n", err);
            res.status(400).send({
              success: false,
              msg: "Incorrect username or password",
            });

          }
        });
      }
    });
  });

  //Check if JWT is valid
  app.get("/users/check", (req, res) => {
    jwt
      .verifyToken(req)
      .then((user) => {
        user = { username: user.username, user_type: user.user_type, id: user.id };
        res.status(200).send(user);
      })
      .catch(() => {
        res.status(400).end();
      });
  });

  //TAGS
  // POST /api/tags (create new tag)
  app.post('/tags', (req, res) => {
    var content = req.body.content;

    pool.query("INSERT INTO tags (content) VALUES (?)", content, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format[]
    });
  });


  // GET /api/tags (get list of tags)
  app.get('/tags', (req, res) => {
    pool.query("SELECT * FROM tags", function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });

  app.get('/tags/:id/articles', (req, res) => {
    const { id } = req.params;

    pool.query("SELECT articles.* FROM tagArticles JOIN articles on tagArticles.article_id = articles.id WHERE tagArticles.tag_id = ?", [id], function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });


  //ARTICLES

  // Create new article
  app.post('/articles', (req, res) => {
    const { title, url, is_opinion_piece, is_verified, summary, author_name } = req.body;

    const sql = "INSERT INTO articles ( title, url, is_opinion_piece, is_verified, summary, author_name) VALUES(?,?,?,?,?,?)";

    pool.query(sql, [title, url, is_opinion_piece, is_verified, summary, author_name], function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });

  // Get specific article
  app.get('/articles/:id', (req, res) => {
    const { id } = req.params;

    pool.query("SELECT * FROM articles WHERE id = ?", [id], function (err, rows, fields) {
      if (err) throw err;

      const sql = "SELECT * FROM tagArticles JOIN tags ON tagArticles.tag_id = tags.id WHERE article_id = ?";

      pool.query(sql, [rows[0].id], function (err, result, fields) {
        if (err) throw err;
        rows[0].tags = result
        res.end(JSON.stringify(rows[0]));
      })
    });
  });


  // Get all articles
  app.get('/articles', (req, res) => {
    pool.query("SELECT * FROM articles", function (err, rows, fields) {
      if (err) throw err;

      let promises = []
      for (let i = 0; i < rows.length; i++) {
        const sql = "SELECT * FROM tagArticles JOIN tags ON tagArticles.tag_id = tags.id WHERE article_id = ?";

        promises.push(new Promise((resolve, reject) => {
          pool.query(sql, [rows[i].id], function (err, result, fields) {
            if (err) throw err;
            rows[i].tags = result
            resolve()
          })
        }))
      }

      Promise.all(promises).then(() => {
        res.end(JSON.stringify(rows));
      })
    });
  });

  // Delete an article
  app.delete('/articles/:id', (req, res) => {
    const { id } = req.params;

    pool.query("DELETE FROM articles WHERE id = ?", [id], function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });

  // Vote on an article
  app.post('/articles/:id/vote', (req, res) => {
    const { id } = req.params;
    const { direction } = req.body;

    pool.query("SELECT * FROM articles WHERE id = ?", [id], function (err, rows, fields) {
      if (err || !rows.length) {
        res
          .status(400)
          .send({ success: false, msg: "Invalid article ID" });

        return
      }

      const { avg_political_bias, num_political_votes } = rows[0];

      const curr_sum = avg_political_bias * num_political_votes
      const new_sum = curr_sum + direction;

      const new_count = num_political_votes + 1;
      const new_avg = new_sum / new_count;

      pool.query("UPDATE articles SET num_political_votes = ?, avg_political_bias = ? WHERE id = ?", [new_count, new_avg, id], function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));
      });
    });
  });

  // Update an article
  app.put('/articles', (req, res) => {
    const { id, title, author_name, summary, is_verified, is_opinion_piece } = req.body;

    pool.query("UPDATE articles SET title = ?, author_name = ?, summary = ?, is_verified = ?, is_opinion_piece = ? WHERE id = ?", [title, author_name, summary, is_verified, is_opinion_piece, id], function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });

  // Get list of authors
  app.get("/authors", (req, res) => {
    pool.query("SELECT DISTINCT author_name FROM articles", function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  })


  //COMMENTS

  //get comments
  app.get('/articles/:article_id/comments', function (req, res) {
    pool.query("SELECT * FROM comments WHERE article_id=?", [req.params.article_id], function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });

  //post like to comments
  app.post('/articles/:article_id/comments/:comment_id/like', async (req, res) => {
    pool.query("UPDATE `comments` SET `num_likes` = (`num_likes` + 1) WHERE `article_id` = ? AND `id` = ?", [req.params.article_id, req.params.comment_id], function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });

  //post to comments
  app.post('/articles/:article_id/comments', async (req, res) => {
    const { article_id, user_id, comment } = req.body;
    const sql = "INSERT INTO `comments` (article_id,user_id,num_likes,comment) VALUES (?,?,?,?)";

    pool.query(sql, [article_id, user_id, 0, comment], function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });


  // SOURCES

  // POST /sources - Create a new source
  app.post('/sources', (req, res) => {
    const { name, base_url, owner_name, bias } = req.body;

    const sql = "INSERT INTO sources (name, base_url, owner_name, bias) VALUES (?,?,?,?)";

    pool.query(sql, [name, base_url, owner_name, bias], function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });

  // GET /sources - Get all sources
  app.get('/sources', (req, res) => {
    pool.query("SELECT * FROM sources", function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });

  // PUT /sources
  app.put('/sources', (req, res) => {
    const { id, name, base_url, owner_name, bias } = req.body;

    pool.query("UPDATE sources SET name = ?, base_url = ?, owner_name = ?, bias = ? WHERE id = ?", [name, base_url, owner_name, bias, id], function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });

  // POST /sources/{id}/vote
  // Vote on a source
  app.post('/sources/:id/vote', (req, res) => {
    const { id } = req.params;
    const { direction } = req.body;

    pool.query("SELECT * FROM sources WHERE id = ?", [id], function (err, rows, fields) {
      if (err || !rows.length) {
        res
          .status(400)
          .send({ success: false, msg: "Invalid source ID" });

        return
      }

      const { avg_political_bias, num_political_votes } = rows[0];

      const curr_sum = avg_political_bias * num_political_votes
      const new_sum = curr_sum + direction;

      const new_count = num_political_votes + 1;
      const new_avg = new_sum / new_count;

      pool.query("UPDATE sources SET num_political_votes = ?, avg_political_bias = ? WHERE id = ?", [new_count, new_avg, id], function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));
      });
    });
  });

  // TAG ARTICLES

  // POST /articles/{id}/tags
  app.post('/articles/:id/tags', (req, res) => {
    const { id } = req.params;
    const { tag_id } = req.body;

    pool.query("INSERT INTO tagArticles (article_id, tag_id) VALUES (?, ?) ", [id, tag_id], function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });

  // DELETE /articles/{id}/tags/{tag_id}
  app.delete('/articles/:id/tags/:tag_id', (req, res) => {
    const { id } = req.params;
    const { tag_id } = req.params;

    pool.query("DELETE FROM tagArticles WHERE article_id = ? AND tag_id = ?", [id, tag_id], function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });

  // POST /articles/{id}/tags/{tag_id}/like
  app.post('/articles/:id/tags/:tag_id/like', async (req, res) => {
    pool.query("UPDATE `tagArticles` SET `num_likes` = (`num_likes` + 1) WHERE `article_id` = ? AND `tag_id` = ?", [req.params.id, req.params.tag_id], function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });

  // Dislike a specific tag
  app.post('/articles/:id/tags/:tag_id/dislike', async (req, res) => {
    pool.query("UPDATE `tagArticles` SET `num_dislikes` = (`num_dislikes` + 1) WHERE `article_id` = ? AND `tag_id` = ?", [req.params.id, req.params.tag_id], function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });


}
