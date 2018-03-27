var imgPath = require('../backendPath').imagepath1;

var image0 = document.createElement("img");
image0.setAttribute('src',imgPath+'/fleur.jpg'); 

var image1 = document.createElement("img");
image1.setAttribute('src',imgPath+'/fruit.jpg'); 

var image2 = document.createElement("img");
image2.setAttribute('src',imgPath+'/jardin.jpg'); 

var image3 = document.createElement("img");
image3.setAttribute('src',imgPath+'/jardins.jpg'); 

var image4 = document.createElement("img");
image4.setAttribute('src',imgPath+'/legume.jpeg'); 

var image5 = document.createElement("img");
image5.setAttribute('src',imgPath+'/pommier.jpg'); 

module.exports.mesimage = {
    im0 : image0,
    im1 : image1,
    im2 : image2,
    im3 : image3,
    im4 : image4,
    im5 : image5
}
