const { ObjectID } = require("mongodb");

class ContactService {
  constructor(client) {
    this.Contact = client.db().collection("contacts");
  }
  extractConactData(payload) {
    const contact = {
      name: payload.name,
      email: payload.email,
      address: payload.address,
      phone: payload.phone,
      favorite: payload.favorite,
    };
    Objects.keys(contact).forEach(
      (key) => contact[key] === undefined && delete contact[key]
    );
    return contact;
  }
  async create(payload) {
    const contact = this.extractConactData(payload);
    const result = await this.Contact.findOneAndUpdate(
      contact,
      { $set: { favorite: contact.favorite === true } },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }
}

module.exports = ContactService;

