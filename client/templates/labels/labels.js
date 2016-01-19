Meteor.subscribe('labels');

Template.labels.helpers({
    labels: ()=> {
        return Labels.find({});
    }
});


Template.labels.events({
    'submit .add-label': function(event){
        var name = event.target.name.value;
        var color = event.target.color.value;

        Labels.insert({
            name: name,
            color: color
        });

        console.log(' name', name);
        return false;
    },
    'click .delete-label': function (event) {
        labelId = this._id;
        // get all entries with the label id
        var entries = Entries.find({entryLabels: labelId}).fetch();

        // delete label
        Labels.remove({_id: this._id});


        console.log('removed')
    }
});
