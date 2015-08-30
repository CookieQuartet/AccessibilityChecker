// Generated from XMLParser.g4 by ANTLR 4.5
// jshint ignore: start
var antlr4 = require('antlr4/index');
var XMLParserListener = require('./XMLParserListener').XMLParserListener;
var grammarFileName = "XMLParser.g4";

var serializedATN = ["\3\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\3\24b\4\2\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t",
    "\t\3\2\5\2\24\n\2\3\2\7\2\27\n\2\f\2\16\2\32\13\2\3\2\3\2\7\2\36\n\2",
    "\f\2\16\2!\13\2\3\3\3\3\7\3%\n\3\f\3\16\3(\13\3\3\3\3\3\3\4\5\4-\n\4",
    "\3\4\3\4\3\4\3\4\3\4\5\4\64\n\4\3\4\5\4\67\n\4\7\49\n\4\f\4\16\4<\13",
    "\4\3\5\3\5\3\5\7\5A\n\5\f\5\16\5D\13\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3",
    "\5\3\5\3\5\7\5P\n\5\f\5\16\5S\13\5\3\5\5\5V\n\5\3\6\3\6\3\7\3\7\3\7",
    "\3\7\3\b\3\b\3\t\3\t\3\t\2\2\n\2\4\6\b\n\f\16\20\2\5\3\2\6\7\4\2\b\b",
    "\13\13\5\2\3\3\b\b\24\24g\2\23\3\2\2\2\4\"\3\2\2\2\6,\3\2\2\2\bU\3\2",
    "\2\2\nW\3\2\2\2\fY\3\2\2\2\16]\3\2\2\2\20_\3\2\2\2\22\24\5\4\3\2\23",
    "\22\3\2\2\2\23\24\3\2\2\2\24\30\3\2\2\2\25\27\5\20\t\2\26\25\3\2\2\2",
    "\27\32\3\2\2\2\30\26\3\2\2\2\30\31\3\2\2\2\31\33\3\2\2\2\32\30\3\2\2",
    "\2\33\37\5\b\5\2\34\36\5\20\t\2\35\34\3\2\2\2\36!\3\2\2\2\37\35\3\2",
    "\2\2\37 \3\2\2\2 \3\3\2\2\2!\37\3\2\2\2\"&\7\n\2\2#%\5\f\7\2$#\3\2\2",
    "\2%(\3\2\2\2&$\3\2\2\2&\'\3\2\2\2\')\3\2\2\2(&\3\2\2\2)*\7\r\2\2*\5",
    "\3\2\2\2+-\5\16\b\2,+\3\2\2\2,-\3\2\2\2-:\3\2\2\2.\64\5\b\5\2/\64\5",
    "\n\6\2\60\64\7\4\2\2\61\64\7\24\2\2\62\64\7\3\2\2\63.\3\2\2\2\63/\3",
    "\2\2\2\63\60\3\2\2\2\63\61\3\2\2\2\63\62\3\2\2\2\64\66\3\2\2\2\65\67",
    "\5\16\b\2\66\65\3\2\2\2\66\67\3\2\2\2\679\3\2\2\28\63\3\2\2\29<\3\2",
    "\2\2:8\3\2\2\2:;\3\2\2\2;\7\3\2\2\2<:\3\2\2\2=>\7\t\2\2>B\7\22\2\2?",
    "A\5\f\7\2@?\3\2\2\2AD\3\2\2\2B@\3\2\2\2BC\3\2\2\2CE\3\2\2\2DB\3\2\2",
    "\2EF\7\f\2\2FG\5\6\4\2GH\7\t\2\2HI\7\17\2\2IJ\7\22\2\2JK\7\f\2\2KV\3",
    "\2\2\2LM\7\t\2\2MQ\7\22\2\2NP\5\f\7\2ON\3\2\2\2PS\3\2\2\2QO\3\2\2\2",
    "QR\3\2\2\2RT\3\2\2\2SQ\3\2\2\2TV\7\16\2\2U=\3\2\2\2UL\3\2\2\2V\t\3\2",
    "\2\2WX\t\2\2\2X\13\3\2\2\2YZ\7\22\2\2Z[\7\20\2\2[\\\7\21\2\2\\\r\3\2",
    "\2\2]^\t\3\2\2^\17\3\2\2\2_`\t\4\2\2`\21\3\2\2\2\r\23\30\37&,\63\66",
    ":BQU"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ 'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                     "'<'", 'null', 'null', "'>'", 'null', "'/>'", "'/'", 
                     "'='" ];

var symbolicNames = [ 'null', "COMMENT", "CDATA", "DTD", "EntityRef", "CharRef", 
                      "SEA_WS", "OPEN", "XMLDeclOpen", "TEXT", "CLOSE", 
                      "SPECIAL_CLOSE", "SLASH_CLOSE", "SLASH", "EQUALS", 
                      "STRING", "Name", "S", "PI" ];

var ruleNames =  [ "document", "prolog", "content", "element", "reference", 
                   "attribute", "chardata", "misc" ];

function XMLParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

XMLParser.prototype = Object.create(antlr4.Parser.prototype);
XMLParser.prototype.constructor = XMLParser;

Object.defineProperty(XMLParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

XMLParser.EOF = antlr4.Token.EOF;
XMLParser.COMMENT = 1;
XMLParser.CDATA = 2;
XMLParser.DTD = 3;
XMLParser.EntityRef = 4;
XMLParser.CharRef = 5;
XMLParser.SEA_WS = 6;
XMLParser.OPEN = 7;
XMLParser.XMLDeclOpen = 8;
XMLParser.TEXT = 9;
XMLParser.CLOSE = 10;
XMLParser.SPECIAL_CLOSE = 11;
XMLParser.SLASH_CLOSE = 12;
XMLParser.SLASH = 13;
XMLParser.EQUALS = 14;
XMLParser.STRING = 15;
XMLParser.Name = 16;
XMLParser.S = 17;
XMLParser.PI = 18;

XMLParser.RULE_document = 0;
XMLParser.RULE_prolog = 1;
XMLParser.RULE_content = 2;
XMLParser.RULE_element = 3;
XMLParser.RULE_reference = 4;
XMLParser.RULE_attribute = 5;
XMLParser.RULE_chardata = 6;
XMLParser.RULE_misc = 7;

function DocumentContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = XMLParser.RULE_document;
    return this;
}

DocumentContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DocumentContext.prototype.constructor = DocumentContext;

DocumentContext.prototype.element = function() {
    return this.getTypedRuleContext(ElementContext,0);
};

DocumentContext.prototype.prolog = function() {
    return this.getTypedRuleContext(PrologContext,0);
};

DocumentContext.prototype.misc = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(MiscContext);
    } else {
        return this.getTypedRuleContext(MiscContext,i);
    }
};

DocumentContext.prototype.enterRule = function(listener) {
    if(listener instanceof XMLParserListener ) {
        listener.enterDocument(this);
	}
};

DocumentContext.prototype.exitRule = function(listener) {
    if(listener instanceof XMLParserListener ) {
        listener.exitDocument(this);
	}
};




XMLParser.DocumentContext = DocumentContext;

XMLParser.prototype.document = function() {

    var localctx = new DocumentContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, XMLParser.RULE_document);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 17;
        _la = this._input.LA(1);
        if(_la===XMLParser.XMLDeclOpen) {
            this.state = 16;
            this.prolog();
        }

        this.state = 22;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << XMLParser.COMMENT) | (1 << XMLParser.SEA_WS) | (1 << XMLParser.PI))) !== 0)) {
            this.state = 19;
            this.misc();
            this.state = 24;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 25;
        this.element();
        this.state = 29;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << XMLParser.COMMENT) | (1 << XMLParser.SEA_WS) | (1 << XMLParser.PI))) !== 0)) {
            this.state = 26;
            this.misc();
            this.state = 31;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function PrologContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = XMLParser.RULE_prolog;
    return this;
}

PrologContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PrologContext.prototype.constructor = PrologContext;

PrologContext.prototype.XMLDeclOpen = function() {
    return this.getToken(XMLParser.XMLDeclOpen, 0);
};

PrologContext.prototype.SPECIAL_CLOSE = function() {
    return this.getToken(XMLParser.SPECIAL_CLOSE, 0);
};

PrologContext.prototype.attribute = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(AttributeContext);
    } else {
        return this.getTypedRuleContext(AttributeContext,i);
    }
};

PrologContext.prototype.enterRule = function(listener) {
    if(listener instanceof XMLParserListener ) {
        listener.enterProlog(this);
	}
};

PrologContext.prototype.exitRule = function(listener) {
    if(listener instanceof XMLParserListener ) {
        listener.exitProlog(this);
	}
};




XMLParser.PrologContext = PrologContext;

XMLParser.prototype.prolog = function() {

    var localctx = new PrologContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, XMLParser.RULE_prolog);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 32;
        this.match(XMLParser.XMLDeclOpen);
        this.state = 36;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===XMLParser.Name) {
            this.state = 33;
            this.attribute();
            this.state = 38;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 39;
        this.match(XMLParser.SPECIAL_CLOSE);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ContentContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = XMLParser.RULE_content;
    return this;
}

ContentContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ContentContext.prototype.constructor = ContentContext;

ContentContext.prototype.chardata = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ChardataContext);
    } else {
        return this.getTypedRuleContext(ChardataContext,i);
    }
};

ContentContext.prototype.element = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ElementContext);
    } else {
        return this.getTypedRuleContext(ElementContext,i);
    }
};

ContentContext.prototype.reference = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ReferenceContext);
    } else {
        return this.getTypedRuleContext(ReferenceContext,i);
    }
};

ContentContext.prototype.CDATA = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(XMLParser.CDATA);
    } else {
        return this.getToken(XMLParser.CDATA, i);
    }
};


ContentContext.prototype.PI = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(XMLParser.PI);
    } else {
        return this.getToken(XMLParser.PI, i);
    }
};


ContentContext.prototype.COMMENT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(XMLParser.COMMENT);
    } else {
        return this.getToken(XMLParser.COMMENT, i);
    }
};


ContentContext.prototype.enterRule = function(listener) {
    if(listener instanceof XMLParserListener ) {
        listener.enterContent(this);
	}
};

ContentContext.prototype.exitRule = function(listener) {
    if(listener instanceof XMLParserListener ) {
        listener.exitContent(this);
	}
};




XMLParser.ContentContext = ContentContext;

XMLParser.prototype.content = function() {

    var localctx = new ContentContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, XMLParser.RULE_content);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 42;
        _la = this._input.LA(1);
        if(_la===XMLParser.SEA_WS || _la===XMLParser.TEXT) {
            this.state = 41;
            this.chardata();
        }

        this.state = 56;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,7,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 49;
                switch(this._input.LA(1)) {
                case XMLParser.OPEN:
                    this.state = 44;
                    this.element();
                    break;
                case XMLParser.EntityRef:
                case XMLParser.CharRef:
                    this.state = 45;
                    this.reference();
                    break;
                case XMLParser.CDATA:
                    this.state = 46;
                    this.match(XMLParser.CDATA);
                    break;
                case XMLParser.PI:
                    this.state = 47;
                    this.match(XMLParser.PI);
                    break;
                case XMLParser.COMMENT:
                    this.state = 48;
                    this.match(XMLParser.COMMENT);
                    break;
                default:
                    throw new antlr4.error.NoViableAltException(this);
                }
                this.state = 52;
                _la = this._input.LA(1);
                if(_la===XMLParser.SEA_WS || _la===XMLParser.TEXT) {
                    this.state = 51;
                    this.chardata();
                }
         
            }
            this.state = 58;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,7,this._ctx);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ElementContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = XMLParser.RULE_element;
    return this;
}

ElementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ElementContext.prototype.constructor = ElementContext;

ElementContext.prototype.Name = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(XMLParser.Name);
    } else {
        return this.getToken(XMLParser.Name, i);
    }
};


ElementContext.prototype.content = function() {
    return this.getTypedRuleContext(ContentContext,0);
};

ElementContext.prototype.attribute = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(AttributeContext);
    } else {
        return this.getTypedRuleContext(AttributeContext,i);
    }
};

ElementContext.prototype.enterRule = function(listener) {
    if(listener instanceof XMLParserListener ) {
        listener.enterElement(this);
	}
};

ElementContext.prototype.exitRule = function(listener) {
    if(listener instanceof XMLParserListener ) {
        listener.exitElement(this);
	}
};




XMLParser.ElementContext = ElementContext;

XMLParser.prototype.element = function() {

    var localctx = new ElementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, XMLParser.RULE_element);
    var _la = 0; // Token type
    try {
        this.state = 83;
        var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 59;
            this.match(XMLParser.OPEN);
            this.state = 60;
            this.match(XMLParser.Name);
            this.state = 64;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===XMLParser.Name) {
                this.state = 61;
                this.attribute();
                this.state = 66;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 67;
            this.match(XMLParser.CLOSE);
            this.state = 68;
            this.content();
            this.state = 69;
            this.match(XMLParser.OPEN);
            this.state = 70;
            this.match(XMLParser.SLASH);
            this.state = 71;
            this.match(XMLParser.Name);
            this.state = 72;
            this.match(XMLParser.CLOSE);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 74;
            this.match(XMLParser.OPEN);
            this.state = 75;
            this.match(XMLParser.Name);
            this.state = 79;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===XMLParser.Name) {
                this.state = 76;
                this.attribute();
                this.state = 81;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 82;
            this.match(XMLParser.SLASH_CLOSE);
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ReferenceContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = XMLParser.RULE_reference;
    return this;
}

ReferenceContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ReferenceContext.prototype.constructor = ReferenceContext;

ReferenceContext.prototype.EntityRef = function() {
    return this.getToken(XMLParser.EntityRef, 0);
};

ReferenceContext.prototype.CharRef = function() {
    return this.getToken(XMLParser.CharRef, 0);
};

ReferenceContext.prototype.enterRule = function(listener) {
    if(listener instanceof XMLParserListener ) {
        listener.enterReference(this);
	}
};

ReferenceContext.prototype.exitRule = function(listener) {
    if(listener instanceof XMLParserListener ) {
        listener.exitReference(this);
	}
};




XMLParser.ReferenceContext = ReferenceContext;

XMLParser.prototype.reference = function() {

    var localctx = new ReferenceContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, XMLParser.RULE_reference);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 85;
        _la = this._input.LA(1);
        if(!(_la===XMLParser.EntityRef || _la===XMLParser.CharRef)) {
        this._errHandler.recoverInline(this);
        }
        else {
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function AttributeContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = XMLParser.RULE_attribute;
    return this;
}

AttributeContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AttributeContext.prototype.constructor = AttributeContext;

AttributeContext.prototype.Name = function() {
    return this.getToken(XMLParser.Name, 0);
};

AttributeContext.prototype.STRING = function() {
    return this.getToken(XMLParser.STRING, 0);
};

AttributeContext.prototype.enterRule = function(listener) {
    if(listener instanceof XMLParserListener ) {
        listener.enterAttribute(this);
	}
};

AttributeContext.prototype.exitRule = function(listener) {
    if(listener instanceof XMLParserListener ) {
        listener.exitAttribute(this);
	}
};




XMLParser.AttributeContext = AttributeContext;

XMLParser.prototype.attribute = function() {

    var localctx = new AttributeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, XMLParser.RULE_attribute);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 87;
        this.match(XMLParser.Name);
        this.state = 88;
        this.match(XMLParser.EQUALS);
        this.state = 89;
        this.match(XMLParser.STRING);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ChardataContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = XMLParser.RULE_chardata;
    return this;
}

ChardataContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ChardataContext.prototype.constructor = ChardataContext;

ChardataContext.prototype.TEXT = function() {
    return this.getToken(XMLParser.TEXT, 0);
};

ChardataContext.prototype.SEA_WS = function() {
    return this.getToken(XMLParser.SEA_WS, 0);
};

ChardataContext.prototype.enterRule = function(listener) {
    if(listener instanceof XMLParserListener ) {
        listener.enterChardata(this);
	}
};

ChardataContext.prototype.exitRule = function(listener) {
    if(listener instanceof XMLParserListener ) {
        listener.exitChardata(this);
	}
};




XMLParser.ChardataContext = ChardataContext;

XMLParser.prototype.chardata = function() {

    var localctx = new ChardataContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, XMLParser.RULE_chardata);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 91;
        _la = this._input.LA(1);
        if(!(_la===XMLParser.SEA_WS || _la===XMLParser.TEXT)) {
        this._errHandler.recoverInline(this);
        }
        else {
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function MiscContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = XMLParser.RULE_misc;
    return this;
}

MiscContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
MiscContext.prototype.constructor = MiscContext;

MiscContext.prototype.COMMENT = function() {
    return this.getToken(XMLParser.COMMENT, 0);
};

MiscContext.prototype.PI = function() {
    return this.getToken(XMLParser.PI, 0);
};

MiscContext.prototype.SEA_WS = function() {
    return this.getToken(XMLParser.SEA_WS, 0);
};

MiscContext.prototype.enterRule = function(listener) {
    if(listener instanceof XMLParserListener ) {
        listener.enterMisc(this);
	}
};

MiscContext.prototype.exitRule = function(listener) {
    if(listener instanceof XMLParserListener ) {
        listener.exitMisc(this);
	}
};




XMLParser.MiscContext = MiscContext;

XMLParser.prototype.misc = function() {

    var localctx = new MiscContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, XMLParser.RULE_misc);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 93;
        _la = this._input.LA(1);
        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << XMLParser.COMMENT) | (1 << XMLParser.SEA_WS) | (1 << XMLParser.PI))) !== 0))) {
        this._errHandler.recoverInline(this);
        }
        else {
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.XMLParser = XMLParser;
