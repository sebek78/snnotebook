angular.module("noteList").component("noteList", {
  templateUrl: "note-list/note-list.template.html",
  controller: [
    "$scope",
    function noteListController($scope) {
      const self = this;
      self.notes = $scope.$parent.notes;
      self.showList = $scope.$parent.view.list;
      self.showDeleteWarning = false;
      self.deleteID = null;

      $scope.$parent.$watch(
        "view",
        function(newValue) {
          self.showList = newValue.list;
        },
        true
      );

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
