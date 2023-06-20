    function sayHello(amount,fname,lname,email,reference) {
  const admin=require('firebase-admin')
    const serviceAccount =require('./serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const updateMembership=db.collection('User');
const usersCollection = db.collection('Payment');
// // Create a new document with an automatically generated ID
usersCollection.add({
  amount: amount,
  first_name: fname,
  last_name: lname,
  reference: reference,
  email: email
})
  .then((docRef) => {
    console.log('Document written with ID:', docRef.id);
  })
  .catch((error) => {
    console.error('Error adding document:', error);
  });
  updateMembership.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    if (doc.data().Email === email) {
      updateMembership.doc(doc.id).update({ membership: 'premium' })
        .then(() => {
          console.log('Membership successfully updated');
        })
        .catch((error) => {
          console.error('Error updating data: ', error);
        });
    }
  });
});
}

module.exports = { sayHello };