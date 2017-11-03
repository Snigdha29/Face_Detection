var express = require('express');
var app = express();

var config = require('./config')

//var multer  = require('multer')
//var upload = multer({ dest: 'uploads/' });

var AWS = require('aws-sdk');
AWS.config.region = config.region;

var uuid = require('node-uuid');
var fs = require('fs-extra');
var path = require('path');


//app.use(express.static('public'));

var rekognition = new AWS.Rekognition({region: config.region});
var s3 = new AWS.S3({region: config.region}); 


	//app.get('/api/recognize', function (req, res) {
	//var bitmap = fs.readFileSync(req.file.path);

	var params={	 	
	Image: { 
    //"Bytes": bitmap,
    S3Object: {
      Bucket: "detactface",
      Name: "FB_IMG_1504715128043.jpg"
      //version: "S3ObjectVersion",
    }
  }
  //attributes: ["DEFAULT"] // accepts DEFAULT, ALL
	};
	
	var http = require("http");


rekognition.detectFaces(params, function(err, data) {
	 if (err) console.log(err, err.stack); // an error occurred
else     console.log(data);           // successful response
	}
	);
   






 
   