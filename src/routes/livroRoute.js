const express = require("express");
const Router = express.Router();
const Livro = require("../models/Livro");
const authentication = require("../middleware/Authentication")

Router.get("/:userId/:token", authentication, async (req, res) => {
    const livros = await Livro.findAll({ where: { userId: req.params.userId } });
    if (livros) {
        res.json({ success: true, livros: livros })
    } else {
        res.json({ success: false })
    }
})

Router.post("/", authentication, async (req, res) => {
    const livro = await Livro.create({ nome: req.body.nome, categoria: req.body.categoria, autor: req.body.autor, userId: req.body.userId,linkThumbnail:req.body.linkThumbnail });
    if (livro) {
        res.json({ success: true })
    } else {
        res.json({ success: false })
    }
})

Router.post("/altera", authentication, async (req, res) => {
    const livro = await Livro.update({ nome: req.body.nome, categoria: req.body.categoria, autor: req.body.autor, userId: req.body.userId,linkThumbnail: req.body.linkThumbnail},{where:{id:req.body.id}});
    if (livro) {
        res.json({ success: true })
    } else {
        res.json({ success: false })
    }
})

module.exports = Router;
