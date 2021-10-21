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


  // POST /api/tags (create new tag)
  app.post('/tags', (req, res) => {
    var tag_content = req.body.tag_content;

    con.query("INSERT INTO tag (tag_content) VALUES (?)", tag_content, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result)); // Result in JSON format
    });
  });


  // GET /api/tags (get list of tags)
  app.get('/tags', (req, res) => {
    con.query("SELECT * FROM tag", function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });

}
