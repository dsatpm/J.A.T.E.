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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const putText = await openDB('text', 1);
  const text = putText.transaction('text', 'readwrite');
  const storeText = text.objectStore('text');
  const req = storeText.put({ text: content });
  const res = await req; console.log('Data saved to DB: ', res);
}
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const getText = await openDB('text', 1);
  const text = getText.transaction('text', 'readonly');
  const storeText = text.objectStore('text');
  const req = storeText.getAll();
  const res = await req; console.log('Result: ', res);
  return res;
};


initdb();
