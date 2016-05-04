Meteor.subscribe('entries');
Meteor.subscribe('getDayCategorisedEntries');

var today = moment().format('YYYY-MM-DD');
console.log('todaytoday', today);
Session.set('currentDate', today);
//var currentDate = Session.get('currentDate');
console.log('today', today);

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
        // In addition to returning the entries sorted by day, I also needed to sort the days. 
        // The problem with this is that in the agregation I could only keep one key and that is 
        // the _id which keeps a date as a string like this: "2106-02-16"

        // The code below converts that _id into a date.getTime() and after that, using undersore, I filtered the days.


        var result = SortedEntries.find({});
        var fetchedEntries = result.fetch();
        

        // Adds a date key on the fetchedEntries object in order to sort it
        for(i = 0; i < fetchedEntries.length; i++) {
            // Sorting for the days - by time (older first)
            var dayId = fetchedEntries[i]._id;
            var splitted = dayId.split('-');
            var dayDate = new Date(splitted[0], splitted[1], splitted[2]).getTime();
            fetchedEntries[i].date = dayDate;

            var entriesInDay = fetchedEntries[i].entries;
            
            // filters the entries inside a day
            if(entriesInDay.length > 1) {
                for(index = 0; index < entriesInDay.length; index++) {
                    fetchedEntries[i].entries = _.sortBy(entriesInDay, 'dateTime');
                }
            }
        }

        var filteredEntries = _.sortBy(fetchedEntries, 'date');

      
        
        return filteredEntries;
    }
    // isToday: ()=> {
    //     var formattedDate = Session.get('formattedDate');
    //     return formattedDate;
    // }
});
