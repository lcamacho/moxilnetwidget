const data = require("self").data;

var moxilnetPanel = require("panel").Panel({
  contentURL: data.url('inicio.html'),
  width: 220,
  contentScriptWhen: "ready",
  contentScriptFile: [data.url('js/jquery-1.5.1.min.js'),data.url('js/jquery.selectoul.js'),
                      data.url('js/mensaje.js')],
  onMessage: function(message) {
    console.log(message);
  }
});

var widget = require("widget").Widget({
  label: "Moxilnet extension",
  content: "Moxilnet",
  width: 70,
  panel: moxilnetPanel 
});

console.log("The add-on is running.");