'use strict';

import angular from 'angular';
import noteListTemplate from "./note-list.template.html";
import "./note-list.scss";
import deleteWarning from "./delete-warning.module.js";
import emptyListMessage from "./message.module";

export default angular.module("noteList", ["deleteWarning", "emptyListMessage"]).component("noteList", {
    template: noteListTemplate,
    controller: [
        "$scope",
        function noteListController($scope) {
            const self = this;
            self.notes = $scope.$parent.notes;
            self.showDeleteWarning = false;
            self.deleteID = null;

            self.editNote = function editNote(id) {
                $scope.$parent.editNote(id);
            };
            self.clickDeleteBtn = function clickDeleteBtn(id) {
                this.showDeleteWarning = true;
                this.deleteID = id;
            };
            self.deleteNote = function deleteNote(id) {
                if (id !== undefined) $scope.$parent.deleteNote(id);
                this.showDeleteWarning = false;
                this.deleteID = null;
            };
        }
    ]
});

