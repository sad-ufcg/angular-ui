'use strict';
(() => {
    var app = angular.module('sadApp');

    function CardQuestaoController() {
        var cardQuestaoCtrl = this;
    };

    app.component('sadQuestionCard', {
        templateUrl: 'js/component/sad-question-card/sad-question-card.component.html',
        controller: CardQuestaoController,
        controllerAs: 'cardQuestaoCtrl',
        bindings: {
            enunciado: '<',
            numero: '=',
            radio: '=',
            tipo: '=',
            comentario: '=',
            numeroDeQuestoes: '='
            /*FIXME: não é aconselhável ter uma relação de "2way binding" com
            atributo fora do escopo do componente */
        }
    });

})();
