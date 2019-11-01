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

    $scope.notes = [];
    const newNotes = $scope.getDataFromLocalStorage();
    if (newNotes !== undefined) $scope.notes = [...newNotes];

    $scope.addNote = function addNote(text) {
      let newNote = { note: text };
      let notesCopy = [...this.notes, newNote];
      let processedNotes = notesCopy
        .map(obj => {
          delete obj["$$hashKey"];
          return JSON.stringify(obj);
        })
        .join(";");
      localStorage.setItem(STORAGE_KEY, processedNotes);
      this.notes.push(newNote);
    };
  });
