import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  //colocar o default: false
  isFeatured: { type: Boolean, required: true, default: false},
  //tirar o required: true para a featuredImage
  featuredImage: { type: String},
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  //colocar o default: 0
  countInStock: { type: Number, required: true, default: 0 },
  description: { type: String, required: true },
});

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
