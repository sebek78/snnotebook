angular.module("header").component("header", {
  templateUrl: "header/header.template.html",
  controller: [
    "$scope",
    function headerController($scope) {
      const self = this;

      self.addNoteBtn = function addNoteBtn() {
        $scope.$parent.setView("showForm");
      };
    }
  ]
});
