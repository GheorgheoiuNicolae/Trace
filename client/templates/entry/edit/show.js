var today = moment().format('YYYY-MM-DD');
Session.set('currentDate', today);

Template.editEntry.events({
    'change .imageInput': function(event, template) {
        FS.Utility.eachFile(event, function(file) {
            // target the current entry
            var current = Template.currentData();

            Images.insert(file, function (err, fileObj) {
                console.log('fileObj', fileObj);
                var objId = fileObj._id;
                Session.set('fileObjid', objId);

                var pathToImage = '/cfs/files/images/' + fileObj._id;
                var imgId = fileObj._id;

                if (err){
                    console.log('err', err);
                } else {
                    Gallery.insert({
                        image: pathToImage,
                        imgId: imgId,
                        createdAt: new Date(),
                        author: Meteor.userId,
                        entry: current._id
                    });
                }
            });


            var images = Gallery.find({entry: current._id}).fetch();
            var imagesLength = images.length - 1;
            var imagesArr = []

            for(i = 0; i < imagesLength; i++){
                var imageId = images[i]._id;
                imagesArr.push(imageId);
            }
            console.log('imagesArr', imagesArr);

            if(imagesArr.length > 0) {
                console.log('there are images');
                Entries.update({_id: current._id}, {$set: {
                    images: imagesArr
                }});
            }
        });
    },
    'submit .edit-entry': function(event){

        var current = Template.currentData();
        console.log('current', current);

        var imgId = Session.get('fileObjid');
        console.log('imgId', imgId);

        var title = event.target.title.value;
        console.log('title', title);
        var date = event.target.date.value;
        console.log('date', date);
        var description = event.target.description.value;
        console.log('description', description);
        var createdAt = this.createdAt;

        // * Labels *
        // Getting the checked labels
        var checkedLabels = $('.label-checkbox:checked');
        // initiate empty array
        var labelsArray = [];
        // go over the checked labels
        for(i = 0; i < checkedLabels.length; i++){
            var label = checkedLabels[i].value;
            // store ids into array
            labelsArray.push(label);
        };

        // Getting the image
        var imageId = imgId;


        Entries.update({_id: this._id}, {$set: {
            title: title,
            description: description,
            date: date,
            createdAt: createdAt,
            entryLabels: labelsArray,
            author: Meteor.userId
        }});

        return false;
    }
});


Template.editEntry.helpers({
    // ** Todo: change this at some point. It's bad practice to query the db 2 times for the same collection
    // get all labels that are not assigned to the entry
    labels: ()=> {
        var current = Template.currentData();
        return Labels.find({_id: {$nin: current.entryLabels}});
    },
    // get only the current entry labels
    entryLabels: ()=> {
        var current = Template.currentData();
        var labels = Labels.find({_id: {$in: current.entryLabels}});

        return labels;
    },
    entryDate: ()=> {
        var current = Template.currentData();
        var formatted = moment(current.date).format('YYYY-MM-DD')
        return formatted;
    },
    entryImages: ()=> {
        var current = Template.currentData();
        // check if there are any images added to the current entry before searching the db
        if(current.imageIds) {
            var images = Gallery.find({imgId: {$in: current.imageIds}});
        }
        return images;
    }
    // entryImages: ()=> {
    //     var current = Template.currentData();
    //     // check if there are any images added to the current entry before searching the db
    //         var images = Gallery.find({entry: current._id});
    //         console.log('asddddd', images);
    //     return images;
    // }
});
