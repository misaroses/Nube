const bodyParser = require('body-parser'),
	  fs = require('fs'),
	  path = require('path');

var data = [{add:'hola'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = (app) => {


app.get('/',function(req,res) {

	res.render('index',);

});

app.get('/login',function(req,res) {

	res.render('login',);

});

ruta = './public_ftp/uploads/';


app.get('/profile',function(req,res) {
	
	fs.readdir(ruta, (err, files)=>{

		if (err) {
			console.log('ERROR___________');
			console.log(err.message);
		} else {

			function detectType(b) {
				switch(b){
					case '.dir' : 
						return 'folder';
						break;
					case '.jpg' : 
						return 'image';
						break;
					default : 
						return 'document';
				}
			}

			var newFiles = {};

			for (var i = files.length - 1; i >= 0; i--) {

				r = ruta + files[i];

				ruta_env = __dirname + '/public_ftp/uploads/' + files[i];


				function addJSON(a,size,r) { newFiles[i] = {nombre : files[i], tipo : a, peso : size, ruta : r} }

				const stats = fs.statSync(r);
				const fsizeB = stats.size;
				//Convert the file size to megabytes (optional)
				const fsizeM = fsizeB / 1000000.0;


				//detectar si es un diretorio
				dir = fs.statSync(r).isDirectory();

				if (dir) {
					addJSON('.dir',fsizeM,ruta_env);
				}
				else {
					type = path.extname(files[i]);
					addJSON(type,fsizeM,ruta_env);
				}

				if (i === 0) {
					res.render('profile',{ file : newFiles, detectType : detectType, data : data});
				}
			}
		}

	});
});


app.post('/profile', urlencodedParser, function (req, res) {

	data.push(req.body);

	console.log(data);
	res.json(data);
});




}