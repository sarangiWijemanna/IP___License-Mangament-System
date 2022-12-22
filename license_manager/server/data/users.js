import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },

  {
    name: "Admin",
    email: "admin_2@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Admin",
    email: "bhanusarangir@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  }
  
];

export default users;
