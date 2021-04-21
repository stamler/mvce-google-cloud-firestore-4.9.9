const admin = require("firebase-admin");
const mocha = require("mocha");
const assert = require("chai").assert;

// Create a blank Firestore database with open rules (test mode) and
// download the serviceAccountKey.json
const serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

describe("A failure in the @google-cloud/firestore SDK", () => {
  const random = Math.random().toString(6);
  const date = new Date(1618923370001);

  it("works when using @google-cloud/firestore SDK version 4.9.8 but not 4.9.9", async () => {
    const db = admin.firestore();
    for(let i = 0; i < 3; i++) {
      await db.collection("CollectionName" + random).add({ date })
    }
    const querySnapshot = await db
      .collection("CollectionName" + random)
      .where("date", "==", date)
      .get();

    assert.equal(querySnapshot.size, 3);
  });
});
