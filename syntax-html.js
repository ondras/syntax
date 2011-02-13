(function(){
	var patterns = [];
	
	patterns.push({
		token: "comment",
		re: /(&lt;!--.*?--&gt;)/g,
		index: 1
	});

	patterns.push({
		token: "keyword",
		re: /(&lt;[a-z\/].*?&gt;)/ig,
		index: 1
	});

	patterns.push({
		token: "string",
		re: /(=)(".*?")/g,
		index: 2
	});

	Syntax.register("html", patterns);
})();
