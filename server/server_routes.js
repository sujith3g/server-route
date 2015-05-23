var fs = Npm.require('fs');

var fail = function(response) {
  response.statusCode = 404;
  response.end();
};

var dataFile = function() {
  // TODO write a function to translate the id into a file path
  var rootFolder = process.env.PWD;
  var file = rootFolder + "/private/sample.zip";
  // var file = fileFromId(this.params.id);

  // Attempt to read the file size
  var stat = null;
  try {
    stat = fs.statSync(file);
  } catch (_error) {
    return fail(this.response);
  }

  // The hard-coded attachment filename
  var attachmentFilename = 'filename-for-downloaded-file.zip';

  // Set the headers
  this.response.writeHead(200, {
    'Content-Type': 'application/zip',
    'Content-Disposition': 'attachment; filename=' + attachmentFilename,
    'Content-Length': stat.size
  });

  // Pipe the file contents to the response
  fs.createReadStream(file).pipe(this.response);
};
Router.route('/download',{
  name:'download',
  path:'/download/',
  action:dataFile, 
  where: 'server'
});
// Router.map(function() {
//     this.route('/data', {
//         where: 'server',
//         path: '/data',
//         action: dataFile
//     });
// });