angular.module("noteList").component("noteList", {
  templateUrl: "note-list/note-list.template.html",
  controller: [
    "$scope",
    function noteListController($scope) {
      const self = this;
      self.notes = $scope.$parent.notes;

      self.edit = function edit(id) {
        $scope.$parent.editNote(id);
      };
    }
  ]
});
