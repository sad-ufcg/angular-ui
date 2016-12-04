# Interface angularJS para o Sistema de Avaliação Docente

Este projeto é uma aplicação web para compor a view do Sistema. 


##Instalando Dependências

Há duas dependências a serem instaladas para este projeto ser executado com sucesso na sua máquina. 

* Nós utilizamos ferramentes via [npm][npm].
* E utilizamos também o [bower][bower].

O projeto está preconfigurado para ser executado com o simples comando: 

```
npm install
```

##Executando a aplicação

O projeto também está preconfigurado para uma inicialização rápida e simples. A maneira fácil de iniciar a nossa aplicação é: 

``` 
npm start
```

E depois basta digitar no browser : `http://localhost:8000`

Além disto, é necessário rodar localmente o backend mocado, portanto, (no linux), faça: 

```
$ cd backend_moc
$ node httpQuestions.js
```

Isto ira fazer com que um backend rode localmente na sua máquina e as funcionalidades da aplicação sejam inicializadas corretamente. 

``` 
localhost:3412/questions

```




##Executando a aplicação enquanto desenvolve

Utilizamos uma ferramente do node.js chamada [http-server][http-server]. Você pode executar este webserve instalando as dependências requeridas. 

```
sudo npm install -g http-server
```

Agora basta você começa a desenvoler seu código. 

```
http-server -a localhost -p 8000
```


[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[http-server]: https://github.com/nodeapps/http-server