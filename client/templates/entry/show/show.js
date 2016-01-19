Template.showEntry.helpers({
    labels: ()=> {
        return Labels.find({});
    },
    entryLabels: function(event){
        var entryLabels = this.entryLabels;
        if(entryLabels){
            console.log('-entryLabels', entryLabels);
            console.log('-entryLabels', entryLabels.lenght);
            // this is how you fetch using an array (entryLabels)
            var arr = Labels.find({_id: {$in: entryLabels}}).fetch();

            console.log('arr', arr[1]);
        }
        return arr;
    }
});
