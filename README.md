# MatterForce India

**An Empathetic Engineering Partner.** Adaptive hardware intelligence that understands context, budget, and intent.

## 📖 About The Project

MatterForce India is a comprehensive platform designed to bridge the gap between hardware engineering, DIY electronics, and artificial intelligence. It serves as an "empathetic engineering partner," meaning it doesn't just sell components; it understands the builder's context—whether they are a student on a tight budget, a hobbyist exploring new ideas, or a professional prototyping industrial solutions.

The platform integrates an AI Lab and Simulation tools to help users design, simulate, and procure the right hardware for their specific needs.

## 🎯 The Problem It Solves

Hardware engineering and prototyping can be daunting:
1. **Information Overload:** Finding the right components that are compatible with each other is difficult.
2. **Budget Constraints:** Students and hobbyists often struggle to find cost-effective alternatives for expensive industrial-grade sensors and microcontrollers.
3. **Lack of Guidance:** Beginners lack a mentor to guide them through the hardware selection and circuit design process.
4. **Fragmented Workflow:** Designing, simulating, and buying components usually requires jumping between multiple disjointed platforms.

## 💡 The Solution

MatterForce India provides a unified ecosystem that solves these challenges:
- **Context-Aware Recommendations:** The platform adapts to the user's profile (e.g., Student vs. Professional) to recommend components that fit their budget and technical requirements.
- **AI Lab Integration:** Powered by Gemini AI, the platform assists users in brainstorming, troubleshooting, and designing their hardware projects.
- **Veo Simulation:** Allows users to visualize and simulate their hardware setups before making a purchase, reducing errors and wasted resources.
- **Integrated Marketplace & Supply Chain:** A seamless transition from ideation to procurement, with a built-in cart and order tracking system.

## ✨ Key Features

- **Personalized User Profiles:** Tailored experiences based on user expertise and goals.
- **AI-Powered Engineering Assistant:** Get instant help with circuit design, component selection, and coding.
- **Hardware Marketplace:** Browse and purchase microcontrollers, sensors, actuators, and DIY kits.
- **Order Management:** Track supply chain activity, view manifests, and manage deliveries.
- **Modern UI/UX:** A sleek, dark-themed, industrial-inspired interface built with React and Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS
- **Icons:** Lucide React
- **AI Integration:** Google Gen AI SDK (`@google/genai`)
- **Build Tool:** Vite

## 🚀 Getting Started & Running in VS Code

If you are viewing this project in Google AI Studio and want to run it locally on your own machine using VS Code, follow these steps:

### 1. Export the Project
1. In Google AI Studio, click the **Export** button (usually located in the top right or settings menu).
2. Choose **Download as ZIP** (or export to GitHub and clone it).
3. Extract the downloaded ZIP file to a folder on your computer.

### 2. Open in VS Code
1. Open **Visual Studio Code**.
2. Go to `File` > `Open Folder...` and select the extracted folder.
3. Open a new terminal in VS Code (`Terminal` > `New Terminal` or press `` Ctrl+` ``).

### 3. Install Dependencies
In the VS Code terminal, run the following command to install all required packages:
```bash
npm install
```

### 4. Setup Environment Variables
1. Create a new file named `.env` in the root of the project.
2. Add your OpenAI (ChatGPT) API key to this file:
   ```env
   OPENAI_API_KEY=your_chatgpt_api_key_here
   ```
   *(Note: The `vite.config.ts` file is already configured to read `OPENAI_API_KEY` from your `.env` file and expose it to the app.)*

### 5. Run the Development Server
Start the local development server by running:
```bash
npm run dev
```
VS Code will display a local URL (e.g., `http://localhost:3000`). `Ctrl+Click` (or `Cmd+Click` on Mac) the link to open the fully working app in your browser!
