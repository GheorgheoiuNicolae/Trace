Labels = new Mongo.Collection('labels');


Labels.allow({
    insert: function(userId, doc) {
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    },
    remove: function(userId, doc) {
        return !!userId;
    }
});

LabelsSchema = new SimpleSchema({
    name: {
        type: String
    },
    color: {
        type: String
    },
    author: {
        type: String,
        label: "Author",
        autoValue: function(){
            return this.userId
        },
        autoform: {
            type: "hidden"
        }
    }
});

Labels.attachSchema(LabelsSchema);
