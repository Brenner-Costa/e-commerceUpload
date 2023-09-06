import { Mongoose } from "mongoose";

const orderSchema = new Mongoose.Schema(
    {
        user: { type: Mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        orderItems: [ 
            { //Informações do produto
                name: { type: String, required: true },
                quantity: { type: Number, required:  true },
                image: { type: String, required: true },
                price: { type: Number, required: true},
            },
        ],
        shippingAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },   
            location: {
                let: String,
                lng: String,
                address: String,
                name: String,
                vicinity: String,
                googleAddressId: String,   
            },   
        },
        PaymentMethod: { type: String, required: true },
        PaymentResult: { id: String, status: String, email_address: String },
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        isPaid: { type: Boolean, required: true, default: false },
        isDelivered: { type: Boolean, required: true, default: false },
        paidAt: { type: Date },
        deliveredAt: { type: Date },
    },
    {
        timestamps: true,
    }
);

const Order = Mongoose.models.Order || Mongoose.model('Order', orderSchema);
export default Order;