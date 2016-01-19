Meteor.subscribe('gallery');
Meteor.subscribe('images');

Template.addImages.helpers({
    images: ()=> {
        return Images.find({});
    },
    gallery: ()=> {
        return Gallery.find({});
    }
});

Template.addImages.events({
    'change .imageInput': function(event, template) {
        FS.Utility.eachFile(event, function(file) {
            console.log('event', event);
            console.log('file', file);
            Images.insert(file, function (err, fileObj) {
                console.log('fileObj', fileObj);
                var pathToImage = '/cfs/files/images/' + fileObj._id;

                if (err){
                    console.log('err', err);
                } else {
                    var imagesURL = {
                        'myImage': pathToImage
                    };
                    console.log(' Meteor.user',  Meteor.user)
                console.log('imagesURL', imagesURL);
                }

                Gallery.insert({
                    image: pathToImage,
                    createdAt: new Date()
                });
            });
        });
    }
});
