'use strict';
(() => {
    var app = angular.module('sadApp');


    function QuestionCardController() {
        var questionCardCtrl = this;

    }



    app.component('sadQuestionCard', {
        templateUrl: 'js/component/sad-question-card/sad-question-card.component.html',
        controller: QuestionCardController,
        controllerAs: 'questionCardCtrl',
        bindings: {
            question: '<',
            radioQuestion: '=',
            textQuestion: '=',
            numberQuestion: '<'
            /*FIXME: não é aconselhável ter uma relação de "2way binding" com 
            atributo fora do escopo do componente */
        }
    });

})();