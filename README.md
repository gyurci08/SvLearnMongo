1. Dependency:

   Insert mongodb as dependency, then installs it.

   Dotenv loads the .env eviroment file

   ```
   npm install --save mongodb
   npm install dotenv
   ```
2. File: .env

   Hidden informations which should not be committed on git

   ```.env
   MONGO_URL="mongodb://SvLearnMongoUser:SvLearnMongoP0ss@localhost:27017/SvLearnMongo"
   ```
3. Folder: src/db
4. Alias: svelte.config.js

   Creating alias for folder

   ```js
   kit: {
   		adapter: adapter(),
   		alias: {
   			'$db': "./src/db"
   		}
   	}
   ```
5. File: src/db/mongo.ts

   ```ts
   import {MongoClient} from "mongodb";
   import {MONGO_URL} from "$env/static/private";
   
   const client = new MongoClient(MONGO_URL);
   
   export function start_mongo(): Promise<MongoClient>{
       console.log("Starting Mongo connection...")
       return client.connect();
   }
   
   export default client.db()
   ```
6. File: src/hooks.server.ts

   ```ts
   import {start_mongo} from '$db/mongo';
   
   start_mongo().then(()=> { console.log("Mongo started."); })
   ```
7. File: src/db/sampleCollection.ts

   This is the db schema

   ```ts
   import db from "$db/mongo"
   
   // This is the database's table
   export const sampleCollection = db.collection('sampleCollection');
   ```
8. File: +page.server.ts

   This is ".server." because it needs to run only on the server! Server side!

   Projection is what should be seen in the query: 0 - false, 1 - true

   ```ts
   import {documents} from "$db/documents";
   import type {PageServerLoad} from "./$types";
   
   export const load: PageServerLoad = async function() {
       const data = await documents.find({}, {limit: 50, projection: {'_id': 0,'name': 1}}).toArray();
       console.log("Data: ", data);
       return { documents: data }
   }
   ```
9. File: +page.svelte

   Client side!

   ```html
   <script lang="ts">
       import type {PageData} from "./$types";
   
       export let data: PageData;
       $:({documents} = data);
   </script>
   
   
   
   <h1>Welcome to SvelteKit</h1>
   <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
   
   <section>
       {#each documents as document}
               <article>
                   <p>{document.name}</p>
               </article>
       {/each }
   </section>
   ```