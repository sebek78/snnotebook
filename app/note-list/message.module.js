'use strict';
import angular from 'angular';
import emptyListMessage from './message.template.html';

export default angular.module("emptyListMessage", []).component("emptyListMessage", {
    template: emptyListMessage
});