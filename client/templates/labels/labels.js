Meteor.subscribe('labels');

Template.labels.helpers({
    labels: ()=> {
        return Labels.find({});
    },
    colors: ()=> {
        var colors = [
            {
                name: 'coral',
                code: 'coral'
            },
            {
                name: 'cornflowerblue',
                code: 'cornflowerblue'
            },
            {
                name: 'crimson',
                code: 'crimson'
            }
        ];
        return colors;
    }
});


Template.labels.events({
    'submit .add-label': function(event){
        var name = event.target.name.value;
        var labelColor = 'green';
        console.log('labelColor', labelColor);

        Labels.insert({
            name: name,
            color: labelColor
        });

        console.log(' name', name);
        return false;
    },
    'click .edit-label': function(event){
        // target the selected radio(for color) inside the cliked label
        var clickedLabelId = this._id;
        var chosenColor = $('.' + clickedLabelId).find('input[name="labelColor"]:checked').val();
        Labels.update({_id: this._id}, {$set: {color: chosenColor}});
    },
    'keyup .label-editable-name': function(event){
        var clickedLabelId = this._id;
        var changedName = $('.' + clickedLabelId).find('input[name="name"]').val();
        console.log('changedName', changedName);

        //get the new value but do not send it into the db.
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
