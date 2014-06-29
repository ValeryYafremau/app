var TasksView = Backbone.View.extend({

    el : $("#list"),

    filterType : "active",

    activeTemplate: _.template("<div class ='task'><a href = '#note/<%= id %>' class='x'>X</a><input type = 'checkbox' name = 'select' id = '<%= id %>'> <%= task %></div"),

    complitedTemplate: _.template("<div class ='task'><%= task %></div"),
    
    initialize : function() {
        this.filteredTasks = new TasksList(tasks.models); 
    },

    render: function () {
        console.log("rendering");
        this.filterByType();
        var that = this;
        this.$el.empty();
        _.each(this.filteredTasks.models, function(task) {
            that.renderTask(task);
        });  
        return this;
    },

    renderTask: function (task) { 
        var template = (this.filterType === "active") ? this.activeTemplate : this.complitedTemplate;
        this.$el.prepend(template(task.toJSON()));
        return this;
    },

    filterByType: function () {
        var that = this;
        this.filteredTasks.reset();
        _.each(tasks.models, function(task) {
           if (task.get('status') === that.filterType) {
                that.filteredTasks.push(task);
            }
        });
	  return this;
    }
});