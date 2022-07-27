const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!(username && password))
    return res
      .status(400)
      .json({ message: "Username and Password are required" });
  const foundUser = usersDB.users.find(
    (person) => person.username === username
  );
  if (!foundUser)
    return res.sendStatus(401).json({ message: "Unauthorized User" });

  //evaluate password using bcrypt if username was found
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    //THIS IS WHERE WE SEND A JWT FOR PROTECTED ROUTES IN OUR API
    return res.json({ success: `User ${username} is logged in!` });
  } else {
    return res.sendStatus(401).json({ message: "Invalid Password" });
  }
};

module.exports = { handleLogin };
