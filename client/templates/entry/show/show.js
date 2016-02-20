// showEntry is no longer used. Since the aggregation works, showSortedEntries is used to return the labels
// Template.showEntry.helpers({
//     labels: ()=> {
//         return Labels.find({});
//     },
//     entryLabels: function(event){
//         var entryLabels = this.labels;
//         console.log('entryLabels', entryLabels);
//
//         if(entryLabels){
//             // this is how you fetch using an array (entryLabels)
//             var arr = Labels.find({_id: {$in: entryLabels}}).fetch();
//         }
//
//         // save the first label as I need it's color to use in the template
//         var firstLabelColor = arr[0];
//         Session.set('labelColor', firstLabelColor);
//
//         return arr;
//     }
// });
Template.showSortedEntries.helpers({
    labels: ()=> {
        return Labels.find({});
    },
    entryLabels: function(event){
        var entryLabels = this.labels;

        if(entryLabels){
            // this is how you fetch using an array (entryLabels)
            var arr = Labels.find({_id: {$in: entryLabels}}).fetch();
        }

        // save the first label as I need it's color to use in the template
        var firstLabelColor = arr[0];
        Session.set('labelColor', firstLabelColor);

        return arr;
    }
});
