"use strict";

// Declare app level module which depends on views, and core components
angular
  .module("snnotebook", ["noteForm", "header", "noteList"])
  .controller("appCtrl", function appCtrl($scope) {
    const STORAGE_KEY = "snn-notes";

    $scope.getDataFromLocalStorage = function getDataFromLocalStorage() {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data !== null) {
        return data.split(";").map(string => JSON.parse(string));
      }
    };

    $scope.sendDataToLocalStorage = function sendDataToLocalStorage(notesCopy) {
      let processedNotes = notesCopy
        .map(obj => {
          delete obj["$$hashKey"];
          return JSON.stringify(obj);
        })
        .join(";");
      localStorage.setItem(STORAGE_KEY, processedNotes);
    };

    $scope.notes = [];
    $scope.note = { edit: false, id: null, text: "" };

    const newNotes = $scope.getDataFromLocalStorage();
    if (newNotes !== undefined) $scope.notes = [...newNotes];

    $scope.addNote = function addNote(text) {
      let newNote = { note: text };
      if (this.note.edit) {
        this.notes[this.note.id] = newNote;
        this.note.edit = false;
        this.note.id = null;
      } else {
        this.notes.push(newNote);
      }
      this.sendDataToLocalStorage(this.notes);
    };
    $scope.editNote = function editNote(id) {
      this.note.text = this.notes[id].note;
      this.note.edit = true;
      this.note.id = id;
    };
    $scope.deleteNote = function deleteNote(id) {
      this.notes.splice(id, 1);
      this.sendDataToLocalStorage(this.notes);
    };
  });
