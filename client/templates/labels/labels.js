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
    'click .add-new-label': function(event){
        Labels.insert({
            name: 'Label name',
            color: 'green',
            createdAt: new Date()
        });
        console.log('this', this);
        //get all the html elements with a class of .label-row in order to add autofocus to the newest item
        var labelsArr = $('.label-row');
        console.log('labelsArr', labelsArr);
        // get the last item
        // add autofocus
        var lastItem = labelsArr[labelsArr.length - 1];
        var lastItemInput = $(lastItem).find('input.label-editable-name');
        $(lastItemInput).focus();
        console.log('lastItemInput', lastItemInput);

        //
        // $('#someid').prop('disabled', true);
        console.log('lastItem', lastItem);
    },
    'click .edit-label': function(event){
        // target the selected radio(for color) inside the cliked label
        var clickedLabelId = this._id;
        var chosenColor = $('.' + clickedLabelId).find('input[name="labelColor"]:checked').val();

        if(chosenColor != undefined){
            if(chosenColor != this.color){
                Labels.update({_id: this._id}, {$set: {color: chosenColor}});
                console.log('updated the color.');
            }
        }
    },
    'blur .label-editable-name': function(event){
        var clickedLabelId = this._id;

        var changedName = $('.' + clickedLabelId).find('input[name="name"]').val();
        if(this.name != changedName) {
            Labels.update({_id: clickedLabelId}, {$set: {name: changedName}});
            console.log('updated the name.');
        }

        // removes autofocus for inputs on blur
        $('input.label-editable-name').prop('autofocus', false);
    },
    'click .delete-label': function (event) {
        labelId = this._id;
        // get all entries with the label id
        var entries = Entries.find({entryLabels: labelId}).fetch();

        // delete label
        Labels.remove({_id: this._id});

        console.log('removed label only from the Labels collection.')
    }
});
