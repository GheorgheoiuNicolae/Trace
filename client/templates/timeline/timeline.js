Meteor.subscribe('entries');
Meteor.subscribe('getDayCategorisedEntries');

Template.timeline.events({
    'submit .quickAdd': function(event, template){
        var entryTitle = event.target.entryTitle.value;
        Entries.insert({
            title: entryTitle,
            labels: [],
            images: []
        });

        event.target.entryTitle.value = "";
        return false
    }
});

Template.timeline.helpers({
    // not used anymore as now I return the aggregation result
    // entries: ()=> {
    //     var entries = Entries.find({});
    //     var fetchedEntries = entries.fetch();
    //
    //     var dates = [];
    //
    //     for(i = 0; i < fetchedEntries.length; i++){
    //         var entryDate = fetchedEntries[i].date;
    //         var date = moment(entryDate).format('MM:DD:YYYY');
    //         dates.push(date);
    //     }
    //     console.log(dates);
    //     return entries;
    // },
    sortedEntries: ()=> {
        var result = SortedEntries.find();
        console.log(result.fetch());
        return result;
    }
});
