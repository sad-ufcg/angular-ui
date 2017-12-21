# Interface AngularJS+Material-Design para o Sistema de Avaliação Docente

Este projeto é uma aplicação web para compor a view do Sistema. 


## Instalando dependências

* Nós utilizamos ferramentas via [npm][npm].

O projeto está preconfigurado para ser executado com o simples comando: 

``` bash
npm install
```

## Executando a aplicação

O projeto também está preconfigurado para uma inicialização rápida e simples. A maneira fácil de iniciar a nossa aplicação é: 

``` bash
npm start
```

E depois basta digitar no browser : `http://localhost:8000/app/#/home`

Mas, para uma visualização completa da aplicação, o melhor é utilizar um *mockup*.

## Mockup para a execução

Lembrando que para a execução dos passos a seguir, você precisa ter instalado em seu computador as seguintes dependências:

* [Python 3][python3]
* [Python Pip3][python3pip]
* [Maven][maven]

Para conseguir o *mockup*, execute os seguintes comandos (terminal linux):

``` bash
git clone https://github.com/sad-ufcg/back-end
cd back-end
mvn spring-boot:run
```

Em outro terminal, após a execução do passo acima, execute:

``` bash
cd system_tests
python3 question_post.py
```

O link exemplo que poderá ser utilizado para visualização do form é: `localhost:8000/app/#/form/123/Programacao/5249483656845`.

[npm]: https://www.npmjs.org/
[python3]: https://www.python.org/
[python3pip]: https://pypi.python.org/pypi/pip
[maven]: https://maven.apache.org/

