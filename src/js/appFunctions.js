const { Console } = require('console');
const { ipcRenderer } = require('electron');
const maximizeRestBtn = document.getElementById('maximizeRestBtn');
const minimizeBtn = document.getElementById('minimizeBtn')
const closeBtn = document.getElementById('closeBtn')
const appIcon = document.getElementById('appIcon');
const ipc = ipcRenderer;

const coll0 = document.getElementsByClassName('files');
let a;
const coll = document.getElementsByClassName("start");
let i;
const coll2 = document.getElementsByClassName("insert");
let i2;

console.log(coll0);

// minimize app
minimizeBtn.addEventListener('click', () => { ipc.send('minimizeApp') })

// minimize restore app
function changemaximizeRestBtn(isMaximizedApp) {
    if (isMaximizedApp) {
        maximizeRestBtn.title = 'Restore';
        maximizeRestBtn.classList.remove('maximizeBtn');
        maximizeRestBtn.classList.add('restoreBtn');
    } else {
        maximizeRestBtn.title = 'Maximize';
        maximizeRestBtn.classList.remove('restoreBtn');
        maximizeRestBtn.classList.add('maximizeBtn');
    }
}

maximizeRestBtn.addEventListener('click', () => { ipc.send('maximizeRestoreApp') })

ipc.on('isMaximized', () => { changemaximizeRestBtn(true) })
ipc.on('isRestored', () => { changemaximizeRestBtn(false) })

// close app
closeBtn.addEventListener('click', () => { ipc.send('closeApp'); })

// close app with appicon
appIcon.addEventListener('dblclick', () => { ipc.send('closeApp') })

// menu bar function

for (a = 0; a < coll0.length; a++) {
    coll0[a].addEventListener("click", function() {
        this.classList.toggle("active");
        const oldcontent = document.getElementById('toolbox-start');
        const oldcontent2 = document.getElementById('toolbox-insert');
        const content = document.getElementById('toolbox-files');
        if (oldcontent.style.width === "block") {
            oldcontent.style.display = "none";
        } else if (oldcontent2.style.display === 'block') {
            oldcontent2.style.display = 'none';
        } else if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

// toolbox start function

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        const oldcontent = document.getElementById('toolbox-files');
        const oldcontent2 = document.getElementById('toolbox-insert');
        const content = document.getElementById('toolbox-start');
        if (oldcontent.style.width === "block") {
            oldcontent.style.display = "none";
        } else if (oldcontent2.style.display === 'block') {
            oldcontent2.style.display = 'none';
        } else if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

// toolbox insert function

for (i2 = 0; i2 < coll.length; i2++) {
    coll2[i2].addEventListener("click", function() {
        this.classList.toggle("active");
        const oldcontent = document.getElementById('toolbox-files');
        const oldcontent2 = document.getElementById('toolbox-start');
        const content = document.getElementById('toolbox-insert');
        if (oldcontent.style.display === "block") {
            oldcontent.style.display = "none";
        } else if (oldcontent2.style.display === "block") {
            oldcontent2.style.display = "none";
        } else if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}