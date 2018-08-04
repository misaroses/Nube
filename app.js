const allcontrollers = require('./controllers/allcontrollers.js'),
	  express = require('express'),
	  app = express();

var misael = {
	nombre : 'misa',
	edad : '22'
};


//Ruta con express modulo
app.set('view engine', 'ejs');

//Activar el assets
app.use(express.static('./assets'));


allcontrollers(app);


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