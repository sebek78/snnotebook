angular.module("noteList").component("noteList", {
  templateUrl: "note-list/note-list.template.html",
  controller: [
    "$scope",
    function noteListController($scope) {
      const self = this;
      self.notes = $scope.$parent.notes;

      self.editNote = function editNote(id) {
        $scope.$parent.editNote(id);
      };
      self.deleteNote = function deleteNote(id) {
        $scope.$parent.deleteNote(id);
      };
    }
  ]
});
