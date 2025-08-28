import 'dotenv/config';
// or require('dotenv/config').config() as commonJS

// Importing middlewares
const { basicMidleware } = require('./midlewares/basicMidleware');

const express = require('express');
const server = express();

server.use(basicMidleware)
server.use(require('cors')());

const port = 3000;

server.get('/', (req, res) => {
    res.send('Bem-vindo ao Express de Carlos');
});

server.get('/example', (req, res) => {
    res.send('Eu sou um exemplo :)');
});

server.get('/random', (req, res) => {
    const random = Math.floor(Math.random() * 100);
    const response = { number: random}
    res.send(response);
});

const frasesInspiracionais = [
  "Sonhos são caminhos construídos pelo coração.",
  "O impossível é só uma opinião.",
  "Cada dia é uma nova oportunidade.",
  "Você é mais forte do que imagina.",
  "A gratidão transforma o que temos em suficiente.",
  "Não pare até se orgulhar.",
  "A jornada de mil milhas começa com um passo.",
  "Seja a mudança que deseja ver no mundo.",
  "O sucesso é a soma de pequenos esforços diários.",
  "Sorria, respire e vá com calma.",
  "A confiança em si mesmo é o primeiro segredo do sucesso.",
  "A vida é feita de escolhas. Escolha ser feliz.",
  "Supere seus limites e surpreenda-se.",
  "Você é capaz de coisas incríveis.",
  "Cada dia é uma página em branco."
];

server.get('/inspiration', (req, res) => {
    const randomQuote = frasesInspiracionais[Math.floor(Math.random() * frasesInspiracionais.length)];
    res.send({ quote: randomQuote });
})

server.listen(port, () => console.log(`Listening on port ${port}...`));