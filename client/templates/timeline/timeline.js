Meteor.subscribe('entries');
Meteor.subscribe('getDayCategorisedEntries');


var today = moment().format('YYYY-MM-DD');
Session.set('currentDate', today);
var currentDate = Session.get('currentDate');
console.log('currentDate', currentDate);

var formattedDate = moment(currentDate).format('MM/DD/YYYY');
console.log('Formatted currentDate as MM/DD/YYY. ', formattedDate);
// set the current date on the session so I can use it to insert a new entry
Session.set('formattedDate', formattedDate);





Template.timeline.events({
    'submit .quickAdd': function(event, template){
        var entryTitle = event.target.entryTitle.value;
        var today = Session.get('formattedDate');
        console.log('today', today);
        Entries.insert({
            title: entryTitle,
            labels: [],
            images: [],
            date: today
        });

        event.target.entryTitle.value = "";
        return false
    }
});

Template.timeline.helpers({
    sortedEntries: ()=> {
        var result = SortedEntries.find();
        console.log('Sorted entries',result.fetch());
        return result;
    },
    isToday: ()=> {
        var formattedDate = Session.get('formattedDate');
        return formattedDate;
    }
});
