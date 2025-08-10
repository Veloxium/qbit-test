import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const router = express.Router();

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

app.use(cors());
app.use(express.json());

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access token missing" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        (req as any).user = user;
        next();
    });
}

router.get("/", async (req: Request, res: Response) => {
    res.send("Welcome to the API Crispy Bite!");
});

router.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: "1h" });

        res.json({
            message: "Login successful",
            token,
            user: { username: user.username },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/products", async (req: Request, res: Response) => {
    const products = await prisma.product.findMany();
    res.json(products);
});

router.post("/products", authenticateToken, async (req: Request, res: Response) => {
    const { img, title, description, price } = req.body;
    try {
        const parsedPrice = parseInt(price, 10);
        if (isNaN(parsedPrice)) {
            return res.status(400).json({ message: "Price must be an integer" });
        }
        const product = await prisma.product.create({
            data: { img, title, description, price: parsedPrice },
        });
        res.status(201).json(product);
    } catch {
        res.status(400).json({ message: "Failed to create product" });
    }
});

router.put("/products/:id", authenticateToken, async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { img, title, description, price } = req.body;
    try {
        const parsedPrice = parseInt(price, 10);
        if (isNaN(parsedPrice)) {
            return res.status(400).json({ message: "Price must be an integer" });
        }
        const product = await prisma.product.update({
            where: { id },
            data: { img, title, description, price: parsedPrice },
        });
        res.json(product);
    } catch {
        res.status(404).json({ message: "Product not found" });
    }
});

router.delete("/products/:id", authenticateToken, async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        await prisma.product.delete({ where: { id } });
        res.json({ message: "Product deleted successfully" });
    } catch {
        res.status(404).json({ message: "Product not found" });
    }
});


router.get("/testimonials", async (req: Request, res: Response) => {
    const testimonials = await prisma.testimonial.findMany({
        orderBy: { createdAt: "desc" },
    });
    res.json(testimonials);
});

router.post(
    "/testimonials",
    authenticateToken,
    async (req: Request, res: Response) => {
        const { text, name } = req.body;
        try {
            const testimonial = await prisma.testimonial.create({
                data: { text, name },
            });
            res.status(201).json(testimonial);
        } catch {
            res.status(400).json({ message: "Failed to create testimonial" });
        }
    }
);

router.put(
    "/testimonials/:id",
    authenticateToken,
    async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const { text, name } = req.body;
        try {
            const testimonial = await prisma.testimonial.update({
                where: { id },
                data: { text, name },
            });
            res.json(testimonial);
        } catch {
            res.status(404).json({ message: "Testimonial not found" });
        }
    }
);

router.delete("/testimonials/:id", authenticateToken, async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        await prisma.testimonial.delete({ where: { id } });
        res.json({ message: "Testimonial deleted successfully" });
    } catch {
        res.status(404).json({ message: "Testimonial not found" });
    }
});


app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/api`);
});
