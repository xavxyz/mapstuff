import Pins from './collections';

AdminConfig = {
  adminEmails: ['dan@guilliatt.com','xavier.cazalot@gmail.com','juditgreskovits@gmail.com','lukaskuhnhenn@mailbox.org'],
  name: 'Mapstuff Admin',
  dashboard: {
    homeUrl: '/',
    skin: 'black'
  },
  collections: {
    Pins: {
      icon: 'map-marker',
      tableColumns: [
        { label: 'title', name: 'title' },
        { label: 'text', name: 'text' },
        { label: 'link', name: 'link' },
        { label: 'userId', name: 'userId' },
        { label: 'lat', name: 'lat' },
        { label: 'lng', name: 'lng' }
      ],
      showEditColumn: true, // Set to false to hide the edit button. True by default.
      showDelColumn: true, // Set to false to hide the edit button. True by default.
      showWidget: false,
      color: 'red'
    }
  }
};