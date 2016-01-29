Entries = new Mongo.Collection('entries');

Entries.allow({
    insert: function(userId, doc) {
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    }
});

// title
// description
// labels *
// gallery *
// author
// createdAt
// date


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
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function(){
            return new Date()
        },
        autoform: {
            type: "hidden"
        }
    },
    date: {
        type: Date,
        label: "Date",
        autoValue: function(){
            return new Date()
        },
        autoform: {
            type: "hidden"
        }
    }
});

Entries.attachSchema(EntriesSchema);
