module.exports = function map (items, iterator, opts, next) {
	if ( opts == null )  opts = {}
	if ( opts.on == null )  opts.on = {}
	// @TODO should this be item.add instead?
	opts.on['task.add'] = function (task) {
		task.done(function (err, result) {
			// the taskgroup will handle errors automatically for us, so we can ignore them
			if ( !err ) {
				// if there was no error
				// then update the items key with the real data
				// task.config.key is specified via
				// https://github.com/chainyjs/each/blob/d67d0966c2a78758d1273567d677fd8658472b3c/source/index.js#L36
				// @TODO should do this diferently somehow?
				items[task.config.key] = result
			}
		})
	}

	// create a new chain (give it a parent if we are executing within a chain)
	require('chainy-core').create({parent: this}).require('set each')
		.set(items)
		// @TODO perhaps opts should be general opts, or taskgroupOpts, and taskOpts
		.each(iterator, opts)
		.done(next)
}
module.exports.extensionType = 'action'
