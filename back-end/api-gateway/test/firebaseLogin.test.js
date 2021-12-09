var assert = require('assert');
const Firebase_layer = require('../src/frameworks/firebase');


// describe('Array', function() {

//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });

// });


describe('Firebase', function() {

  it('login', function() {
    // assert.equal([1, 2, 3].indexOf(4), -1);

    let credential = { username: "test@gmail.com", password: "" };

    Firebase_layer.app.auth().signInWithEmailAndPassword(credential.username, credential.password)
      .then((user) => {

        console.log(user)
    });

  });
});
