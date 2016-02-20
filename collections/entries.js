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
// dateTimestamp
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
    dateTimestamp: {
        type: Date,
        label: "DateTimesTamp",
        autoValue: function(){
            return new Date()
        },
        autoform: {
            type: "hidden"
        }
    },
    date: {
        type: String,
        label: "Date",
        autoValue: function(){
            return moment().format('L');
        },
        autoform: {
            type: "hidden"
        }
    }
});

Entries.attachSchema(EntriesSchema);
