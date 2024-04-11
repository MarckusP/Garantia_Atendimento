import express from 'express';
import path from 'path';

const app = express();

app.use(express.json());

const selecoes = [
    {id: 1, selecao: 'Brasil', grupo: 'G'},
    {id: 2, selecao: 'Suiça', grupo: 'G'},
    {id: 3, selecao: 'Sérvia', grupo: 'G'},
    {id: 4, selecao: 'Camarões', grupo: 'G'}
]

function busc_Sel_Id(id){
    return selecoes.filter(selecao => selecao.id == id)
}

function buscaIndiceSelecao (id) {
    return selecoes.findIndex(selecao => selecao.id == id)
}

app.get('/', (req, res) => {
    res.send('Fazendo API');
});

//CREATE
app.post('/selecoes', (req, res)=>{
    selecoes.push(req.body);
    res.status(201).send(`seleção cadastrada com sucesso`);
});

//READ
 app.get('/selecoes/:id',(req, res) => {
     res.json(busc_Sel_Id(req.params.id));
 });


app.get('/selecoes', (req, res) =>{
    res.status(200).send(selecoes);
});

//UPDATE
app.put('/selecoes/:id', (req, res) =>{
    let index = buscaIndiceSelecao(req.params.id);
    selecoes[index].selecao = req.body.selecao;
    selecoes[index].grupo = req.body.grupo;
    res.json(selecoes);
});



//DELETE
app.delete('/selecoes/:id', (req, res) =>{
    let index = buscaIndiceSelecao(req.params.id)
    selecoes.splice(index, 1)
    res.send(`seleção ${req.params.id} foi excluida`)
});



export default app;
