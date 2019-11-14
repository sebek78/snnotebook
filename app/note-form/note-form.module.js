'use strict';

import angular from 'angular';
import noteFormTemplate from "./note-form.template.html";
import "./note-form.css";

export default angular.module("noteForm", []).component("noteForm", {
    template: noteFormTemplate,
    controller: [
        "$scope",
        "$window",
        function noteFormController($scope, $window) {
            const self = this;
            self.query = $scope.$parent.note.text;

            self.addNote = function addNote(text) {
                if (text !== undefined) {
                    $scope.$parent.addNote(text);
                    this.setQuery("");
                    $window.location.href = "#!/";
                }
            };
            self.setQuery = function setQuery(text) {
                this.query = text;
            };
            self.backBtn = function backBtn() {
                $window.location.href = "#!/";
            };
        }
    ]
});

