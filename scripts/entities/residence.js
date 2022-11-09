export default class Residence {
  constructor(name, owner, price, amount, amountLeft, image, tenants) {
    this.name = name;
    this.owner = owner;
    this.price = price;
    this.amount = amount;
    this.amountLeft = amountLeft;
    this.image = image;
    this.tenants = tenants;
  }

  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }

  getOwner() {
    return this.owner;
  }
  setOwner(owner) {
    this.owner = owner;
  }

  getPrice() {
    return this.price;
  }
  setPrice(price) {
    this.price = price;
  }

  getAmount() {
    return this.amount;
  }
  setAmount(amount) {
    this.amount = amount;
  }

  getAmountLeft() {
    return this.amountLeft;
  }
  setAmountLeft(amountLeft) {
    this.amountLeft = amountLeft;
  }

  getImage() {
    return this.image;
  }
  setImage(image) {
    this.image = image;
  }

  getTenants() {
    return this.tenants;
  }
  setTenants(tenants) {
    this.tenants = tenants;
  }
}
