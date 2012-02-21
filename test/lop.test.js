var lop = require("../");
var Parser = lop.Parser;
var rules = lop.rules;
var testing = lop.testing;

exports.canParseUsingParser = function(test) {
    var keywords = ["true", "false"];
    var symbols = ["(", ")", "!"];
    var options = {
        keywords: keywords,
        symbols: symbols
    };
    var parser = new Parser(options);
    var name = rules.sequence.capture(rules.identifier(), "name");
    var rule = rules.sequence(
        rules.symbol("!"),
        name
    );
    
    var result = parser.parseString(rule, "!blah");
    
    testing.assertIsSuccess(test, result);
    test.deepEqual(result.value().get(name), "blah");
    
    test.done();
};

exports.canIgnoreWhitespace = function(test) {
    var keywords = ["true", "false"];
    var symbols = ["(", ")", "!"];
    var options = {
        keywords: keywords,
        symbols: symbols,
        ignoreWhitespace: true
    };
    var parser = new Parser(options);
    var rule = rules.sequence(rules.symbol("!"), rules.symbol("!"));
    var result = parser.parseString(rule, " ! ! ");
    
    testing.assertIsSuccess(test, result);
    test.done();
};
