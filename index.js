const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');
const perguntaDB = require('./database/models/perguntas');
const respostaDB = require('./database/models/respostas');

connection
    .authenticate()
    .then(() => {
        console.log("Database connection worked!");
    })
    .catch((err) => {
        console.log(err);
    });

// Dizer ao Express que usarei EJS como renderizador de HMTL
app.set('view engine', 'ejs');
// Setar qual pasta arquivos estáticos estão para serem usados (CSS, js, images)
app.use(express.static('public'));

// BodyParser vai decodificar os dados vindo pelo método POST para ser usado em js
app.use(bodyParser.urlencoded({extended: false}));
// Para ler dados enviados no formato json
app.use(bodyParser.json());

app.get("/", (req, res) => {
    perguntaDB.findAll( { raw: true, order: [
        ['id','DESC'] //Ordena por id em DESC -> Decrescente | ASC -> Crescente
    ] } ).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
})

app.post("/salvarPergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    perguntaDB.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    }).catch((err) => {
        console.log(err);
    });
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    perguntaDB.findOne({
        where: {id: id}
    }).then(pergunta => {
        if (pergunta != undefined){  //Pergunta encontrada

            respostaDB.findAll({
                where: {perguntaId: id},
                order: [
                    ['createdAt', 'DESC']
                ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            }).catch((err) => {
                console.log(err);
            });
        }
        else                        // Pergunta não encontrada
            res.redirect("/");
            
    }).catch((err) => {
        console.log(err);
    })
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.perguntaId;

    respostaDB.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    }).catch((err) => {
        console.log(err);
    });
});

app.listen(3000, () => {
    console.log("Server is running!");
});