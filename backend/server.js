const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!password || password.length < 6) {
    return res.json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length > 0) {
        return res.json({
          success: false,
          message: "Email already exists",
        });
      }

      const hash = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users(name,email,password) VALUES(?,?,?)",
        [name, email, hash],
        (err) => {
          if (err) {
            return res.status(500).json(err);
          }

          res.json({
            success: true,
            message: "Registration Successful",
          });
        }
      );
    }
  );
});



app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.json({
          success: false,
          message: "User not found",
        });
      }

      const user = result[0];

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.json({
          success: false,
          message: "Invalid Password",
        });
      }

      db.query(
        "INSERT INTO login_users(user_id,email) VALUES(?,?)",
        [user.id, user.email]
      );

      res.json({
        success: true,
        message: "Login Success",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    }
  );
});



app.get("/login-users", (req, res) => {
  db.query(
    "SELECT * FROM login_users ORDER BY login_time DESC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});



app.get("/categories", (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});




app.post("/expenses", (req, res) => {
  const { user_id, title, amount, category_id } = req.body;

  db.query(
    `INSERT INTO expenses (user_id,title,amount,category_id) VALUES (?,?,?,?)`,
    [user_id, title, amount, category_id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "Expense Added",
      });
    }
  );
});


app.get("/expenses/:userId", (req, res) => {
  const { userId } = req.params;

  db.query(
    `
    SELECT 
      expenses.id,
      expenses.title,
      expenses.amount,
      categories.name AS category
    FROM expenses
    JOIN categories ON expenses.category_id = categories.id
    WHERE expenses.user_id=?
    `,
    [userId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});


app.put("/expenses/:id", (req, res) => {
  const { id } = req.params;
  const { title, amount, category_id } = req.body;

  db.query(
    `
    UPDATE expenses
    SET title=?, amount=?, category_id=?
    WHERE id=?
    `,
    [title, amount, category_id, id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "Expense Updated",
      });
    }
  );
});



app.delete("/expenses/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM expenses WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({
      success: true,
      message: "Expense Deleted",
    });
  });
});


app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});