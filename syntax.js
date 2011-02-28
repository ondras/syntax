var Syntax = {
	_registry: {},
	tags: ["pre", "code"],
	tab: "    ",
	
	all: function() { /* apply to all elements */
		var all = document.getElementsByTagName("*");
		var todo = [];
		for (var i=0;i<all.length;i++) {
			var node = all[i];
			if (this.tags.indexOf(node.nodeName.toLowerCase()) != -1) { todo.push(node); }
		}
		
		while (todo.length) { this.apply(todo.shift()); }
	},
	
	register: function(name, patterns) {
		this._registry[name] = patterns;
	},
	
	apply: function(node) {
		/* scan class for names */
		var cns = node.className.split(" ");
		var todo = [];
		while (cns.length) {
			var cn = cns.shift();
			var r = cn.match(/syntax-(.+)/);
			if (!r) { continue; }
			var name = r[1];
			if (!(name in this._registry)) {
				if (window.console) { console.warn("No patterns for "+name); }
				continue;
			} 
			if (todo.indexOf(name) == -1) { todo.push(name); }
		}
		if (!todo.length) { return; }

		var code = node.innerHTML;
		while (todo.length) {
			var patterns = this._registry[todo.shift()];
			for (var i=0;i<patterns.length;i++) {
				var pattern = patterns[i];
				var index = pattern.index;
				var replacement = "";
				if (index > 1) { 
					for (var j=1;j<index;j++) { replacement += "$"+j; }
				}
				replacement += "<span class='"+pattern.token+"'>$"+index+"</span>";
				
				code = code.replace(pattern.re, replacement);
			}
		}
		
		code = code.replace(/\t/g, this.tab);

		if (node.outerHTML) {
			var name = node.nodeName;
			var id = node.id;
			var cn = node.className;
			node.outerHTML = "<" + name + " id='"+id+"' class='"+cn+"'>" + code + "</"+name+">";
		} else {
			node.innerHTML = code;
		}

	}
}
