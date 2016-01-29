Template.showEntry.helpers({
    labels: ()=> {
        return Labels.find({});
    },
    entryLabels: function(event){
        var entryLabels = this.entryLabels;
        if(entryLabels){
            // this is how you fetch using an array (entryLabels)
            var arr = Labels.find({_id: {$in: entryLabels}}).fetch();
        }
        return arr;
    }
});
