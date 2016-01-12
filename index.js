var jsdom = require('jsdom');
var canvas = require('canvas');
var document = jsdom.jsdom("<html><body></body></html>");

global.document = document;
global.Image = canvas.Image;
global.window = document.parentWindow;
global.window.process = process;
global.PIXI = require('pixi.js/bin/pixi.dev.js');
global.p2 = require('p2');
global.navigator = {userAgent: 'node.js'};
global.window.Element = undefined;
global.window.CanvasRenderingContext2D = 'game';

global.XMLHttpRequest = require('local-xmlhttprequest').XMLHttpRequest;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The CanvasPool is a global static object that allows Pixi and Phaser to pool canvas DOM elements.
*
* @class CanvasPool
* @static
*/
global.PIXI.CanvasPool= {

    /**
    * Creates a new Canvas DOM element, or pulls one from the pool if free.
    * 
    * @method create
    * @static
    * @param parent {any} The parent of the canvas element.
    * @param width {number} The width of the canvas element.
    * @param height {number} The height of the canvas element.
    * @return {HTMLCanvasElement} The canvas element.
    */
    create: function (parent, width, height) {

        var idx = global.PIXI.CanvasPool.getFirst();
        var canvas;

        if (idx === -1)
        {
            var container = {
                parent: parent,
                canvas: document.createElement('canvas')
            }

            global.PIXI.CanvasPool.pool.push(container);

            canvas = container.canvas;
        }
        else
        {
            global.PIXI.CanvasPool.pool[idx].parent = parent;

            canvas = global.PIXI.CanvasPool.pool[idx].canvas;
        }

        if (width !== undefined)
        {
            canvas.width = width;
            canvas.height = height;
        }

        return canvas;

    },

    /**
    * Gets the first free canvas index from the pool.
    * 
    * @method getFirst
    * @static
    * @return {number}
    */
    getFirst: function () {

        var pool = global.PIXI.CanvasPool.pool;

        for (var i = 0; i < pool.length; i++)
        {
            if (pool[i].parent === null)
            {
                return i;
            }
        }

        return -1;

    },

    /**
    * Removes the parent from a canvas element from the pool, freeing it up for re-use.
    * 
    * @method remove
    * @param parent {any} The parent of the canvas element.
    * @static
    */
    remove: function (parent) {

        var pool = global.PIXI.CanvasPool.pool;

        for (var i = 0; i < pool.length; i++)
        {
            if (pool[i].parent === parent)
            {
                pool[i].parent = null;
            }
        }

    },

    /**
    * Removes the parent from a canvas element from the pool, freeing it up for re-use.
    * 
    * @method removeByCanvas
    * @param canvas {HTMLCanvasElement} The canvas element to remove
    * @static
    */
    removeByCanvas: function (canvas) {

        var pool = global.PIXI.CanvasPool.pool;

        for (var i = 0; i < pool.length; i++)
        {
            if (pool[i].canvas === canvas)
            {
                pool[i].parent = null;
            }
        }

    },

    /**
    * Gets the total number of used canvas elements in the pool.
    * 
    * @method getTotal
    * @static
    * @return {number} The number of in-use (parented) canvas elements in the pool.
    */
    getTotal: function () {

        var pool = global.PIXI.CanvasPool.pool;
        var c = 0;

        for (var i = 0; i < pool.length; i++)
        {
            if (pool[i].parent !== null)
            {
                c++;
            }
        }

        return c;

    },

    /**
    * Gets the total number of free canvas elements in the pool.
    * 
    * @method getFree
    * @static
    * @return {number} The number of free (un-parented) canvas elements in the pool.
    */
    getFree: function () {

        var pool = global.PIXI.CanvasPool.pool;
        var c = 0;

        for (var i = 0; i < pool.length; i++)
        {
            if (pool[i].parent === null)
            {
                c++;
            }
        }

        return c;

    }

};

/**
 * The pool into which the canvas dom elements are placed.
 *
 * @property pool
 * @type Array
 * @static
 */
global.PIXI.CanvasPool.pool = [];

var Phaser = require('phaser/dist/phaser');
global.Phaser = Phaser;

module.exports = Phaser;
