'use strict';
(() => {
    var app = angular.module('sadApp');


    function QuestionCardController() {
        var questionCardCtrl = this;

        questionCardCtrl.$onInit = () => {
            console.log(questionCardCtrl.radioQuestion);

        }
       
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
        }
    });

})();