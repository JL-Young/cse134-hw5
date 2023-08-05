class projectCard extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <h2>Default title</h2>
            <img alt='Default alt'>
            <p>Default description</p>
            <a href='#'>Read More</a>
        `;
    }

    /**
     * @param {string | null} name project title
     */
    set projectName(name) {
        this.shadowRoot.querySelector('h2').textContent = name;
    }
    /**
     * @param {string} img project image filepath
     */
    set projectImg(img) {
        this.shadowRoot.querySelector('img').setAttribute('src', img);
    }
    /**
     * @param {string} alt project image alt text
     */
    set projectAlt(alt) {
        this.shadowRoot.querySelector('img').setAttribute('alt', alt);
    }
    /**
     * @param {string | null} txt project description
     */
    set projectTxt(txt) {
        this.shadowRoot.querySelector('p').textContent = txt;
    }
    /**
     * @param {string} url project read more link
     */
    set projectURL(url) {
        this.shadowRoot.querySelector('a').setAttribute('href', url);
    }
}

customElements.define('project-card', projectCard);

const localData = [
    {
        "name" : "Roger Revelle",
        "img"  : "assets/revelle-logo.png",
        "alt"  : "Revelle College logo",
        "txt"  : "Purpose, Truth, and Vision: where the sciences, arts, and humanities join to educate and inspire multidisciplinary scholars...",
        "url"  : "https://revelle.ucsd.edu/"
    },
    {
        "name" : "John Muir",
        "img"  : "assets/muir-logo.gif",
        "alt"  : "Muir College logo",
        "txt"  : "Celebrating the Independent Spirit: dedication to helping students to lead varied, successful, committed, and self-directed lives...",
        "url"  : "https://muir.ucsd.edu/"
    },
    {
        "name" : "Thurgood Marshall",
        "img"  : "assets/marshall-logo.png",
        "alt"  : "Marshall college logo",
        "txt"  : "The student as scholar and citizen: social responsibility and academic excellence are equally important...",
        "url"  : "https://marshall.ucsd.edu/"
    }
];


localStorage.setItem('localData', JSON.stringify(localData));

function fetchLocal() {
    const data = JSON.parse(localStorage.getItem('localData'));
    return data;
}
  
function loadCard(data) {
    const projectCard = document.createElement('project-card');
    projectCard.projectName = data.name;
    projectCard.projectImg  = data.img;
    projectCard.projectAlt  = data.alt;
    projectCard.projectTxt  = data.txt;
    projectCard.projectURL  = data.url;
    return projectCard;
}

document.getElementById('loadLocalBtn').addEventListener('click', () => {
    const data = fetchLocal();
    if (Array.isArray(data) && data.length > 0) {
        const projectCards = document.getElementById('projectCards');
        projectCards.innerHTML = '';
  
        data.forEach((project) => {
            const projectCard = loadCard(project);
            projectCards.appendChild(projectCard);
        });
    }
});