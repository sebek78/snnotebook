angular.module("noteForm").component("noteForm", {
  templateUrl: "note-form/note-form.template.html",
  controller: [
    "$scope",
    function noteFormController($scope) {
      const self = this;
      self.query = $scope.$parent.note.text;
      self.view = $scope.$parent.view.form;

      $scope.$parent.$watch(
        "note",
        function(newValue) {
          self.query = newValue.text;
        },
        true
      );

      $scope.$parent.$watch(
        "view",
        function(newValue) {
          self.view = newValue.form;
        },
        true
      );
      self.addNote = function addNote(text) {
        if (text !== undefined) {
          $scope.$parent.addNote(text);
          this.setQuery("");
        }
      };
      self.setQuery = function setQuery(text) {
        this.query = text;
      };
      self.backBtn = function backBtn() {
        $scope.$parent.setView("hideForm");
      };
    }
  ]
});
