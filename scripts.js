function init() {
    let element = document.getElementById('loadLocalBtn');
    element.addEventListener('click', function () {
        loadLocal();
    });

    element = document.getElementById('loadRemoteBtn');
    element.addEventListener('click', function () {
        loadRemote();
    });
}

function loadLocal() {

}

function loadRemote() {
    
}

window.addEventListener('DOMContentLoaded', init);