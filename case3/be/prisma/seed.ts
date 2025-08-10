import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const testimonialsData = [
        {
            text: "The best fried tofu I've ever tasted! Super crispy and delicious. Highly recommended.",
            name: "Alex",
        },
        {
            text: "Love the spicy tofu bites! The flavor is amazing and always fresh.",
            name: "Siti",
        },
        {
            text: "Perfect snack for the whole family. Will order again!",
            name: "Budi",
        },
    ];

    const productsData = [
        {
            img: "/type-1.png",
            title: "Classic Crispy Tofu",
            description:
                "The original favorite—golden, crunchy, and perfectly seasoned for a timeless taste.",
            price: 15000,
        },
        {
            img: "/type-2.png",
            title: "Spicy Tofu Bites",
            description:
                "Crispy tofu with a fiery kick! Perfect for spice lovers who want extra heat.",
            price: 17000,
        },
        {
            img: "/type-3.png",
            title: "Garlic Herb Tofu",
            description:
                "Infused with aromatic garlic and herbs, this tofu is bursting with savory flavors.",
            price: 18000,
        },
    ];

    for (const [index, testimonial] of testimonialsData.entries()) {
        await prisma.testimonial.upsert({
            where: { id: index + 1 }, 
            update: {},
            create: { id: index + 1, ...testimonial },
        });
    }

    for (const product of productsData) {
        await prisma.product.upsert({
            where: { title: product.title }, 
            update: {},
            create: product,
        });
    }

    const username = "admin";
    const plainPassword = "admin";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await prisma.user.upsert({
        where: { username },
        update: {},
        create: {
            username,
            password: hashedPassword,
        },
    });

    console.log("Seeded database with testimonials, products, and admin user.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
