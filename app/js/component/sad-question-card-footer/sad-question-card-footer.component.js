'use strict';
(() => {
    var app = angular.module('sadApp');


    function QuestionFooterController() {
        var questionFooterCtrl = this;

        questionFooterCtrl.previous = () => {
            questionFooterCtrl.previousQuestion({});
        };

        questionFooterCtrl.next = () => {
            questionFooterCtrl.nextQuestion({});
        };

    }



    app.component('sadQuestionCardFooter', {
        templateUrl: 'js/component/sad-question-card-footer/sad-question-card-footer.component.html',
        controller: QuestionFooterController,
        controllerAs: 'questionFooterCtrl',
        bindings: {
            question: '<',
            radioQuestion: '=',
            numberQuestion: '<',
            numberOfQuestions: '<',
            nextQuestion: '&',
            previousQuestion: '&',
            percentageValue: '<'
        }
    });

})();