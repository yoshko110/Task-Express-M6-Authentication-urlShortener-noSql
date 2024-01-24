const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const localStrategy = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "passeord",
  },
  async (username, password, done) => {
    try {
      const user = await user.findOne({ username, password });
      if (!user) {
        return done({ message: "username or password is wrong" });
      }
      const checkPass = await bcrypt.compare(password, user.password);
      if (!checkPass) {
        return done({ message: "username or password is wrong" });
      }
      return done(null, user); // req.user = user
    } catch (error) {
      done(error);
    }
  }
);

module.exports = localStrategy;
