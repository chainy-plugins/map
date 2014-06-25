"use strict";
module.exports = function(items, iterator, opts, next){
	if ( opts == null )  opts = {}
	if ( opts.on == null )  opts.on = {}
	opts.on['task.done'] = function(task, err, result){
		// the taskgroup will handle errors automatically for us
		if ( !err )  items[task.config.key] = result
	}
	// create a new chain (give it a parent if we are executing within a chain)
	require('chainy-core').create({parent:this}).require('set each')
		.set(items)
		.each(iterator, opts)
		.done(next)
}
module.exports.extensionType = 'action'