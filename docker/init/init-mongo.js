// Create a new database and switch to it
db = db.getSiblingDB('SvLearnMongo');

// Create a new collection and insert documents
db.documents.insert([
    { name: 'Document 1' },
    { name: 'Document 2' },
    { name: 'Document 3' }
]);

// Create a user with read and write privileges for the database
db.createUser({
    user: 'SvLearnMongoUser',
    pwd: 'SvLearnMongoP0ss',
    roles: [
        { role: 'readWrite', db: 'SvLearnMongo' }
    ]
});