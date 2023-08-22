import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Brenner Costa",
      email: "costabrenner1@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
  ],
  products: [
    {
      name: 'Cafézinho',
      slug: 'CafezinhoSlug',
      category: 'Bebida',
      image: '/image 4.png',
      isFeatured: true,
      featuredImage: '/image 4.png',
      price: 80,
      brand: 'Starbucks',
      countInStock: 10,
      description: 'Cafézinho da Nike, muito bom',
    },
  ],
};

export default data;
