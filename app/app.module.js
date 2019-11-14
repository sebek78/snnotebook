"use strict";

import './app.css';
import "./snn-icon.png";
import angular from 'angular';
import ngRoute from 'angular-route';
import noteForm from './note-form/note-form.module';
import header from "./header/header.module";
import noteList from "./note-list/note-list.module";
import appTemplate from "./app.template.html";
import aboutPageTemplate from "./aboutPage/aboutPage.template.html";
import page404Template from "./404.template.html";

// Declare app level module which depends on views, and core components
angular
  .module("snnotebook", ["ngRoute", "noteForm", "header", "noteList"])
  .config([
    "$routeProvider",
    function config($routeProvider) {
      $routeProvider
        .when("/", {
          template: appTemplate, //"./app/app.template.html"
        })
        .when("/about", {
          template: aboutPageTemplate, //"./app/aboutPage/aboutPage.template.html"
        })
        .otherwise({
          template: page404Template, //"404.template.html"
        });
    }
  ])
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
    $scope.view = {
      list: true,
      form: false
    };

    $scope.setView = function setView(action) {
      if (action === "showForm") {
        this.view.list = false;
        this.view.form = true;
      } else if (action === "hideForm") {
        this.view.list = true;
        this.view.form = false;
      }
    };

    const newNotes = $scope.getDataFromLocalStorage();
    if (newNotes !== undefined) $scope.notes = [...newNotes];

    $scope.addNote = function addNote(text) {
      let newNote = { note: text };
      if (this.note.edit) {
        this.notes[this.note.id] = newNote;
        this.note.edit = false;
        this.note.id = null;
        this.note.text = "";
      } else {
        this.notes.push(newNote);
      }
      this.sendDataToLocalStorage(this.notes);
      this.setView("hideForm");
    };
    $scope.editNote = function editNote(id) {
      this.note.text = this.notes[id].note;
      this.note.edit = true;
      this.note.id = id;
      this.setView("showForm");
    };
    $scope.deleteNote = function deleteNote(id) {
      this.notes.splice(id, 1);
      if (this.notes.length === 0) {
        localStorage.clear();
      } else {
        this.sendDataToLocalStorage(this.notes);
      }
    };
  });
