angular.module("noteForm").component("noteForm", {
  templateUrl: "note-form/note-form.template.html",
  controller: [
    "$scope",
    function noteFormController($scope) {
      const self = this;
      self.addNote = function addNote(text) {
        if (text !== undefined) {
          $scope.$parent.addNote(text);
        } else {
          console.log("The filed is empty.");
        }
      };
    }
  ]
});
