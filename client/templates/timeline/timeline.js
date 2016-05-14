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
    entries: ()=> {
        var dbEntries = Entries.find({}).fetch();
        var sortedByDateTime = _.sortBy(dbEntries, 'dateTime');
        var datesObj = [];

        // Creates an array with dates
        for(i = 0; i < sortedByDateTime.length; i++){
            datesObj.push(sortedByDateTime[i].dateYearMonthDay);
        }
        // Filters the array with dates to keep only the unique items
        var filteredUnique = _.uniq(datesObj);
        // Filters the unique dates array to be ascending
        var filterAsc = _.sortBy(filteredUnique, function(num){
            return num;
        });
        var entries = [];

        // Creates an object with the unique YMD as _id
        for(i = 0; i< filterAsc.length; i++) {
            entries.push({
                _id: filterAsc[i],
                matchingEntries: []
            });
        }

        // pushes the entries of wich the YMD is equal to the _id in the object
        for(j = 0; j< sortedByDateTime.length; j++){
            for(i = 0; i < entries.length; i++) {
                if(entries[i]._id == sortedByDateTime[j].dateYearMonthDay) {
                    entries[i].matchingEntries.push(sortedByDateTime[j]);
                }
            }
        }

        return entries;
    }
});
