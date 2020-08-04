// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require('path');
const { remote } = require('electron');
const ipc = require('electron').ipcMain;
const url = require('electron').url;

require('./view/context-menu');

const fetch = require("node-fetch");




var mainWindow;
var videoWindow;

function createWindow () {

// Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  // and load the index.html of the app.
  mainWindow.loadFile('./view/login.html');


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// ------------------------------------------------------------------------------------------------------------
const io = require('socket.io-client');
var socket = io("https://wechats3.herokuapp.com");


ipc.on('login', function(event, arg){
    console.log(arg)
    socket.emit('newUser', arg);

    fetch("https://wechats3.herokuapp.com/checkValid/" + arg)
        .then(res => res.json())
        .then(data => {
                if(data.name){
                    mainWindow.webContents.send('verified', {name: data.name});
                    mainWindow.setSize(1000,750);
                }
            }
        )

});

ipc.on('getInfo', function(event, arg){
    fetch("https://wechats3.herokuapp.com/" + arg)
        .then(res => res.json())
        .then(data => {
                    mainWindow.webContents.send('data', {list: data.list});
            }
        )
});



ipc.on('send', function(event, arg){
    socket.emit('send', arg);
    console.log(arg);
});

socket.on('newUser', function(){
    console.log("get the newuser msg")
    mainWindow.webContents.send('refresh', 'yo');
});



socket.on('addNew', function(arg){
  console.log("Add New");
    mainWindow.webContents.send('addNew', arg);
});


socket.on('msg_FromOther', function(msg_bundleTo){
    mainWindow.webContents.send('msg_FromOther', msg_bundleTo);
});


socket.on('msg_FromMe', function(msg_bundleME){
    mainWindow.webContents.send('msg_FromMe', msg_bundleME);
});





// ------------------------ Video Call --------------------------------------------
// Get the video call request
ipc.on('video', function(event, id){
    socket.emit('reqVideo', id);
});

ipc.on('testing', function(event, id){
    videoWindow = new BrowserWindow({
        width: 800,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    });
    videoWindow.loadFile('./view/original.html');
});




// Invitation from other's video request
socket.on('invite', function(bundle){
    console.log("got invitation")
    // Create the browser window.
     videoWindow = new BrowserWindow({
        width: 500,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        }
    });
    videoWindow.loadFile('./view/video.html');
});


// Feedback from self's video request
socket.on('feedback', function(bundle){
    console.log("test feedback")
    // Create the browser window.
    videoWindow = new BrowserWindow({
        width: 500,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        }
    });
    videoWindow.loadFile('./view/video.html');
});


// videoWindow.webContents.send('feedback', bundle);
// videoWindow.webContents.send('test', bundle.caller);











// ------------------------------------------------------------------------------------------------------------


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

