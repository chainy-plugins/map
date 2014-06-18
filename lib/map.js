"use strict";
module.exports = function(items, iterator, opts, next){
	var taskgroup = require('taskgroup'), TaskGroup = taskgroup.TaskGroup, Task = taskgroup.Task
	var chain = this

	// Default opts to an object if it doesn't exist
	if ( opts == null )  opts = {}

	// Default the name of the map
	if ( !opts.name )  opts.name = 'map iterator group'

	// Define our tasks for the map
	var tasks = TaskGroup.create(opts).done(function(err){
		return next(err) // don't do a direct forward, as we want to discard the result argument
	})

	// Create a task for each map item, and add them to the task group
	Object.keys(items).forEach(function(key){
		var item = items[key]
		var args = [item]
		if ( iterator.length === 3 ) {
			args.push(key)
		}
		var task = Task.create({
			name: "map iterator for: "+key,
			method: iterator.bind(chain),
			args: args,
			next: function(err, result){
				// the taskgroup will handle errors automatically for us
				if ( !err ) {
					items[key] = result
				}
			}
		})
		tasks.addTask(task)
	})

	// Run the task group
	tasks.run()
}
module.exports.extensionType = 'action'