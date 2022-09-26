import Storage from './Storage';
let storage: any;
if (typeof window !== 'undefined') {
  storage = new Storage(window.localStorage, '');
} else {
  storage = {};
}
export default storage;
