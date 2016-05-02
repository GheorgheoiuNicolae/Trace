Meteor.subscribe('entries');
Meteor.subscribe('getDayCategorisedEntries');



var today = moment().format('YYYY-MM-DD');
Session.set('currentDate', today);
//var currentDate = Session.get('currentDate');
console.log('!!!today', today);

Template.timeline.events({
    'submit .quickAdd': function(event, template){
        var entryTitle = event.target.entryTitle.value;
        var today = Session.get('currentDate');
        console.log('today', today);

        Entries.insert({
            title: entryTitle,
            labels: [],
            images: [],
            dateStr: today,
            dateTime: new Date().getTime()
        });

        event.target.entryTitle.value = "";
        return false
    }
});

Template.timeline.helpers({
    sortedEntries: ()=> {
        var result = SortedEntries.find({});
        console.log('Sorted entries',result.fetch());
        return result;
    }
    // isToday: ()=> {
    //     var formattedDate = Session.get('formattedDate');
    //     return formattedDate;
    // }
});
