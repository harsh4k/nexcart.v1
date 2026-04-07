import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // MongoDB Connection
  const MONGODB_URI = process.env.MONGODB_URI;
  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      });
      console.log('Connected to MongoDB');
      
      // Seed data if empty
      const count = await Product.countDocuments();
      if (count === 0) {
        console.log('Seeding database...');
        const initialProducts = [
          {
            name: "Nex One Headphones",
            price: 299,
            category: "Audio",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000",
            description: "Immersive sound, redefined. Experience every note with crystal clarity."
          },
          {
            name: "Lumina Smart Watch",
            price: 199,
            category: "Wearables",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000",
            description: "Your life, synced. Track your health and stay connected effortlessly."
          },
          {
            name: "Nebula Glass Speaker",
            price: 450,
            category: "Home",
            image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&q=80&w=1000",
            description: "A piece of art that sounds as good as it looks. 360-degree audio."
          },
          {
            name: "Aura Smart Lamp",
            price: 129,
            category: "Home",
            image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=1000",
            description: "Adaptive lighting that mimics the natural rhythm of the sun."
          },
          {
            name: "Zenith Earbuds",
            price: 159,
            category: "Audio",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=1000",
            description: "Ultra-compact, ultra-powerful. The perfect companion for your daily commute."
          },
          {
            name: "Titan Fitness Tracker",
            price: 89,
            category: "Wearables",
            image: "https://images.unsplash.com/photo-1557166983-5939644443a0?auto=format&fit=crop&q=80&w=1000",
            description: "Rugged, reliable, and ready for any challenge. Your ultimate fitness partner."
          }
        ];
        await Product.insertMany(initialProducts as any);
        console.log('Database seeded successfully');
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'MongooseServerSelectionError') {
        console.error('MongoDB Connection Error: IP not whitelisted or cluster unreachable.');
        console.error('Action Required: Go to MongoDB Atlas -> Network Access -> Add IP Address -> Allow Access From Anywhere (0.0.0.0/0) for testing.');
      } else {
        console.error('MongoDB connection error:', err);
      }
    }
  } else {
    console.warn('MONGODB_URI not found. Falling back to mock data.');
  }

  app.use(cors());
  app.use(express.json());

  // Mock data for fallback
  const mockProducts = [
    {
      id: 1,
      name: "Nex One Headphones",
      price: 299,
      category: "Audio",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000",
      description: "Immersive sound, redefined. Experience every note with crystal clarity."
    },
    {
      id: 2,
      name: "Lumina Smart Watch",
      price: 199,
      category: "Wearables",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000",
      description: "Your life, synced. Track your health and stay connected effortlessly."
    },
    {
      id: 3,
      name: "Nebula Glass Speaker",
      price: 450,
      category: "Home",
      image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&q=80&w=1000",
      description: "A piece of art that sounds as good as it looks. 360-degree audio."
    },
    {
      id: 4,
      name: "Aura Smart Lamp",
      price: 129,
      category: "Home",
      image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=1000",
      description: "Adaptive lighting that mimics the natural rhythm of the sun."
    },
    {
      id: 5,
      name: "Zenith Earbuds",
      price: 159,
      category: "Audio",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=1000",
      description: "Ultra-compact, ultra-powerful. The perfect companion for your daily commute."
    },
    {
      id: 6,
      name: "Titan Fitness Tracker",
      price: 89,
      category: "Wearables",
      image: "https://images.unsplash.com/photo-1557166983-5939644443a0?auto=format&fit=crop&q=80&w=1000",
      description: "Rugged, reliable, and ready for any challenge. Your ultimate fitness partner."
    }
  ];

  const categories = ["Audio", "Wearables", "Home", "Accessories"];

  // API Routes
  app.get('/api/products', async (req, res) => {
    console.log('GET /api/products request received');
    try {
      if (mongoose.connection.readyState === 1) {
        const products = await Product.find();
        return res.json(products);
      }
      res.json(mockProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      res.json(mockProducts);
    }
  });

  app.get('/api/categories', async (req, res) => {
    try {
      if (mongoose.connection.readyState === 1) {
        const cats = await (Product as any).distinct('category');
        return res.json(cats && cats.length > 0 ? cats : categories);
      }
      res.json(categories);
    } catch (err) {
      res.json(categories);
    }
  });

  app.post('/api/checkout', (req, res) => {
    const { items, total } = req.body;
    console.log('Processing order:', { items, total });
    // Simulate successful order
    res.status(201).json({ message: 'Order placed successfully', orderId: Math.random().toString(36).substr(2, 9) });
  });

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  return app;
}

const appPromise = startServer();
export default async (req: any, res: any) => {
  const app = await appPromise;
  return app(req, res);
};
