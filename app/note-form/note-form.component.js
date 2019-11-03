angular.module("noteForm").component("noteForm", {
  templateUrl: "note-form/note-form.template.html",
  controller: [
    "$scope",
    function noteFormController($scope) {
      const self = this;
      self.query = $scope.$parent.note.text;

      $scope.$parent.$watch(
        "note",
        function(newValue) {
          self.query = newValue.text;
        },
        true
      );

      self.addNote = function addNote(text) {
        if (text !== undefined) {
          $scope.$parent.addNote(text);
        }
      };
      self.setQuery = function setQuery(text) {
        this.query = text;
      };
    }
  ]
});
