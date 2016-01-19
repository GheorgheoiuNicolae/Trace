Meteor.publish('entries', function(){
    return Entries.find({author: this.userId});
});

Meteor.publish('labels', function(){
    return Labels.find({author: this.userId});
});


Meteor.publish('gallery', function(){
    return Gallery.find();
});
Meteor.publish("images", function(){ return Images.find(); });
