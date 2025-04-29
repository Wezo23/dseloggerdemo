const { MongoClient } = require('mongodb');

// URL-encode the password containing '@'
const uri = "mongodb+srv://dsteam:Wezo%40123@cluster0.wl6kg82.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function main() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Connection error:", error);
    } finally {
        await client.close();
    }
}

main();