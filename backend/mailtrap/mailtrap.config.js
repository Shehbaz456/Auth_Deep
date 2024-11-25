import dotenv from "dotenv";
import path from "path";

import { fileURLToPath } from "url"; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
import { MailtrapClient } from "mailtrap";
// Load .env file
// console.log("Env Loaded:", process.env.MAILTRAP_TOKEN);


export const mailtrpClient = new MailtrapClient({ token: process.env.MAILTRAP_TOKEN });

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Shehbaz khan",
};

// email: "hello@demomailtrap.com",
