import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1n, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
  const txtEditorDB = await openDB('jate', 1);
  const transVar = txtEditorDB.transaction('jate', 'readwrite');
  const storeVar = transVar.objectStore('jate');
  const request = storeVar.put({ id: 1, value: content });

  const result = await request;
  console.log('Data saved to database', result.value);
};


export const getDb = async () => {
  const txtEditorDB = await openDB('jate', 'readonly');
  const transVar = txtEditorDB.transaction('jate', 'readonly'); 
  const storeVar = transVar.objectStore('jate');
  const request = storeVar.get(1);
  const result = await request;
  result
    ? console.log('Data retrieved from the database', result.value)
    : console.log('Data not found in the database');
};

initdb();