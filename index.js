import { program } from "commander";
import * as contactService from "./contacts.js";

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const contactsList = await contactService.listContacts();
        return console.log(contactsList);
      case "get":
        const oneContact = await contactService.getContactById(id);
        return console.log(oneContact);

      case "add":
        const addedContact = await contactService.addContact({
          name,
          email,
          phone,
        });
        return console.log(addedContact);

      case "remove":
        const deleteContact = await contactService.removeContact(id);
        return console.log(deleteContact);

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);
