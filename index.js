const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');

connection
    .authenticate()
    .then(() => {
        console.log("Database connection worked!");
    })
    .catch((err) => {
        console.log(err);
    })

// Dizer ao Express que usarei EJS como renderizador de HMTL
app.set('view engine', 'ejs');
// Setar qual pasta arquivos estáticos estão para serem usados (CSS, js, images)
app.use(express.static('public'));

// BodyParser vai decodificar os dados vindo pelo método POST para ser usado em js
app.use(bodyParser.urlencoded({extended: false}));
// Para ler dados enviados no formato json
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
})

app.post("/salvarPergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
});

app.listen(3000, () => {
    console.log("Server is running!");
});