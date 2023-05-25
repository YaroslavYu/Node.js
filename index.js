const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const contactsService = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts();
      console.table(allContacts);
      return;

    case "get":
      const contact = await contactsService.getContactById(id);
      console.log(contact);
      return;

    case "remove":
      const deletedContact = await contactsService.removeContact(id);
      console.log(deletedContact);
      return;

    case "add":
      const addedContact = await contactsService.addContact(name, email, phone);
      console.log(addedContact);
      return;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
