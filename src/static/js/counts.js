$(function(){
	/*
	var User = Backbone.Model.extend({
		initialize: function(count) {
			this.count = count;
		},
	});*/

	var Count = Backbone.Model.extend({
		//localStorage: new Backbone.LocalStorage("counts-hack"),
		defaults: function() {
			return {
	        	count: 0,
	        	title: "abc"
	    	}
	    },
		initialize: function(options) {
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
		localStorage: new Backbone.LocalStorage("counts-hack")
	});

	var CountView = Backbone.View.extend({
		initialize: function(countModel) {
			this.model = countModel
			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "destroy", this.remove);
		},
		template: _.template($("#count-template").html()),
		events: {
			"click .count-increment button": "incrementCount",
			"click .count-decrement button": "decrementCount"
		},
		render: function() {
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
			this.listenTo(this.allCounts, 'add', this.addCount);
			this.listenTo(this.allCounts, 'all', this.render);
			this.listenTo(this.allCounts, 'reset', this.render);
			this.allCounts.fetch();
		},
		events: {
			"click #add-count button": "createCount",
			"click #clear-all button": "clearAll"
		},
		createCount: function() {
			this.allCounts.create({title: $("#count-title").val()});
		},
		clearAll: function() {
			while (model = this.allCounts.first()) {
			  console.log("clearing " + model);
			  model.destroy();
			}
			//this.allCounts.sync();
		},
		addCount: function(newCount) {
			//var newCount = this.allCounts.create({title: $("#count-title").val()});
			var countView = new CountView(newCount);
			$('#counts-list').append(countView.render().el)
		},
	});
	// TODO make an appview that encapuslates the app.
	// TODO make the counts add-able.
	// Show the UI first.
	var appView = new AppView;
})