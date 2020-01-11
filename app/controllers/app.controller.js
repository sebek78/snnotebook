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
    $scope.note = { id: null, text: "", blueIcon: false };

    $scope.addNote = function addNote(text, date, blueIcon) {
      manageNote.addNote(text, date, blueIcon, $scope);
      localStore.save($scope.notes);
    };
    $scope.editNote = function editNote(id) {
      $scope.note.text = this.notes[id].text;
      $scope.note.id = id;
      $scope.note.blueIcon = this.notes[id].blueIcon;
      $window.location.href = "/#!note-form";
    };
    $scope.deleteNote = function deleteNote(id) {
      manageNote.deleteNote(id, $scope);
      localStore.save(this.notes);
    };

    $scope.showConfirm = function(ev, id) {
      // Appending dialog to document.body to cover sidenav in docs app
      const confirm = $mdDialog
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
          $scope.deleteNote(id);
          $window.location.href = "/#!/";
        },
        function() {
          // The cancel button was clicked.
        }
      );
    };
  });
