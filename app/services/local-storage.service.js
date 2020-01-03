"use strict";

angular.module("snnotebook").service("localStore", function() {
  const STORAGE_KEY = "snn-notes";

  this.getAllNotes = function getDataFromLocalStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data !== null) {
      return data.split(";").map(string => JSON.parse(string));
    }
  };

  this.save = function sendDataToLocalStorage(notesCopy) {
    if (notesCopy.length === 0) {
      localStorage.clear();
    } else {
      let processedNotes = notesCopy
        .map(obj => {
          delete obj.$$hashKey;
          return JSON.stringify(obj);
        })
        .join(";");
      localStorage.setItem(STORAGE_KEY, processedNotes);
    }
  };
});
