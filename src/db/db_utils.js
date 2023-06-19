
// Utility functions to interact with Firestore 

import { db } from './firebase-config';
import format from 'date-fns/format';
import { doc, collection, setDoc, getDoc, addDoc, getDocs, deleteDoc, updateDoc, writeBatch } from "firebase/firestore";
const stringHash = require("string-hash");

// Checks if username already exists returns true/false
export async function userExists(email) {
    const location = doc(db, "Registered_Users/", email);
    const userDoc = await getDoc(location);
    return userDoc.exists();
}

// Verify passwords for given username
export async function isPasswordCorrect(username, password) {
    const location = doc(db, "Registered_Users/", username);
    const userDoc = await getDoc(location);
    // if username already exists verify passwords else return false.
    if (userDoc.exists()) {
        // return true if passwords match else false
        const userData = userDoc.data();
        console.log("User exists !")
        return password === userData.Password
    } else {
        console.log("User does'nt exist !")
        return false;
    }
}



// Creates a new user in firestore
export async function registerUser(firstname, lastname, phone, email, password) {

    // Generate hash value for password
    const HashPassword = stringHash(password);

    const newUser = {
        Firstname: firstname,
        Lastname: lastname,
        Email: email,
        Phone: phone,
        Password: HashPassword,
        RegisteredOn: new Date()
    }

    // Path reference for the "Registered_Users/{email}" document
    const location = doc(db, "Registered_Users", email);

    try {
        // Insert userinfo 
        await setDoc(location, newUser);
        console.log("User Account Registered !")
        return true;
    } catch (error) {
        const errorMessage = error.message;
        console.log("Insert Error : ", errorMessage);
        return false;
    }

}


// Deletes an existing user email
export async function deleteUserAccount(email) {

    // Path reference for the "Registered_Users" collection
    const location = collection(db, "Registered_Users");

    // Path for the "Registered_Users/{email}" document
    const userRef = doc(location, email);

    try {
        // Delete the user account document
        await deleteDoc(userRef);

        console.log("User account deleted successfully");

        // Return true to indicate success
        return true;
    } catch (error) {
        console.error("Error deleting user account:", error);
        return false;
    }
}


// Changes the password for an existing email
export async function changeUserPassword(email, newPassword) {

    // Path for the "Registered_Users/{email}" document
    const userRef = doc(db, "Registered_Users", email);

    try {

        // Update the user account document with the new password
        await updateDoc(userRef, { Password: newPassword })
        console.log("Password changed successfully");
        return true;

    } catch (error) {
        console.error("Error changing password:", error);
        return false;
    }
}


// Fetches the document of the given user email
export async function getUserDocument(email) {

    // Path for the "Registered_Users/{email}" document
    const userRef = doc(db, "Registered_Users", email);

    try {
        // Get the document of the user
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            console.error("User not found");
            return null;
        }
    } catch (error) {
        console.error("Error getting user document:", error);
        return null;
    }
}


// Updates given fields for a registered user
export async function updateUserFields(username, fieldsToUpdate) {

    // Eg - fieldsToUpdate = { Firstname: "John", Lastname: "Doe" };

    const userRef = doc(db, "Registered_Users", username);

    try {
        await updateDoc(userRef, fieldsToUpdate);
        console.log("User fields updated successfully");
        return true;
    } catch (error) {
        console.error("Error updating user fields:", error);
        return false;
    }
}

//-----------------------------------------------------------------------------

// Get the total number of documents in a collection
export async function getTotalDocumentCount(collectionPath) {
    try {
        const querySnapshot = await getDocs(collection(db, collectionPath));
        const count = querySnapshot.size;
        console.log(`Total number of documents in ${collectionPath}: ${count}`);
        return count;
    } catch (error) {
        console.log('Error occurred while retrieving document count:', error);
        return 0;
    }
}


// Retrieve all documents from a collection
async function getAllDocumentsFromCollection(collectionName) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map((doc) => doc.data());
    return documents;
}


// Saves a single reported URL to database 
export async function reportURLtoDatabase(url, category, reportedby, urlSource, additional) {

    const reportedURL = {
        Url: url,
        Category: category,
        ReportedBy: reportedby,
        Source: urlSource,
        ReportedOn: new Date(),
        Additional: additional
    }

    // Get total number of reported Urls in database
    const count = await getTotalDocumentCount("Reported_Urls")

    // Path reference for the "Reported_Urls/count" document
    const location = doc(db, "Reported_Urls", String(count + 1));

    try {
        // Insert userinfo 
        await setDoc(location, reportedURL);
        console.log("URL reported sucessfully !")
        return true;
    } catch (error) {
        const errorMessage = error.message;
        console.log("Insert Error : ", errorMessage);
        return false;
    }


}


// Saves multiple reported URLs to database
export const reportBulkURLsToDatabase = async (urls, category, reportedby, additional) => {
    const batch = writeBatch(db);

    // Get total number of reported URLs in the database
    const count = await getTotalDocumentCount("Bulk_Reported_Urls");

    urls.forEach((url, index) => {
        const reportedURL = {
            Url: url,
            Category: category,
            ReportedBy: reportedby,
            ReportedOn: new Date(),
            Additional: additional
        };

        const location = doc(db, "Bulk_Reported_Urls", String(count + index + 1));
        batch.set(location, reportedURL);
    });

    try {
        await batch.commit();
        console.log("URLs reported successfully!");
        return true;
    } catch (error) {
        const errorMessage = error.message;
        console.log("Insert Error:", errorMessage);
        return false;
    }
}



// Get all reported documents from database
export async function getAllReportedUrls() {
    try {
        const reportedUrls = await getAllDocumentsFromCollection("Reported_Urls");
        const bulkReportedUrls = await getAllDocumentsFromCollection("Bulk_Reported_Urls");

        const allDocuments = [...reportedUrls, ...bulkReportedUrls];

        // Sort DESC order based on ReportedOn field
        allDocuments.sort((a, b) => {
            const reportedOnA = a.ReportedOn.toDate();
            const reportedOnB = b.ReportedOn.toDate();
            return reportedOnB - reportedOnA;
        });

        return allDocuments;
    } catch (error) {
        console.log("Error fetching reported URLs:", error);
        return [];
    }
}

