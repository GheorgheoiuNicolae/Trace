UI.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).format('hh:mm');
});

UI.registerHelper("formatDayDate", function(timestamp) {
    return moment(new Date(timestamp)).format('LL');
});

UI.registerHelper('equals', function (a, b) {
    return a === b;
});
