const { app, BrowserWindow } = require("electron");
const path = require("path");


function createWindow() {


    const win = new BrowserWindow({

        width: 1200,

        height: 900,

        icon: path.join(
            __dirname,
            "assets",
            "icon.ico"
        ),

        autoHideMenuBar: true,

        webPreferences: {

            contextIsolation: true

        }

    });


    win.loadFile(
        "index.html"
    );


    win.webContents.on(
        "devtools-opened",
        () => {

            win.webContents.closeDevTools();

        }
    );

}


app.whenReady().then(() => {

    createWindow();

});


app.on(
    "window-all-closed",
    () => {

        if(process.platform !== "darwin"){

            app.quit();

        }

    }
);