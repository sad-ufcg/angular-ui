'use strict';
(() => {
    const app = angular.module('sadApp');

    function QuestionHeaderController() {
      let questionHeaderCtrl = this;
    };

    app.component('sadQuestionCardHeader', {
        templateUrl: 'js/component/sad-question-card-header/sad-question-card-header.component.html',
        controller: QuestionHeaderController,
        controllerAs: 'questionHeaderCtrl',
        bindings: {
            nomeQuestionario: '<',
            nomeDisciplina: '<',
            turma: '<',
            semestre: '<'
        }
    });

})();
