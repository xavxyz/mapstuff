Template.layout.onCreated(function() {
	this.autorun(() => {
		this.subscribe('Pins.all');
	});
});

// jquery stuff goes there: Template.blabla.onRendered(...) <=> $(document).ready(...)
Template.layout.onRendered(function () {
	this.sidebarClosed = false;
	this.overlay = $('.overlay');
});

Template.layout.events({
	'click [rel=sidebar-action]' (event, instance) {
		if (instance.sidebarClosed == true) {
			instance.overlay.hide();
			instance.trigger.removeClass('is-open');
			instance.trigger.addClass('is-closed');
			instance.sidebarClosed = false;
		} else {
			instance.overlay.show();
			instance.trigger.removeClass('is-closed');
			instance.trigger.addClass('is-open');
			instance.sidebarClosed = true;
		}
	},
	'click [data-toggle=offcanvas]' (event, instance) {
		$('#wrapper').toggleClass('toggled');
	}
});

Template.layout.helpers({
	pins () {
		return Pins.find({});
	}
});
