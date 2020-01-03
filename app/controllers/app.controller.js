"use strict";

angular
  .module("snnotebook")
  .controller("appCtrl", function appCtrl(
    $scope,
    $window,
    manageNote,
    localStore,
    $mdDialog
  ) {
    $scope.notes = localStore.getAllNotes() || [];
    $scope.note = { id: null, text: "" };
    $scope.deleteID = null;

    $scope.addNote = function addNote(text) {
      manageNote.addNote(text, $scope);
      localStore.save($scope.notes);
    };
    $scope.editNote = function editNote(id) {
      $scope.note.text = this.notes[id].text;
      $scope.note.id = id;
      $window.location.href = "/#!note-form";
    };
    $scope.deleteNote = function deleteNote() {
      manageNote.deleteNote($scope.deleteID, $scope);
      $scope.showDeleteWarning = false;
      $scope.deleteID = null;
      localStore.save(this.notes);
    };

    $scope.showConfirm = function(ev, id) {
      // Appending dialog to document.body to cover sidenav in docs app
      $scope.deleteID = id;
      var confirm = $mdDialog
        .confirm({
          onComplete: function() {
            angular
              .element(
                document.querySelector("button[ng-click='dialog.hide()']")
              )
              .addClass("md-raised md-warn");
            angular
              .element(
                document.querySelector("button[ng-click='dialog.abort()']")
              )
              .addClass("md-raised");
          }
        })
        .title("Would you like to delete this note?")
        .textContent("You cannot undo this operation.")
        .ariaLabel("Delete dialog")
        .targetEvent(ev)
        .ok("Delete")
        .cancel("Cancel");

      $mdDialog.show(confirm).then(
        function() {
          $scope.deleteNote();
        },
        function() {
          $scope.deleteID = null;
        }
      );
    };
  });
