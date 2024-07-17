const mongoose = require('mongoose');
const slugify = require('slugify');

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Blog")
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define the schema
const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  moreinfo: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
});

// Middleware to generate slug before validation
ProductSchema.pre('validate', function(next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// Create the model
const Product = mongoose.model('BlogDetails', ProductSchema);

module.exports = Product;
