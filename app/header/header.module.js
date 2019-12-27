"use strict";

angular.module("header", []).component("header", {
  templateUrl: "header/header.template.html",
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
