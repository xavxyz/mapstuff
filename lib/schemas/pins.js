export const pinSchema = new SimpleSchema({
	lat: {
		type: Number,
		decimal: true
	},
	lng: {
		type: Number,
		decimal: true
	},
	content: {
		type: String
	}
});