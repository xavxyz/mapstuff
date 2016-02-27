export default pinSchema = new SimpleSchema({
	lat: {
		type: Number,
		decimal: true
	},
	lng: {
		type: Number,
		decimal: true
	},
	content: {
		type: String,
		optional: true
	},
	title: {
		type: String,
		optional: true
	},
	type: {
		type: String,
		defaultValue: 'text'
	}
});