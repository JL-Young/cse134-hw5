class CrudCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <h2></h2>
        <p></p>
      `;
    }
  
    /**
     * @param {string | null} name crud title
     */
    set crudName(name) {
      this.shadowRoot.querySelector('h2').textContent = name;
    }
  
    /**
     * @param {string | null} txt crud description
     */
    set crudTxt(txt) {
      this.shadowRoot.querySelector('p').textContent = txt;
    }
  }
  
  customElements.define('crud-card', CrudCard);
  
  const localData = [
    {
      name: "Roger Revelle",
      txt: "Purpose, Truth, and Vision: where the sciences, arts, and humanities join to educate and inspire multidisciplinary scholars...",
    },
    {
      name: "John Muir",
      txt: "Celebrating the Independent Spirit: dedication to helping students to lead varied, successful, committed, and self-directed lives...",
    },
    {
      name: "Thurgood Marshall",
      txt: "The student as scholar and citizen: social responsibility and academic excellence are equally important...",
    },
  ];
  
  localStorage.setItem('localData', JSON.stringify(localData));
  
  function fetchLocal() {
    const data = JSON.parse(localStorage.getItem('localData'));
    return data;
  }
  
  function createData(name, txt) {
    const newData = {
      name: name,
      txt: txt,
    };
  
    const data = fetchLocal() || [];
    data.push(newData);
    saveLocal(data);
    readCards();
  }
  
  function readCards() {
    const data = fetchLocal();
    if (Array.isArray(data) && data.length > 0) {
      loadCard(data);
    } else {
      alert('No data available. Please add data using the "Create" section.');
    }
  }
  
  function updateData(index, name, txt) {
    const data = fetchLocal();
    if (Array.isArray(data) && data.length > index) {
      data[index].name = name;
      data[index].txt = txt;
      saveLocal(data);
    } else {
      alert('Invalid index.');
    }
    readCards();
  }
  
  function deleteData(index) {
    const data = fetchLocal();
    if (Array.isArray(data) && data.length > index) {
      data.splice(index, 1);
      saveLocal(data);
    } else {
      alert('Invalid index.');
    }
    readCards();
  }
  
function saveLocal(data) {
    localStorage.setItem('localData', JSON.stringify(data));
}
  
function loadCard(data) {
    const crudCards = document.getElementById('crudCards');
    crudCards.innerHTML = '';
  
    data.forEach((crud) => {
      const crudCard = document.createElement('crud-card');
      crudCard.crudName = crud.name;
      crudCard.crudTxt = crud.txt;
      crudCards.appendChild(crudCard);
    });
}

const crudForm = document.getElementById('crudForm');
crudForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const operation = document.getElementById('operation').value;
  const index = parseInt(document.getElementById('index').value);
  const name = document.getElementById('name').value;
  const txt = document.getElementById('txt').value;

  switch (operation) {
    case 'create':
      if (!name || !txt) {
        alert('Please fill in both Name and Description fields for Create operation.');
        return;
      }
      createData(name, txt);
      break;
    case 'read':
      readCards();
      break;
    case 'update':
      if (!index) {
        alert('Please enter the Index field for Update operation.');
        return;
      }
      updateData(index, name, txt);
      break;
    case 'delete':
      if (!index) {
        alert('Please enter the Index field for Delete operation.');
        return;
      }
      deleteData(index);
      break;
    default:
      alert('Invalid operation selected.');
      break;
  }

  crudForm.reset();
});