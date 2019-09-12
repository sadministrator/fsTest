const fs = require('fs')
const colors = require('colors')

let source = './Source'
let destination = './Destination'

// Saves source path files to array of file names
function readDirectory(path){
  let files = fs.readdirSync(path)
    return files
}

// creates destination directory
function createDirectory(path){
  if (fs.existsSync(path)){
    console.log(error(path + ' already exists.'))
    return
  }

  fs.mkdirSync(path, function(err){
    console.error(err)
  })
  console.log(success(path + ' created.'))
}

// copies array of file pathnames to destination directory
function copyFiles(files, source, destination){
  files.forEach(function(file){
    if(fs.lstatSync(source + '/' + file).isFile()){
      fs.copyFileSync(source +'/' + file, destination + '/' + file)
      console.log(success('Copied ' + file + ' to ' + destination))
    }
    else {
      let rSource = source + '/' + file
      let rFiles = readDirectory(rSource)
      createDirectory(destination + '/' + file)
      copyFiles(rFiles, rSource, destination + '/' + file)
    }
  })
}

// returns message in red text
function error(msg){
  return msg.red
}

// returns message in green text
function success(msg){
  return msg.green
}

let dateStart = new Date()
console.log('Start date and time: ' + dateStart)

files = readDirectory(source)
createDirectory(destination)
copyFiles(files, source, destination)

let dateFinish = new Date()
console.log('End date and time: ' + dateFinish)
