import { Router } from "express";
import models from '../models/index';

const User = models.User;

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.findAll()
  return res.send({usuarios: users});
});

router.get("/:userId", async (req, res) => {
  const user = await User.findByPk(req.params.userId);
  if (!user){
    return res.status(404).send({
      message: 'Usuário não encontrado'
    });
  }
  return res.status(200).send(user);
});

router.post("/", async (req, res) => {
  const {username, email} = req.body;
  const newUser = {
    username: username,
    email: email
  }

  const createdUser = await User.create(newUser);
  return res.status(201).send({
    message: 'Usuário criado com sucesso',
    usuario: createdUser
  });
});

router.put("/:userId", (req, res) => {
  return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

router.delete("/:userId", (req, res) => {
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

export default router;
