import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database DONE
export const putDb = async (content) => {
  const jateDB = await openDB('jate',1);
  const result = await jateDB.transaction('jate','readwrite').objectStore('jate').add({text: content});
  console.log('data saved to the database',result);
};

// TODO: Add logic for a method that gets all the content from the database DONE
export const getDb = async () => {
  const jateDB = await openDB('jate',1);
  const result = await jateDB.transaction('jate','readonly').objectStore('jate').getAll();
  console.log('result:',result);
  return result;
};

initdb();
