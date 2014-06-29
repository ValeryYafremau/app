var TasksRouter = Backbone.Router.extend({
    routes: {
        "" : "redirect",
        "filter/:status": "filter",
        "note/:id" : "note",
        "new_task" : "addTask",
        "complite_selected" : "compliteSelected",
        "select_all" : "selectAll",
    },
   
    redirect : function() {
        console.log("redirect");  
        this.navigate("#filter/active", {trigger: true});
    },

    filter: function(status) {
        console.log("setting the filter"); 
        $('input[value=' + status + ']').prop("checked", true);
        tasksView.filterType = (status == undefined) ? "active" : status;
        tasksView.render();
        return this;
    },

    note : function(id) {
        console.log("compliting a task");  
        this.complite(id);
        this.navigate("#filter/active", {trigger: true});
        return this;
    },

    addTask : function() { 
        console.log("adding a new task");  
        this.val = $("#text").val();
        if(!/^\s*$/.test(this.val)) {
            tasks.push({
                id: idCounter++, 
                task: this.val
            });
        }
        $("#text").val('');
        this.filter();
        return this;
    },

    compliteSelected : function() {
        console.log("compliting selected tasks");  
        var that = this;
        $('input[type=checkbox]:checked').each(function () {
		that.complite(this.id);
        });
        this.navigate("#filter/" + tasksView.filterType, {trigger: true});
        this.isSelected = false;
        return this;
    },
    
    complite : function(id){
        _.each(tasks.models, function(task) {
            if(task.get('id') === +id) {
		    task.set("status", "complited");
            }
        });
        this.isSelected = false;
        return this;
    },

    selectAll : function() {
        console.log("selecting all chechboxes");
        this.isSelected = (this.isSelected !== undefined)? !this.isSelected : true;   
        that = this;     
        $('input[type=checkbox]').each(function () {
            this.checked = that.isSelected;
        });
        this.navigate("#filter/" + tasksView.filterType, {trigger: false});
    },

    setFilter: function () {        
        this.isSelected = false;   
        tasksRouter.navigate("#filter/" + $('input[name=status]:checked').val(), {trigger: true});
        return this;
    },

});