Meteor.subscribe('entries');

Template.timeline.helpers({
    entries: ()=> {
        return Entries.find({});
    }
});
