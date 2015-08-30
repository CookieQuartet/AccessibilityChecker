// Generated from XMLParser.g4 by ANTLR 4.5
// jshint ignore: start

var BaseListener = require('../../../core/BaseListener');

// This class defines a complete listener for a parse tree produced by JavaParser.
function XMLParserListener(rules) {
	BaseListener.call(this, rules);
	return this;
}

XMLParserListener.prototype = Object.create(BaseListener.prototype);

XMLParserListener.prototype.constructor = XMLParserListener;

// Enter a parse tree produced by XMLParser#document.
XMLParserListener.prototype.enterDocument = function(ctx) {
};

// Exit a parse tree produced by XMLParser#document.
XMLParserListener.prototype.exitDocument = function(ctx) {
};


// Enter a parse tree produced by XMLParser#prolog.
XMLParserListener.prototype.enterProlog = function(ctx) {
};

// Exit a parse tree produced by XMLParser#prolog.
XMLParserListener.prototype.exitProlog = function(ctx) {
};


// Enter a parse tree produced by XMLParser#content.
XMLParserListener.prototype.enterContent = function(ctx) {
};

// Exit a parse tree produced by XMLParser#content.
XMLParserListener.prototype.exitContent = function(ctx) {
};


// Enter a parse tree produced by XMLParser#element.
XMLParserListener.prototype.enterElement = function(ctx) {
  this.processNode(ctx, 'android.xml.tag');
};

// Exit a parse tree produced by XMLParser#element.
XMLParserListener.prototype.exitElement = function(ctx) {
};


// Enter a parse tree produced by XMLParser#reference.
XMLParserListener.prototype.enterReference = function(ctx) {
};

// Exit a parse tree produced by XMLParser#reference.
XMLParserListener.prototype.exitReference = function(ctx) {
};


// Enter a parse tree produced by XMLParser#attribute.
XMLParserListener.prototype.enterAttribute = function(ctx) {
};

// Exit a parse tree produced by XMLParser#attribute.
XMLParserListener.prototype.exitAttribute = function(ctx) {
};


// Enter a parse tree produced by XMLParser#chardata.
XMLParserListener.prototype.enterChardata = function(ctx) {
};

// Exit a parse tree produced by XMLParser#chardata.
XMLParserListener.prototype.exitChardata = function(ctx) {
};


// Enter a parse tree produced by XMLParser#misc.
XMLParserListener.prototype.enterMisc = function(ctx) {
};

// Exit a parse tree produced by XMLParser#misc.
XMLParserListener.prototype.exitMisc = function(ctx) {
};



exports.XMLParserListener = XMLParserListener;