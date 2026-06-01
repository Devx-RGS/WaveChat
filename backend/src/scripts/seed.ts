import mongoose from "mongoose";
import { User } from "../models/User";

const SEED_USERS = [
  {
    clerkId: "seed_user_1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://api.dicebear.com/10.x/bottts/jpg",
  },
  {
    clerkId: "seed_user_2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://api.dicebear.com/10.x/lorelei/svg",
  },
  {
    clerkId: "seed_user_3",
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: "https://api.dicebear.com/10.x/pixel-art/svg?seed=John&hairVariant=short01,short02,short03,short04,short05",
  },
];

async function seed() {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/chat-app";
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");

    // Delete existing seed users to avoid duplicate key errors
    // Delete all existing seed users (even leftover ones from previous runs)
    await User.deleteMany({ clerkId: { $regex: /^seed_user_/ } });
    console.log("🗑️ Cleared all existing seed users");
    console.log("🗑️ Cleared existing seed users");

    // Insert seed users
    const users = await User.insertMany(SEED_USERS);
    console.log(`🌱 Seeded ${users.length} users:`);
    users.forEach((user) => {
      console.log(`   - ${user.name} (${user.email})`);
    });

    await mongoose.disconnect();
    console.log("✅ Done!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
}

seed();