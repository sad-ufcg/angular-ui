# Interface AngularJS para o Sistema de Avaliação Docente

Este projeto é uma aplicação web para compor a view do Sistema. 


## Instalando dependências

Há duas dependências a serem instaladas para este projeto ser executado com sucesso na sua máquina. 

* Nós utilizamos ferramentas via [npm][npm].
* E utilizamos também o [bower][bower].

O projeto está preconfigurado para ser executado com o simples comando: 

```bash
npm install
```

## Executando a aplicação

O projeto também está preconfigurado para uma inicialização rápida e simples. A maneira fácil de iniciar a nossa aplicação é: 

``` bash
npm start
```

E depois basta digitar no browser : `http://localhost:8000`

Além disto, é necessário rodar localmente o backend mocado, portanto, (num terminal Linux), faça: 

```bash
cd backend_moc
node httpQuestions.js
```

Isto irá fazer com que um backend rode localmente na sua máquina e as funcionalidades da aplicação sejam inicializadas corretamente. Para ver outros end points disponívels abra o arquivo `httpQuestions.js`.

```
http://localhost:3412/question
```

p.s. preocupe-se com o CORS.


## Executando a aplicação enquanto desenvolve

Utilizamos uma ferramenta do node.js chamada [http-server][http-server]. Você pode executar este webserver instalando as dependências requeridas. 

```bash
sudo npm install -g http-server
```

Agora basta você começar a desenvolver seu código. 

```bash
http-server -a localhost -p 8000
```


[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[http-server]: https://github.com/nodeapps/http-server
