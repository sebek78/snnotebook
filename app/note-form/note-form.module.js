"use strict";

angular.module("noteForm", []).component("noteForm", {
  templateUrl: "note-form.template.html",
  controller: [
    "$scope",
    "$window",
    function noteFormController($scope, $window) {
      const self = this;
      self.query = $scope.$parent.note.text;

      self.addNote = function addNote(text) {
        if (text !== undefined) {
          $scope.$parent.addNote(text);
          this.setQuery("");
          $window.location.href = "#!/";
        }
      };
      self.setQuery = function setQuery(text) {
        this.query = text;
      };
      self.backBtn = function backBtn() {
        $scope.$parent.note.text = "";
        $window.location.href = "#!/";
      };
    }
  ]
});
