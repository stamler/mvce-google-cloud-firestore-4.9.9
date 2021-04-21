const admin = require("firebase-admin");
const mocha = require("mocha");
const assert = require("chai").assert;

// Create a blank Firestore database with open rules (test mode) and
// download the serviceAccountKey.json
const serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

describe("A failure in the @google-cloud/firestore SDK", () => {

  const dateWorks = new Date(1618923370000);
  const dateFails = new Date(1618923370001);

  it("works for some dates when using @google-cloud/firestore SDK version 4.9.9", async () => {
    const db = admin.firestore();
    for(let i = 0; i < 3; i++) {
      await db.collection("CollectionName").add({ dateWorks })
    }
    const querySnapshot = await db
      .collection("CollectionName")
      .where("date", "==", dateWorks)
      .get();

    assert.equal(querySnapshot.size, 3);
  });
  it("fails for other dates when using @google-cloud/firestore SDK version 4.9.9", async () => {
    const db = admin.firestore();
    for(let i = 0; i < 3; i++) {
      await db.collection("CollectionName").add({ dateFails })
    }
    const querySnapshot = await db
      .collection("CollectionName")
      .where("date", "==", dateFails)
      .get();

    assert.equal(querySnapshot.size === 3);
  });
});
