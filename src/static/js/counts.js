$(function(){
	/*
	var User = Backbone.Model.extend({
		initialize: function(count) {
			this.count = count;
		},
	});*/

	var Count = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("counts-hack"),
		defaults: function() {
			return {
	        	count: 0,
	        	title: "abc"
	    	}
	    },
		initialize: function(options) {
			console.log(options);
			this.save({count: 0, title: options.title});
		},
		incrementCount: function () {
			console.log("Current count is " + this.get('count'));
			this.save({count: this.get('count') + 1});
			console.log("Incrementing count to " + this.get('count'));
		},
		decrementCount: function () {
			this.save({count: this.get('count') - 1});
			console.log("Decrementing count to " + this.get('count'));
		},
	});

	var Counts = Backbone.Collection.extend({
		model: Count,
		//localStorage: new Backbone.LocalStorage("counts-hack")
	});

	var CountView = Backbone.View.extend({
		initialize: function(countModel) {
			this.model = countModel
			this.listenTo(this.model, "change", this.render);
		},
		template: _.template($("#count-template").html()),
		events: {
			"click .count-increment button": "incrementCount",
			"click .count-decrement button": "decrementCount"
		},
		render: function() {
			console.log('Rendering ' + this.model.get('count'));
			console.log(this.model.attributes)
			var toRender = _.extend({title: 'abc2'}, this.model.attributes);
			this.$el.html(this.template(this.model.attributes));
			return this;
		},
		incrementCount: function () {
			this.model.incrementCount();
		},
		decrementCount: function () {
			this.model.decrementCount();
		}
	});

	var AppView = Backbone.View.extend({
		el: $("#app-container"),
		initialize: function() {
			this.allCounts = new Counts;
		},
		events: {
			"click #add-count button": "addCount"
		},
		addCount: function() {

			var newCount = new Count({title: $("#count-title").val()});
			var countView = new CountView(newCount);
			// Put this shit in an li. 
			$('#counts-list').append($('<li>').append(countView.render().el))
			console.log("adding count.")
		}
	});
	// TODO make an appview that encapuslates the app.
	// TODO make the counts add-able.
	// Show the UI first.
	var appView = new AppView;
})