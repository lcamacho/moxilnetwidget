/*
 * Autor: Leonard Camacho
 * Licencia: GPL 3.0
 *
 */
const data = require("self").data;
const tabs = require("tabs");

var moxilnetPanel = require("panel").Panel({
  contentURL: data.url('moxilnet.html'),
  width: 210,
  contentScriptWhen: "ready",
  contentScriptFile: [data.url('js/jquery-1.5.1.min.js'),data.url('js/jquery.selectoul.js'),
                      data.url('js/moxilnet.js')],
  onMessage: function(message) {
    tabs.open(message);
    this.hide();
  }
});

var widget = require("widget").Widget({
  label: "Moxilnet",
  content: "Moxilnet",
  width: 70,
  panel: moxilnetPanel 
});