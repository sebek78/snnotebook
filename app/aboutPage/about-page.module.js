'use strict';

import angular from 'angular';
import aboutPageTemplate from "./about-page.template.html";
import "./about-page.scss";

export default angular.module("aboutPage", []).component("aboutPage", {
    template: aboutPageTemplate
});