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
    var splitted = date.split('/');
    var mm = splitted[0] - 1;
    var dd = splitted[1];
    var yyyy = splitted[2];

    var resultedDate = moment(new Date(yyyy, mm, dd)).format('MMMM Do YYYY');
    return resultedDate;
});
