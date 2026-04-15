import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import KambazRoutes from "./Kambaz/index.js";

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.CLIENT_URL,
        "http://localhost:3000",
      ];
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.SERVER_ENV === "production" ? "none" : "lax",
      secure: process.env.SERVER_ENV === "production",
    },
  })
);

Lab5(app);
Hello(app);
KambazRoutes(app);

app.listen(process.env.PORT || 4000);
