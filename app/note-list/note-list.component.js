angular.module("noteList").component("noteList", {
  templateUrl: "note-list/note-list.template.html",
  controller: [
    "$scope",
    function noteListController($scope) {
      var self = this;
      self.notes = $scope.$parent.notes;
    }
  ]
});
