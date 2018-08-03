const express = require('express'),
	  app = express(),
	  http = require('http'),
	  fs = require('fs'),
	  path = require('path');

var misael = {
	nombre : 'misa',
	edad : '22'
};


//Ruta con express modulo

app.set('view engine', 'ejs');

app.get('/',function(req,res) {

	res.sendFile(__dirname + '/public/index.html');

});

app.get('/login',function(req,res) {

	res.sendFile(__dirname + '/public/login.html');

});

app.get('/profile',function(req,res) {

	ruta = './public_ftp/uploads/';

	


	
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

					var newFile = JSON.stringify(newFiles);
					console.log('ver el json: '+ newFile);

					res.render('profile',{ file : newFiles, detectType : detectType });

				}

			}

		}


	});



});


app.listen(3000);


/*

let directory = 'node_modules';
let dirBuf = Buffer.from(directory);

fs.readdir(dirBuf, (err, files)=>{
	if (err) {
		console.log('ERROR___________');
		console.log(err.message);
	} else {
		//console.log(files);
	}
});

*/





/* Ruta en Node puro -------------

http.createServer(function (req,res){
	var url = req.url;

	console.log('Creado en: ' + url);
 
	if (url === '/home' || url === '/') {

		res.writeHead(200,{'Content-Type' : 'text/html'});
		fs.createReadStream('./public/index.html', 'utf-8').pipe(res);

	} else if (url === '/login'){

		res.writeHead(200,{'Content-Type' : 'text/html'});
		fs.createReadStream('./public/login.html', 'utf-8').pipe(res);		

	} else if (url === '/api/misael' ) {

		res.writeHead(200,{'Content-Type' : 'aplication/json'});
		res.end(JSON.stringify(misael));

	} else {

		res.writeHead(200,{'Content-Type' : 'text/html'});
		fs.createReadStream('./public/404.html', 'utf-8').pipe(res);		
	}


}).listen(3000);


console.log('Servidor Activado');
/*

let directory = 'node_modules';
let dirBuf = Buffer.from(directory);

fs.readdir(dirBuf, (err, files)=>{
	if (err) {
		console.log('ERROR___________');
		console.log(err.message);
	} else {
		//console.log(files);
	}
});
*/



/*
fs.readFile('texto.txt','utf-8', (error,data)=>{
	if (error) {
		console.log(`Error ${error}`);
	}else {
		console.log(data);
	}
});*/