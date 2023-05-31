    function sayHello() {
  const admin=require('firebase-admin')
    const serviceAccount =require('./serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
//     const collectionRef = db.collection('Ambulance');
//   // Fetch documents from the collection
//   collectionRef.get()
//     .then((querySnapshot) => {
//       const data = [];
//       querySnapshot.forEach((doc) => {
//        console.log(doc.data());
//       });
//     })
//     .catch((error) => {
//       console.error('Error fetching collection data:', error);
//       res.status(500).json({ error: 'Failed to fetch collection data' });
//     });
const usersCollection = db.collection('Ambulance');

// Create a new document with an automatically generated ID
usersCollection.add({
  name: 'John Doe',
  age: 25,
  email: 'john.doe@example.com'
})
  .then((docRef) => {
    console.log('Document written with ID:', docRef.id);
  })
  .catch((error) => {
    console.error('Error adding document:', error);
  });
}

module.exports = { sayHello };