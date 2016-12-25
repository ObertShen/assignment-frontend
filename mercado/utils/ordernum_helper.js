'use strict'

exports.get = function() {
	let serverNo = process.env.ENGINE_NO || '1230';
	return  serverNo + new Date().getTime().toString()
}