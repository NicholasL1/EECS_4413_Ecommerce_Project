class User {
  constructor(
    user_id,
    card_id,
    email,
    password,
    first_name,
    last_name,
    role,
    address
  ) {
    this.user_id = user_id;
    this.card_id = card_id;
    this.email = email;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.address = address;
    this.role = role;
  }
}
