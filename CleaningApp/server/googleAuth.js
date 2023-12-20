const { User } = require("./models/models");
const passport = require("passport"),
  GoogleStrategy = require("passport-google-token").Strategy;
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID, //YOUR GOOGLE_CLIENT_ID
      clientSecret: process.env.CLIENT_SECRET, //YOUR GOOGLE_CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      const account = profile._json;
      const googleId = account.sub;
      try {
        const currentUser = await User.findOne({ where: { googleId } });
        let user = {};
        if (!currentUser) {
          result = await User.create({
            email: account.email,
            googleId: account.sub,
          });
          user = {
            id: result.id,
            email: result.email,
            role: result.role,
          };
        } else {
          user = {
            id: currentUser.id,
            email: currentUser.email,
            role: currentUser.role,
          };
        }
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});
