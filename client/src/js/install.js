const butInstall = document.getElementById('buttonInstall');
var installEvent;
// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event)=>{
    
    butInstall.style.visibility = 'visible';
    
    
    butInstall.addEventListener('click', async () => {
        event.prompt();
        butInstall.setAttribute('disabled', true);
        butInstall.textContent = 'Installing!';
    });
});

// TODO: Implement a click event handler on the `butInstall` element


// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    butInstall.textContent = 'Installed!';
    console.log('app installed', 'appinstalled', event);
});
