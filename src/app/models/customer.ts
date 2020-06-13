export class Customer {

  constructor(_id = '', name = '', phone = '', message = '') {
      this._id = _id;
      this.name = name;
      this.phone = phone;
      this.message = message;

  }

  _id: string;
  name: string;
  phone: string;
  message: string;

}
