Meteor.subscribe('entries');

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
    entries: ()=> {
        var entries = Entries.find({});
        var fetchedEntries = entries.fetch();

        var dates = [];

        for(i = 0; i < fetchedEntries.length; i++){
            var entryDate = fetchedEntries[i].date;
            dates.push(entryDate);
        }
        console.log(dates);
        return entries;
    }
});
