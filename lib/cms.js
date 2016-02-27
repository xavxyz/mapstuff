import Pins from './collections';

AdminConfig = {
  adminEmails: ['dan@guilliatt.com','xavier.cazalot@gmail.com','juditgreskovits@gmail.com','lukaskuhnhenn@mailbox.org'],
  
  collections: {

  Pins: {

  tableColumns: [
   { label: 'lat', name: 'lat' },
   { label: 'lng', name: 'lng' },
   { label: 'title', name: 'title' },
   { label: 'text', name: 'text' },
   { label: 'link', name: 'link' },
   { label: 'userid', name: 'userid' },
   ],

  showEditColumn: true, // Set to false to hide the edit button. True by default.
  showDelColumn: true, // Set to false to hide the edit button. True by default.
  showWidget: false,
  color: 'red'
    },

    // Users: {
    //   // collection options
    // }
   }
};