// My Contacts Basic

// HTML Elements
let goBtnEl = document.getElementById("go-btn");
let menuEl = document.getElementById("menu");
let contactEl = document.getElementById("contacts");

// Go Btn - Menu Listener
goBtnEl.addEventListener("click", goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === "display-all") {
    displayContacts();
  } else if (selection === "add") {
    addContact();
  } else if (selection === "remove") {
    removeContact();
  } else if (selection === "display-name") {
    displayByName();
  } else if (selection === "display-country") {
    displayByCountry();
  } else if (selection === "display-email") {
    displayByEmail();
  }
}

//Global
let contacts = loadContacts();

// MENU FUNCTIONS
function displayContacts() {
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    outputStr += getContactHTMLStr(contacts[i], i);
  }
  contactEl.innerHTML = outputStr;
}

function addContact() {
  let name = prompt("Name:");
  let email = prompt("Email:");
  let phone = prompt("Phone:");
  let country = prompt("Country:");
  if (findByEmail(email) !== -1) {
    alert("Email Already Used");
  } else {
    contacts.push(newContact(name, email, phone, country));
    saveContacts();
    alert("Contact Added");
  }
}

function removeContact() {
  let selectionEmail = prompt("Email:");
  let index = findByEmail(selectionEmail);
  if (index >= 0 && index < contacts.length) {
    contacts.splice(index, 1);
    saveContacts();
    alert("Contact Removed");
  } else {
    alert("Invalid Contact #");
  }
}

function displayByName() {
  let selectionName = prompt("Name:");
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    if (selectionName === contacts[i].name) {
      //remember to include index
      outputStr += getContactHTMLStr(contacts[i], i);
    }
  }
  contactEl.innerHTML = outputStr;
}

function displayByCountry() {
  let selectionCountry = prompt("Country:");
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    if (selectionCountry === contacts[i].country) {
      //remember to include index
      outputStr += getContactHTMLStr(contacts[i], i);
    }
  }
  contactEl.innerHTML = outputStr;
}

function displayByEmail() {
  let selectionEmail = prompt("Email:");
  let outputStr = "";
  i = findByEmail(selectionEmail);
  if (i === -1) {
    alert ("Email Not Found")
  } else
  outputStr += getContactHTMLStr(contacts[i], i);
  contactEl.innerHTML = outputStr;
}

//Helper Function
function newContact(desc1, desc2, desc3, desc4) {
  return {
    name: desc1,
    email: desc2,
    phone: desc3,
    country: desc4,
  };
}

function getContactHTMLStr(contact, i) {
  return `
  <div> 
  ${i}: <b>${contact.name}</b>
  <br>${contact.email}
  <br>${contact.phone}
  <br>${contact.country}
  </div>
  `;
}

function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function loadContacts() {
  let contactsStr = localStorage.getItem("contacts");
  return JSON.parse(contactsStr) ?? [];
}

function findByEmail(input) {
  for (let i = 0; i < contacts.length; i++) {
    if (input === contacts[i].email) {
      return i;
    }
  }
  return -1;
}
