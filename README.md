# Fitness App

A modern, full-stack fitness web application built with React (Vite) and Clerk authentication. Track your workouts, manage plans, connect with trainers, and get personalized diet recommendations—all in a beautiful, responsive UI.

---

## 🚀 Features

- **Clerk Authentication:** Secure sign up, sign in, and user profile management with Clerk. Social login supported.
- **Personalized Workouts:** Custom workout plans generated based on your fitness goals, age, height, weight, and lifestyle.
- **Diet Plans:** Tailored diet plans for bulking, cutting, or maintaining, with meal suggestions and notes.
- **Profile Integration:** User avatar and details are fetched from Clerk and displayed throughout the app.
- **Feedback System:** Users can submit feedback to help improve the app.
- **Animated UI:** Framer Motion and custom CSS for smooth, modern transitions and button effects.
- **Mobile Responsive:** Fully responsive design for all devices.
- **No custom auth code:** All authentication is handled by Clerk, ensuring security and simplicity.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Framer Motion, Clerk, Tailwind CSS, CSS Modules
- **Deployment:** Vercel
- **Other:** PostCSS, ESLint

---

## 📦 Project Structure

```
Fitness-app/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images and SVGs
│   ├── components/        # React components (Navbar, Workouts, etc.)
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── ...
├── .env.local             # Environment variables (Clerk key)
├── package.json           # Project metadata and scripts
├── postcss.config.js      # PostCSS config (Tailwind)
├── vite.config.js         # Vite config
├── README.md              # This file
└── LICENSE                # MIT License
```

---

## 📝 Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/SAHILKUMARSAKSHI/Fitness-app.git
   cd Fitness-app
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up Clerk:**
   - Create a `.env.local` file in the root directory:
     ```env
     VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
     ```
   - Get your key from the [Clerk dashboard](https://dashboard.clerk.com/).
4. **Run locally:**
   ```sh
   npm run dev
   ```
5. **Build for production:**
   ```sh
   npm run build
   ```

---

## 🌐 Deployment

- Deploy instantly to [Vercel](https://vercel.com/):
  1. Connect your GitHub repo in the Vercel dashboard.
  2. Set the `VITE_CLERK_PUBLISHABLE_KEY` environment variable in Vercel project settings.
  3. Deploy!

---

## 📸 Screenshots

> Add screenshots here to showcase the UI and features.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/SAHILKUMARSAKSHI/Fitness-app/issues) or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

---

Made with ❤️ by [SAHILKUMARSAKSHI](https://github.com/SAHILKUMARSAKSHI)
