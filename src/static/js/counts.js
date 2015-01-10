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
	      };
	    },
		initialize: function() {
			this.count = 0;
			this.username = "abc";
		},
		incrementCount: function () {
			this.save({count: this.count + 1});
			console.log("incrementing count to " + this.count);
		}
	});

	var Counts = Backbone.Collection.extend({
		model: Count
	});

	var CountView = Backbone.View.extend({
		initialize: function(countModel) {
			this.model = countModel
			this.listenTo(this.model, "change", this.render);
			this.render();
		},
		template: _.template($("#count-template").html()),
		render: function() {
			console.log("Whooo yeah " + this.model.count);
			var toRender = _.extend({username: "abc"}, this.model.attributes);
			this.$el.html(this.template(toRender));
			return this;
		},
		// events: {
	 //      "click count-increment"   : "incrementCount",
	 //    },
	});
	// TODO start off with single count model.
	// Show the UI first.
	var newCount = new Count;
	//var newUser = new User(newCount);
	var countView = new CountView(newCount);
	newCount.incrementCount();
	$('#counts-start').append(countView.render().el)
})