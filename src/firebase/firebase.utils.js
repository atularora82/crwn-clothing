import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBj3Pum1ErQ2yKKqrTerHmBHOEP3WqSSQM",
    authDomain: "crwn-db-942a6.firebaseapp.com",
    databaseURL: "https://crwn-db-942a6.firebaseio.com",
    projectId: "crwn-db-942a6",
    storageBucket: "crwn-db-942a6.appspot.com",
    messagingSenderId: "617852298938",
    appId: "1:617852298938:web:83c7f7df0ecb741ce60483",
    measurementId: "G-L8E1MXP1C0"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if(!snapshot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        }catch(error){
            console.log('error creating user', error.message);
        }
        
    }

    return userRef

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default provider;



