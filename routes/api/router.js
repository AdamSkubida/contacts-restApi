import express from "express";
import Joi from "joi";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../../models/contact.js";

const router = express.Router();

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).send({ contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await getContactById(contactId);

  if (contact) {
    res.status(200).send({ contact });
  } else {
    res.status(404).send({ message: "Not found" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const deleteContact = removeContact(req.params.contactId);

  if (deleteContact) {
    res.status(200).send({ message: "Contact has been removed" });
  } else {
    res.status(404).json({ message: "Contact does not exist" });
  }
});

router.post("/", async (req, res, next) => {
  const validateResults = schema.validate(req.body);
  if (validateResults) {
    await addContact(req.body);
    res
      .status(201)
      .json({ message: `${req.body.name} has been added to contact` });
  } else {
    res.status(400).json({ message: "Missing required field" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const validateResults = schema.validate(req.body);
  if (validateResults) {
    await updateContact(req.params.contactId, req.body);
    res.status(200).send({ message: "Contact has been updated" });
  } else {
    res.status(400).send({ message: "Not found" });
  }
});

export { router };
