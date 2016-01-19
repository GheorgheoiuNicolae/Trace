Template.singleEntry.events({
    'click .title': function(event){
        var entryLabels = this.entryLabels;


        var arr = []
        for(i = 0; i < entryLabels.length; i++) {
            var label = entryLabels[i];
            var theLabel = Labels.find({_id: entryLabels[i]}).fetch();
            console.log('theLabel', theLabel);
            arr.push(theLabel);
        }

        console.log(arr);
    }
});

Template.singleEntry.helpers({
    labels: function(event){
        var entryLabels = this.entryLabels;
        console.log('entryLabels', entryLabels);
        // this is how you fetch using an array (entryLabels)
        var arr = Labels.find({_id: {$in: entryLabels}}).fetch();

        console.log('arr', arr[1]);
        return arr;
    }
});
