import { Router } from 'express';
import jwt from 'jsonwebtoken';

const Jwt_Pass = "1234567";
const router = Router();

const users = [
  {
    id: 1,
    username: "prabhat",
    password: "123"
  },
  {
    id: 2,
    username: "aditya",
    password: "123"
  }
];

function userExists(username: string, password: string) {
  return users.some(user => user.username === username && user.password === password);
}

router.post("/signin", (req, res) => {
  const { username, password } = req.body;

  if (!userExists(username, password)) {
    return res.status(401).send("Invalid username or password");
  }

  const token = jwt.sign({ username: username }, Jwt_Pass);

  return res.json({
    token: token
  });
});

export default router;
