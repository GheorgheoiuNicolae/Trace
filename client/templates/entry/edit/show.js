var today = moment().format('YYYY-MM-DD');
Session.set('currentDate', today);

Template.editEntry.events({
    'change .imageInput': function(event, template) {
        FS.Utility.eachFile(event, function(file) {
            // target the current entry
            var current = Template.currentData();

            Images.insert(file, function (err, fileObj) {
                // var objId = fileObj._id;
                // Session.set('fileObjid', objId);

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

                var images = Gallery.find({entry: current._id}).fetch();
                // note: if -1 is removed the upload works on the first try but the image is not sent to the client and we get a GET error
                // figure out a way to wait for the image to be stored into the collection
                var imagesLength = images.length - 1;
                console.log('imagesLength', imagesLength);
                var imagesArr = [];


                for(i = 0; i < imagesLength; i++){
                    console.log('the for has run!');
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
        });
    },
    'click .delete-image': function(event){
        console.log('clicked', this);
    },
    'submit .edit-entry': function(event){
        var current = Template.currentData();
        console.log('current', current);

        var title = event.target.title.value;
        var date = event.target.date.value;
        var description = event.target.description.value;
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

        Entries.update({_id: this._id}, {$set: {
            title: title,
            description: description,
            date: date,
            createdAt: createdAt,
            labels: labelsArray,
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
        return Labels.find({_id: {$nin: current.labels}});
    },
    // get only the current entry labels
    entryLabels: ()=> {
        var current = Template.currentData();
        var labels = Labels.find({_id: {$in: current.labels}});

        return labels;
    },
    entryDate: ()=> {
        var current = Template.currentData();
        var formatted = moment(current.date).format('YYYY-MM-DD')
        return formatted;
    },
    images: ()=> {
        var current = Template.currentData();
        var entryImages = current.images;
        // check if there are any images added to the current entry before searching the db
        if(current.images) {
            var images = Gallery.find({_id: {$in: entryImages}}).fetch();
        };
        return images;
    }
});
