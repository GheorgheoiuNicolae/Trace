Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function(){
    this.route('timeline', {
        path: '/',
        template: 'timeline'
    });
    this.route('addEntry', {
        path: '/add-entry',
        template: 'addEntry'
    });
    this.route('singleEntry', {
        path: '/entries/:_id',
        template: 'singleEntry',
        data: function(){
            return Entries.findOne(this.params._id)
        }
    });
    this.route('editEntry', {
        path: '/entries/edit/:_id',
        template: 'editEntry',
        data: function(){
            return Entries.findOne(this.params._id)
        }
    });

    this.route('labels', {
        path: '/labels',
        template: 'labels'
    });

    this.route('gallery', {
        path: '/gallery/upload',
        template: 'addImages'
    });
});


if (Meteor.isClient) {
  subscribed = false;
  Tracker.autorun(function() {
    if (Meteor.user() && !subscribed) {
      console.log('aggregation has run!!!!');
      // Subscribing to the name we gave the publish above
      Meteor.subscribe('sortedEntries');
      return subscribed = true;
    }
  });
}
