var express = require("express");
var app = express();

var config = require("./config")
//var credentials=require("./credentials")

//var multer  = require("multer")
//var upload = multer({ dest: "uploads/" });


var AWS = require("aws-sdk");
//AWS.config.region = config.region;
AWS.config.update({region: "us-east-1"});

//console.log(AWS.config);
var accessKeyID=AWS.config.credentials.accessKeyId;
var secretAccessKey=AWS.config.credentials.secretAccessKey;
//console.log(accessKeyID);
//console.log(secretAccessKey);

var uuid = require("node-uuid");
var fs = require("fs-extra");
var path = require("path");


//app.use(express.static("public"));

var recognition = new AWS.Rekognition({region: config.region});
var s3 = new AWS.S3({region: config.region}); 


	//app.get('/api/recognize', function (req, res) {
	//var bitmap = fs.readFileSync(req.file.path);

	var params={	 	
	Image: { 
    
    S3Object: {
      Bucket: "detectface",
      Name: "FB_IMG_1504715128043.jpg"
     }
  },
  Attributes: [
    "ALL"
  ]
	};

	
recognition.detectFaces(params, function(error, response) {
 if (error) console.log(error, error.stack); // an error occurred
 else 
 {
  console.log("-------- START: Facial analysis --------");
  var faceDetails = response.FaceDetails[0];
  console.log("Person is smiling :"+faceDetails.Smile.Value);
  console.log("Person is wearing sunglasses :"+faceDetails.Sunglasses.Value);
  console.log("Person gender :"+faceDetails.Gender.Value);
  console.log("Person has beard :"+faceDetails.Beard.Value);
  console.log("Person has mustache :"+faceDetails.Mustache.Value);
  console.log("Person has EyesOpen :"+faceDetails.EyesOpen.Value);
  console.log("-------- END: Facial analysis --------");
  console.log("\n");
 }
});



   






 
   