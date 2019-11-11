angular.module("header").component("header", {
  templateUrl: "header/header.template.html",
  controller: [
    "$scope",
    "$location",
    function headerController($scope, $location) {
      const self = this;

      self.addNoteBtn = function addNoteBtn() {
        $scope.$parent.setView("showForm");
        $location.path("/");
      };
    }
  ]
});
