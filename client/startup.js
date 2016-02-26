Meteor.startup(() => {
	Mapbox.load({
    plugins: [
      "turf"
    ]
  });
});
