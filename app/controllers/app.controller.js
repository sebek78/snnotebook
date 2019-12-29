"use strict";

angular
  .module("snnotebook")
  .controller("appCtrl", function appCtrl(
    $scope,
    $window,
    manageNote,
    localStore
  ) {
    // $scope.notes = [];
    $scope.notes = localStore.getAllNotes() || [];
    $scope.note = { id: null, text: "" };
    $scope.showDeleteWarning = false;
    $scope.deleteID = null;

    // const newNotes = localStore.getAllNotes();
    // if (newNotes !== undefined) $scope.notes = [...newNotes];

    $scope.addNote = function addNote(text) {
      manageNote.addNote(text, $scope);
      localStore.save($scope.notes);
    };
    $scope.editNote = function editNote(id) {
      $scope.note.text = this.notes[id].note;
      $scope.note.id = id;
      $window.location.href = "/#!note-form";
    };
    $scope.clickDeleteBtn = function clickDeleteBtn(id) {
      $scope.showDeleteWarning = true;
      $scope.deleteID = id;
    };
    $scope.cancelBtn = function cancelBtn() {
      $scope.showDeleteWarning = false;
      $scope.deleteID = null;
    };
    $scope.deleteNote = function deleteNote() {
      manageNote.deleteNote($scope.deleteID, $scope);
      $scope.showDeleteWarning = false;
      $scope.deleteID = null;
      localStore.save(this.notes);
    };
  });
