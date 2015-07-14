var jsdom = require('jsdom');
var canvas = require('canvas');
var document = jsdom.jsdom("<html><body></body></html>");

global.document = document;
global.Image = canvas.Image;
global.window = document.parentWindow;
global.window.process = process;
global.PIXI = require('pixi.js/bin/pixi.js');
global.p2 = require('p2');
global.navigator = {userAgent: 'node.js'};
global.window.Element = undefined;
global.window.CanvasRenderingContext2D = 'game';

global.XMLHttpRequest = require('local-xmlhttprequest').XMLHttpRequest;

var Phaser = require('phaser/build/phaser');
global.Phaser = Phaser;

module.exports = Phaser;
