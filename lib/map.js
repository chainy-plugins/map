"use strict";
module.exports = function(items, iterator, opts, next){
	if ( opts == null )  opts = {}
	if ( opts.on == null )  opts.on = {}
	opts.on['task.done'] = function(task, err, result){
		// the taskgroup will handle errors automatically for us
		if ( !err )  items[task.config.key] = result
	}
	// use chainy-core here instead of this.create() to allow this plugin to execute standalone
	require('chainy-core').create().require('set each')
		.set(items)
		.each(iterator, opts)
		.done(next)
}
module.exports.extensionType = 'action'