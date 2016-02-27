export default pinSchema = new SimpleSchema({
	lng: {
		type: Number,
		decimal: true
	},
	lat: {
		type: Number,
		decimal: true
	},
	type: {
		type: String,
		defaultValue: 'text'
	},
	title: {
		type: String,
		optional: true
	},
	text: {
		type: String,
		optional: true
	},
	link: {
		type: String,
		optional: true
	},
	userId: {
		type: String
	}
});