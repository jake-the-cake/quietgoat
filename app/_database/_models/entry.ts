import { Schema, model, models } from "mongoose";

const BlogEntrySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  story: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
		default: 'Me'
  }
}, {
	timestamps: true,
	versionKey: false
});

const BlogEntry = models.BlogEntry || model('BlogEntry', BlogEntrySchema);

export {
	BlogEntry
}
