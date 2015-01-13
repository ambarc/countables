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
	        	count: 0
	    	}
	    },
		initialize: function(localStorage) {
			this.save({count: 0})
			this.username = "abc";
			this.localStorage = localStorage;
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
			var toRender = _.extend({username: 'abc'}, this.model.attributes);
			this.$el.html(this.template(toRender));
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
			console.log("adding count.")
		}
	});
	// TODO make an appview that encapuslates the app.
	// TODO make the counts add-able.
	// Show the UI first.
	var appView = new AppView;
	var newCount = new Count({id: 1});
	//var allCounts = new Counts;
	// newCount.fetch();
	//var allCounts = new Counts;
	//allCounts.fetch();
	// if (allCounts.length == 0) {
	// 	allCounts.push(newCount);
	// }


	//var newUser = new User(newCount);
	var countView = new CountView(newCount);
	$('#counts-start').append(countView.render().el)
})