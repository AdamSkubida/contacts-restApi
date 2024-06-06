import fs from "fs/promises";
import path, { join } from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join(process.cwd(), "./models/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return console.log("Error listing contacts:", error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const allContacts = JSON.parse(data);

    return allContacts.find((contact) => contact.id === contactId);
  } catch (error) {
    return console.log("Error finding contact:", error);
  }
};

const removeContact = async (contactsId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const allContacts = JSON.parse(data);
    const filteredContacts = allContacts.filter(
      (contact) => contact.id !== contactsId
    );

    if (filteredContacts.length === allContacts.length) {
      return console.log("Contact doesn't exist");
    }

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    console.log("Contact removed successfully");
  } catch (error) {
    console.log("Error removing contact:", error);
  }
};

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const allContacts = JSON.parse(data);

    const newContact = { id: nanoid(), ...body };
    allContacts.push(newContact);

    return await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  } catch (error) {
    return console.log("Error adding contact:", error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const allContacts = JSON.parse(data);

    const findContactIndex = allContacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (findContactIndex === -1) {
      console.log("Contact doesn't exist");
      return false;
    }

    allContacts[findContactIndex].name = body.name;
    allContacts[findContactIndex].email = body.email;
    allContacts[findContactIndex].phone = body.phone;

    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return allContacts[findContactIndex];
  } catch (error) {
    console.log("Error updating contact:", error);
    return false;
  }
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
