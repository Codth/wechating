const {
    BrowserWindow,
    Menu,
    MenuItem,
    ipcMain,
    app
} = require('electron')

// const menu = new Menu()
// menu.append(new MenuItem({ label: 'Hello' }))
// menu.append(new MenuItem({ type: 'separator' }))
// menu.append(new MenuItem({ label: 'Electron', type: 'checkbox', checked: true }))
//
// app.on('browser-window-created', (event, win) => {
//     win.webContents.on('context-menu', (e, params) => {
//         menu.popup(win, params.x, params.y)
//     })
// })

// ipcMain.on('show-context-menu', (event) => {
//     const win = BrowserWindow.fromWebContents(event.sender)
//     menu.popup(win)
// })



const menu2 = new Menu()
menu2.append(new MenuItem({ label: 'Delete', click() { deleteItem(); }  }))
menu2.append(new MenuItem({ label: 'Recall', click() { recall(); }  }))
menu2.append(new MenuItem({ type: 'separator' }))
menu2.append(new MenuItem({ label: 'More' }))

// menu2.append(new MenuItem({
//     role: 'help',
//     submenu: [
//         {
//             label: 'Learn More',
//             click: async () => {
//                 const { shell } = require('electron')
//                 await shell.openExternal('https://electronjs.org')
//             }
//         }
//     ]
// }))


var cur_id;
var EVENT;

ipcMain.on('right-click', (event, id) => {
    console.log(id);
    cur_id = id;
    const win = BrowserWindow.fromWebContents(event.sender)
    menu2.popup(win)
    EVENT = event;

})



function recall(){
    console.log("recalled" + cur_id);
}

function deleteItem(){
    EVENT.reply('delete', {id: cur_id})
}

