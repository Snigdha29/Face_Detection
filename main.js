var express = require("express");
var app = express();

//var config = require("./config")
var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-1"});

var proxy = require("proxy-agent");
AWS.config.update({
  httpOptions: {
    agent: proxy('http://proxy.ebiz.verizon.com:80')
  }
});

var accessKeyID=AWS.config.credentials.accessKeyId;
var secretAccessKey=AWS.config.credentials.secretAccessKey;

var uuid = require("node-uuid");
var fs = require("fs-extra");
var path = require("path");
app.use(express.static(path.join(__dirname, 'public')));

var recognition = new AWS.Rekognition({region: AWS.config.region});

	var params={	 	
	Image: {     
    S3Object: {
      Bucket: "detectface",
      Name: "Sample 4.jpg"
     }
  },
  Attributes: [
    "ALL"
  ]
	};

app.get('/detect', function(req, res) {
    recognition.detectFaces(params, function(error, response) {
 if (error) console.log(error, error.stack); // an error occurred
 else 
 {
  var faceDetails = response.FaceDetails[0];
  /*console.log("Person is smiling :"+faceDetails.Smile.Value);
  console.log("Person is in a mood :"+faceDetails.Emotions[0].Type);
  console.log("Person is aged between: "+faceDetails.AgeRange.Low+" and "+faceDetails.AgeRange.High);
  console.log("Person gender :"+faceDetails.Gender.Value);
  console.log("Person has EyesOpen :"+faceDetails.EyesOpen.Value);
  console.log("\n");*/
  res.send("Person is smiling :"+faceDetails.Smile.Value+" Person is in a mood :"+faceDetails.Emotions[0].Type+" Surity:"+(faceDetails.Emotions[0].Confidence).toFixed(2)+"% Person is aged between: "+faceDetails.AgeRange.Low+" and "+faceDetails.AgeRange.High+" Person gender :"+faceDetails.Gender.Value+" Person has EyesOpen :"+faceDetails.EyesOpen.Value);
 }
});
});

app.listen(5555);
   
