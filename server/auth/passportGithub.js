const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const { User } = require("../models/models");

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_URL}/api/user/auth/github/callback`,
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, cb) => {
            const defaultUser = {
                name: `${profile.name.givenName} ${profile.name.familyName}`,
                email: profile.email,
                googleId: profile.id,
            };

            const user = await User.findOrCreate({
                where: { googleId: profile.id },
                defaults: defaultUser,
            }).catch((err) => {
                console.log("Error signing upp", err);
                cb(err, null);
            });
            if (user && user[0]) return cb(null, user && user[0]);
        }
    )
);

passport.serializeUser((user, cb) => {
    console.log("Serializing user", user);
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    const user = await User.findOne({ where: { id } }).catch((err) => {
        console.log("Error deserializing", err);
        cb(err, null);
    });

    console.log("Deserialized user", user);
    if (user) cb(null, user);
});
