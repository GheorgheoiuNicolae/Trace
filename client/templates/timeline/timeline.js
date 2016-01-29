Meteor.subscribe('entries');

Template.timeline.events({
    'submit .quickAdd': function(event, template){
        var entryTitle = event.target.entryTitle.value;
        Entries.insert({
            title: entryTitle,
            labels: []
        });

        event.target.entryTitle.value = "";
        return false
    }
});

Template.timeline.helpers({
    entries: ()=> {
        return Entries.find({});
    }
});
