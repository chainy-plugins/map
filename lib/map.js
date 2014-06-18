"use strict";
module.exports = function(iterator, opts, next){
	var taskgroup = require('taskgroup'), TaskGroup = taskgroup.TaskGroup, Task = taskgroup.Task;
	var chain = this;

	if ( !opts ) {
		opts = {}
	}
	if ( !opts.name ) {
		opts.name = 'map iterator group'
	}
	if ( opts.concurrency == null ) {
		opts.concurrency = 0
	}

	var tasks = TaskGroup.create(opts).once('complete', function(err, result){
		return next(err)
	})

	Object.keys(chain.data).forEach(function(key){
		var value = chain.data[key]
		var task = Task.create({
			name: "map iterator for: "+key,
			method: iterator,
			context: chain,
			args: [value],
			next: function(err, result){
				// the taskgroup will handle errors automatically for us
				if ( !err ) {
					chain.data[key] = result
				}
			}
		})
		tasks.addTask(task)
	})

	tasks.run()
}