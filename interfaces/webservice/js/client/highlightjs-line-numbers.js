(function (w) {
	'use strict';

	if (typeof w.hljs === 'undefined') {
		console.error('highlight.js not detected!');
	} else {
		w.hljs.initLineNumbersOnLoad = initLineNumbersOnLoad;
		w.hljs.lineNumbersBlock = lineNumbersBlock;
	}

	function initLineNumbersOnLoad () {
		w.addEventListener('load', function () {
			try {
				var blocks = document.querySelectorAll('code.hljs');

				for (var i in blocks) {
					if (blocks.hasOwnProperty(i)) {
						lineNumbersBlock(blocks[i]);
					}
				}
			} catch (e) {
				console.error('LineNumbers error: ', e);
			}
		});
	}

	function lineNumbersBlock (element, start, stop) {
		if (typeof element !== 'object') return;

		var parent = element.parentNode;
		var lines = getCountLines(parent.textContent);

		if (lines > 1) {
			var l = '';
			for (var i = 0; i < lines; i++) {
				if(i >= (start - 1) && i <= (stop - 1)) {
					l += '<span class="ac-highlight-line">' + (i + 1) + '</span>\n';
				} else {
					l += '<span class="ac-no-highlight-line">' + (i + 1) + '</span>\n';
					//l += (i + 1) + '\n';
				}

			}

			var linesPanel = document.createElement('code');
			linesPanel.className = 'hljs hljs-line-numbers';
			linesPanel.style.float = 'left';
      //linesPanel.textContent = l;
			linesPanel.innerHTML = l;

			parent.insertBefore(linesPanel, element);
		}
	}

	function getCountLines(text) {
		if (text.length === 0) return 0;

		var regExp = /\r\n|\r|\n/g;
		var lines = text.match(regExp);
		lines = lines ? lines.length : 0;

		if (!text[text.length - 1].match(regExp)) {
			lines += 1;
		}

		return lines;
	}
}(window));