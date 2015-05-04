var jsdom = require('jsdom');
var canvas = require('canvas');
var document = jsdom.jsdom(null);

global.document = document;
global.Image = canvas.Image;
global.window = document.parentWindow;
global.PIXI = require('pixi.js/bin/pixi.js');
global.p2 = require('p2');
global.navigator = {userAgent: 'node.js'};
global.window.Element = undefined;
global.window.CanvasRenderingContext2D = 'undefined';

global.XMLHttpRequest = require('local-xmlhttprequest').XMLHttpRequest;

module.exports = require('phaser/build/phaser');