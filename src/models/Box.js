const mongoose = require('mongoose');

//criando o schema(tipo tabela do banco)
const Box = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File"}]
},{
    timestamps: true//armazenando a data no banco
})

module.exports = mongoose.model("Box", Box);