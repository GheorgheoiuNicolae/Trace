var today = moment().format('YYYY-MM-DD');
Session.set('currentDate', today);

Template.addEntry.events({

    'change .imageInput': function(event, template) {
        FS.Utility.eachFile(event, function(file) {
            Images.insert(file, function (err, fileObj) {
                console.log('fileObj', fileObj);
                var objId = fileObj._id;
                Session.set('fileObjid', objId);


                var pathToImage = '/cfs/files/images/' + fileObj._id;
                var imgId = fileObj._id;

                if (err){
                    console.log('err', err);
                } else {
                    var imagesURL = {
                        'myImage': pathToImage,
                        'imgId': imgId,
                        'author': Meteor.userId
                    };
                console.log('imagesURL', imagesURL);
              }

              Gallery.insert({
                  image: pathToImage,
                  imgId: imgId,
                  createdAt: new Date(),
                  author: Meteor.userId
              });
            });
        });
    },

    'submit .add-entry': function(event){
        var imgId = Session.get('fileObjid');
        console.log('imgId', imgId);

        var title = event.target.title.value;
        var description = event.target.description.value;
        var date = event.target.date.value;
        // * Labels *
        // Getting the checked labels
        var checkedLabels = $('.label-checkbox:checked');
        //initiate empty array
        var labelsArray = [];
        //go over the checked labels
        for(i = 0; i < checkedLabels.length; i++){
            var label = checkedLabels[i].value;
            // store ids into array
            labelsArray.push(label);
        };

        // Getting the image
        var imageId = imgId;

        var galleryImg = Gallery.find({imgId: imgId});
        console.log('galleryImg', galleryImg);
        console.log('galleryImg id', galleryImg._id);

        Entries.insert({
            title: title,
            description: description,
            entryLabels: labelsArray,
            imageIds: [imgId]
        });

        return false;
    }
});

// Returns all labels to 'the add new entry' template
Template.addEntry.helpers({
    labels: ()=> {
        return Labels.find({});
    },
    currentDate: function() { return Session.get('currentDate'); }
});
