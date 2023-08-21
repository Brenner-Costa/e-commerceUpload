import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        isFeatured: { type: Boolean, required: true },
        featuredImage: { type: String, required: true },
        price: { type: Number, required: true },
        brand: { type: String, required: true },
        countInStock: { type: Number, required: true },
        description: { type: String, required: true },
    }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
