import firebase from 'firebase';
import conferences from './conferences';

export function saveEventsToFb() {
  console.log('yo');
  const eventsRef = firebase.database().ref('/events');
  conferences.forEach((conf) => eventsRef.push(conf));
}

window.runMigration = function() {
  firebase
    .database()
    .ref('/events')
    .once('value', (data) => {
      console.log('data', data);
      if (!data.val()) {
        saveEventsToFb();
      }
    });
};
