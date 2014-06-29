var idCounter = 0;

var isSelected = false;

var Task = Backbone.Model.extend({
    defaults: {
        status: "active",
    }
});

var TasksList = Backbone.Collection.extend({
    model: Task
});

var tasks = new TasksList();

var tasksView = new TasksView();

var tasksRouter = new TasksRouter();

Backbone.history.start();

$(document).ready(function() {

    $('input:radio[name=status]').change(function(){
        tasksRouter.setFilter()
    })

    $('#text').keypress(function(e) {
        if(e.keyCode==13) {
            tasksRouter.addTask();
        }
    });

});
