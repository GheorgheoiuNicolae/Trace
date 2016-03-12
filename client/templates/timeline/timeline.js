Meteor.subscribe('entries');
Meteor.subscribe('getDayCategorisedEntries');

var currentDate = Session.get('currentDate');
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

    sortedEntries: ()=> {
        var result = SortedEntries.find();
        console.log('hh',result.fetch());
        return result;
    },
    isToday: ()=> {
        var currentDate = Session.get('currentDate');
        var formattedDate = moment(currentDate).format('MM/DD/YYYY');
        console.log('---------formattedDate', formattedDate);
        return formattedDate;
    }
});
