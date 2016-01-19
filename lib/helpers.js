UI.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).format('hh:mm');
});
