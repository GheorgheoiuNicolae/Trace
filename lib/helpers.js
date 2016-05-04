UI.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).format('hh:mm');
});

UI.registerHelper("formatDayDate", function(timestamp) {
    return moment(new Date(timestamp)).format('LL');
});

UI.registerHelper('equals', function (a, b) {
    return a === b;
});

// This helper formats the day _id which is a string like this: 02.11.2016 into
// a date so I can format it with moment
UI.registerHelper('dayName', function (dayId) {
    var date = dayId;
    var splitted = date.split('-');
    console.log('splitted', splitted);
    var yyyy = splitted[0];
    var mm = splitted[1];
    console.log('mm', mm);
    var dd = splitted[2];

    var resultedDate = moment(new Date(yyyy, mm - 1, dd)).format('MMMM Do YYYY');
    console.log('eee', resultedDate);
    return resultedDate;
});
