const sequelize = require('sequelize');
const connection = require('../database');

const pergunta = connection.define('perguntas', {
    titulo: {
        type: sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: sequelize.TEXT,
        allowNull: false
    }
});

//Vai criar a tabela no banco e o "force: false" faz não forçar a recriação caso já exista.
pergunta.sync ({ force: false}).then(() => {});

module.exports = pergunta;