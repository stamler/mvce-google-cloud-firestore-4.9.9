# mvce-google-cloud-firestore-4.9.9

@google-cloud/firestore v4.9.9 introduces an bug in which queries that do equality comparissons against timestamps fail.

1. clone the repo
2. cd into the root and run `npm install`
3. create a test firebase project and firestore database and copy serviceAccountKey.json to the root of the cloned repo
4. `npm run test`
5. The test passes
6. `npm i @google-cloud/firestore@4.9.9`
7. `npm run test`
8. The test fails
