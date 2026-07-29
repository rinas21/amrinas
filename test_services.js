const { JSDOM } = require("jsdom");
const dom = new JSDOM(`<!DOCTYPE html><div id="rows"></div><span id="statCount"></span>`);
global.document = dom.window.document;

// Append the services.js code here
const fs = require('fs');
let code = fs.readFileSync('files/services.js', 'utf8');
eval(code);

console.log("Number of services rendered:", document.querySelectorAll('details').length);
