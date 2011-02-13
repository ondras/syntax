(function(){
	var patterns = [];
	
	patterns.push({
		token: "string",
		re: /(".*?")/g,
		index: 1
	});
	
	patterns.push({
		token: "number",
		re: /([^0-9#a-zA-Z])([0-9]+)/g,
		index: 2
	});

	patterns.push({
		token: "comment",
		re: /(\/\*[\s\S]*?\*\/)/g,
		index: 1
	});

	patterns.push({
		token: "comment",
		re: /([^:])(\/\/.*)/g,
		index: 2
	});

	var keywords = ["break", "case", "catch", "continue", "default", "delete", "do", "else",
		"finally", "for", "function", "if", "in", "instanceof", "new", "return",
		"switch", "this", "throw", "try", "typeof", "var", "void", "while", "with", "__proto__",
		"true", "false", "null", "NaN", "prototype", "call", "apply", "constructor"];

	for (var i=0;i<keywords.length;i++) {
		var kw = new RegExp("(^|\\s|\\.|\\()("+keywords[i]+")(?=\\s|\\.|\\(|\\)|\\[|\\]|;|$|,)","g");
		patterns.push({
			token: "keyword",
			re: kw,
			index: 2
		});
	}

	Syntax.register("js", patterns);
})();
