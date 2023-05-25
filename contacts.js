const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contact = allContacts.find((oneContact) => oneContact.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(
    (oneContact) => oneContact.id === contactId
  );

  if (index === -1) {
    console.log("this contact is not exist");
    return null;
  }

  const [contact] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return contact;
}

async function addContact(name, email, phone) {
  const newContact = { name, email, phone, id: nanoid() };
  const allContacts = await listContacts();
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
