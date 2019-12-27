"use strict";

let manageNote = $scope => {
  addNote = (text, $scope) => {
    let newNote = { note: text };

    //let notesCopy = [...scope.notes];
    // let noteCopy = { ...scope.note };
    if ($scope.note.edit) {
      notesCopy[scope.note.id] = newNote;
      noteCopy.edit = false;
      noteCopy.id = null;
      noteCopy.text = "";
    } else {
      //notesCopy.push(newNote);
      $scope.notes.push(newNote);
      //noteCopy = null;
    } /*
    return {
      updatedNotes: notesCopy,
      updatedNote: noteCopy
    };*/
  };
};

export default manageNote;
