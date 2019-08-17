const express = require('express');
const User = require('../model/user.model');
const bcrypt = require('bcrypt-nodejs');
//const _filter = { 'pwd': 0, '__v': 0 };

module.exports = function (router) {
  router.post('/login', (req, res) => {
    const { input, pwd } = req.body;
    User.findOne({ '$or': [{ username: input }, { email: input }] })
      .exec((err, doc) => {
        if (err) console.log(err)
        if (!doc) {
          res.send({
            code: 1,
            msg: 'cannot authenticate this user'
          })
        } else if (!doc.comparePassword(pwd)) {
          res.send({
            code: 1,
            msg: 'username / password error'
          })
        } else {
          console.log(doc)
          res.cookie('userid', doc._id)
          res.json({
            code: 0,
            msg: 'login success!',
            data: doc
          })
        }
      })
  });

  /**
   * todo: finish register
   */
  router.post('/register', (req, res) => {
    // confirm: "test"
// email: "test@test.test"
//displayName: 'test test'
// firstName: "test"
// gender: "male"
// lastName: "test"
// pwd: "test"
// phone: "3523280696"
// username: "test"
// wechat: "test"
    let user = new User();
    const { email, firstName, lastName, pwd, confirm, gender, phone, wechatId, username, displayName } = req.body;
    user.username = username;
    user.pwd = pwd;
    user.email = email;
    user.phone = phone;
    user.firstName = firstName;
    user.lastName = lastName;
    user.displayName = displayName;
    user.wechatId = wechatId;
    user.gender = gender;

    user.save((err, doc) => {
      if(err) {
        console.log(err);
        let errorMsg = err.errmsg;
        if(err.code === 11000) {
          errorMsg = 'Username of email already exists!';
        }
        return res.json({
          code: 1,
          msg: errorMsg
        });
      } else {
        console.log(`user ${username} saved suc`);
        const {_id} = doc;
        res.cookie('userId', _id);
        return res.json({
          code: 0,
          data: {
            username,
            displayName,
            gender,
            wechatId,
            phone,
            email
          }
        })
      }
    })
  })


  return router;
}