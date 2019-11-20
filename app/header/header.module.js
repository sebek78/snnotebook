'use strict';

import angular from 'angular';
import headerTemplate from "./header.template.html";
import "./header.scss";

export default angular.module("header", []).component("header", {
    template: headerTemplate,
    controller: [
        "$scope",
        "$window",
        function headerController($scope, $window) {
            const self = this;
            self.addNoteBtn = function addNoteBtn() {
                $window.location.href = "/#!note-form";
            };
        }
    ]
});
