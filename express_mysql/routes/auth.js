const express = require('express');
const router = express.Router();
const passport = require('passport');
const {Strategy: KakaoStrategy} = require('passport-kakao');
const User = require('../models/user');
var user_id;
var kakao_profile;
passport.use('kakao', new KakaoStrategy({
    clientID: '67832232df37fcd4aaa11db479e6027e',
    callbackURL: '/auth/kakao/callback',     // 위에서 설정한 Redirect URI
  }, async (accessToken, refreshToken, profile, done) => {
    //console.log(profile);
    kakao_profile = profile;
    console.log('kakao profile', profile);
    try {
        console.log("exUser check222")
        const exUser = await User.findOne({
           // 카카오 플랫폼에서 로그인 했고 & snsId필드에 카카오 아이디가 일치할경우
           where: { kakao_id: profile.id},
        });
        
        console.log(exUser)
        // 이미 가입된 카카오 프로필이면 성공
        if (exUser) {
            user_id = exUser.id;
           done(null, exUser); // 로그인 인증 완료
        } else {
           // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
           const newUser = await User.create({
              name: profile.username,
              kakao_id: profile.id,
           });
           user_id = newUser.id;
           done(null, newUser); // 회원가입하고 로그인 인증 완료
           
           console.log("exUser check")
           
           console.log("newUser Id: "+user_id);
        }
     } catch (error) {
        console.error(error);
        done(error);
     }
    }
))
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
router.get('/kakao',
   passport.authenticate('kakao')
);

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
//   res.sendStatus(user_id);
   res.redirect(`/user/${user_id}`)
});

module.exports = router;