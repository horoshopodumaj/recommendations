const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const { User } = require("../models/models");

passport.use(
    new TwitterStrategy(
        {
            consumerKey: process.env.TWITTER_CLIENT_ID,
            consumerSecret: process.env.TWITTER_CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_URL}/api/user/auth/twitter/callback`,
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, cb) => {
            const defaultUser = {
                name: `${profile.username}`,
                //email: profile.email,
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
