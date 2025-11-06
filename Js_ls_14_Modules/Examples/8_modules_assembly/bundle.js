(function () {
	'use strict';

	const { add, sub } = require('./calc.js');

	const resAdd = add(8, 3);
	const resSub = sub(8, 3);

	console.log(resAdd);
	console.log(resSub);

})();
