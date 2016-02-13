Template.singleEntry.events({
    'click .title': function(event){
        var entryLabels = this.labels;


        var arr = []
        for(i = 0; i < entryLabels.length; i++) {
            var label = entryLabels[i];
            var theLabel = Labels.find({_id: entryLabels[i]}).fetch();
            arr.push(theLabel);
        }
    }
});

Template.singleEntry.helpers({
    labels: function(event){
        var entryLabels = this.labels;
        if(entryLabels){
            // this is how you fetch using an array (entryLabels)
            var arr = Labels.find({_id: {$in: entryLabels}}).fetch();

            console.log('--arr', arr[0]);
        }
        return arr;
    }
});
