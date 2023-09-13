const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2");
const User = require("./models/User");

const GOOGLE_CLIENT_ID = "";
const GOOGLE_CLIENT_SECRET = "";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      User.findOneAndUpdate(
        { googleId: profile.id },
        {
          googleId: profile.id,
          displayName: profile.displayName,
          image: profile.photos[0].value,
        },
        { upsert: true, new: true },
        (err, user) => {
          return done(err, user);
        }
      );
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});
