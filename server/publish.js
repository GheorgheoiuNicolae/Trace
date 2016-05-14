Meteor.publish('entries', function(){
    var userEntries = Entries.find({author: this.userId}).fetch();
    console.log('entries length ', userEntries.length);
    if(userEntries.length === 0) {
        Entries.insert({
            "author": this.userId,
            "title": "Joined Everlist",
            "labels": [],
            "images": [],
            "dateYearMonthDay": 1471467600000,
            "dateTime": 1468800000000
        });
    }
    return Entries.find({author: this.userId});
});

Meteor.publish('labels', function(){
    return Labels.find({author: this.userId});
});

Meteor.publish('gallery', function(){
    return Gallery.find();
});

Meteor.publish("images", function(){ return Images.find(); });





























// BACKUP

// note: aggregates entries by date with complete entry details
//db.entries.aggregate( [{ $group: { _id: "$date", entries: { $push: "$$ROOT" },  number: { $sum: 1 } } },{ $match: { } }]);

// note: code from StackOverflow post - not working yet
/* Meteor.publish('getDayCategorisedEntries', function (opts) {

    var initializing = 1;

    function run(action) {

        // Define the aggregation pipeline ( aggregate(pipeline) )
        var pipeline = [
            {
                "$group": {
                    "_id": "$date",
                    "entries": { "$push": "$_id" }
                }
            },
            { $match: { } }
        ];
        Entries.aggregate(pipeline).forEach(function(e){
            this[action]('day-entries', e._id, e)
            this.ready()
        });
    };

    // Run the aggregation initially to add some data to your aggregation collection
    run('added');

    //Track any changes on the collection we are going to use for aggregation
    var handle = Entries.find({}).observeChanges({
        added(id) {
            // observeChanges only returns after the initial `added` callbacks
            // have run. Until then, we don't want to send a lot of
            // `self.changed()` messages - hence tracking the
            // `initializing` state.
            if (initializing && initializing--) run('changed');
        },
        removed(id) {
            run('changed');
        },
        changed(id) {
            run('changed');
        },
        error(err) {
            throw new Meteor.Error('Uh oh! something went wrong!', err.message)
        }
    });

    // Stop observing the cursor when client unsubs.
    // Stopping a subscription automatically takes
    // care of sending the client any removed messages.
    this.onStop(function () {
        handle.stop();
    });
}); */
