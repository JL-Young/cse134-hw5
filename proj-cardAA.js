function init() {

    preloadData();

    document.getElementById('loadLocalBtn').addEventListener('click', function () {
        loadLocal();
    });

    document.getElementById('loadRemoteBtn').addEventListener('click', function () {
        loadRemote();
    });
}

function preloadData() {
    let localData = [
        {
            title    : 'local01',
            imgSrc   : '/assets/',
            imgAlt   : '',
            descript : '',
            linkHref : '',
            linkTxt  : '',
        },
        {
            title    : 'local02',
            imgSrc   : '/assets/',
            imgAlt   : '',
            descript : '',
            linkHref : '',
            linkTxt  : '',
        }
    ];

    let jsonData = JSON.stringify(localData);
    localStorage.setItem('localOutData', jsonData);
}

class ProjCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = `<h2>Web Component</h2>`;

        const API_KEY = '';
        const API_URL = '';

    }
}

customElements.define('project-card', ProjCard);

function loadLocal() {
    let outputData = JSON.parse(localStorage.getItem('localOutData'));
    let outputPos = document.getElementById("localOut");

    //clear existing content in container
    outputPos.innerHTML = '';

    for (let cur = 0; cur < outputData.length; cur++) {
        let projectCard = document.createElement('project-card');
        
        projectCard.data = {
            'title'    : outputPos[cur].title,
            'imgSrc'   : outputPos[cur].imgSrc,
            'imgAlt'   : outputPos[cur].imgAlt,
            'descript' : outputPos[cur].descript,
            'linkHref' : outputPos[cur].linkHref,
            'linkTxt'  : outputPos[cur].linkTxt,
        };

        outputPos.append(cur);
    }
}

function loadRemote() {

}

window.addEventListener('DOMContentLoaded', init);