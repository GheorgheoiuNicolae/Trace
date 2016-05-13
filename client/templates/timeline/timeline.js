Meteor.subscribe('entries');
// Meteor.subscribe('getDayCategorisedEntries');

Template.timeline.events({
    'submit .quickAdd': function(event, template){
        var today = new Date();
        var entryTitle = event.target.entryTitle.value;

        Entries.insert({
            title: entryTitle,
            labels: [],
            images: [],
            dateYearMonthDay: new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0, 0).getTime(),
            dateTime: new Date().getTime()
        });

        var a = new Date(today.getFullYear(), today.getMonth(), today.getDay(), 0, 0, 0, 0).getTime();
        console.log('a', a);

        event.target.entryTitle.value = "";
        return false
    }
});

Template.timeline.helpers({
    sortedEntries: ()=> {
        var fetchedEntries = Entries.find({}).fetch();

        // for(i = 0; i < fetchedEntries.length; i++) {
        //     var entriesInDay = fetchedEntries[i].entries;
        //     // filters the entries inside a day
        //     if(entriesInDay.length > 1) {
        //         for(index = 0; index < entriesInDay.length; index++) {
        //             fetchedEntries[i].entries = _.sortBy(entriesInDay, 'dateTime');
        //         }
        //     }
        // }
        // var filteredEntries = _.sortBy(fetchedEntries, 'date');

        return fetchedEntries;
    }
    // isToday: ()=> {
    //     var formattedDate = Session.get('formattedDate');
    //     return formattedDate;
    // }
});
