Entries = new Mongo.Collection('entries');

Entries.allow({
    insert: function(userId, doc) {
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    }
});

EntriesSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title"
    },
    description: {
        type: String,
        label: "Description",
        optional: true
    },
    labels: {
        type: [String],
        optional: true
    },
    gallery: {
        type: Object,
        optional: true
    },
    images: {
        type: [String],
        optional: true
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
    },
    dateTime: {
        type: Number,
        label: "DateTime",
        autoform: {
            type: "hidden"
        }
    },
    dateStr: {
        type: String,
        label: "DateStr",
        autoform: {
            type: "hidden"
        }
    }
});

Entries.attachSchema(EntriesSchema);
