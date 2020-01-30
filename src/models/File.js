const mongoose = require('mongoose');

//criando o schema(tipo tabela do banco)
const File = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
},{
    timestamps: true,//armazenando a data no banco
    toObject: { virtuals: true },//carregar a virtual toda vez que File for convertido para objeto
    toJSON: { virtuals: true }//carregar a virtual toda vez que File for convertido para jSON
})

File.virtual('url').get(function() {
    return `http://localhost:3333/files/${encodeURIComponent(this.path)}`;
})

module.exports = mongoose.model("File", File);