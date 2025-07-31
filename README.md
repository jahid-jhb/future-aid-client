# 🎓 FutureAid - Client Side

This is the **client-side** of the **FutureAid Scholarship Management System** — a full-featured React application that helps students explore and apply for global scholarships while admins and moderators manage the process efficiently.

---

## 🚀 Features

- 🔐 User Authentication (Email/Password, Google Sign-In)
- 🎓 Scholarship Listing, Search, Filter & Pagination
- 📥 Apply for Scholarships (with form + review + payment system)
- 💬 Leave and Manage Reviews
- 📋 Admin/Moderator Dashboards (manage users, scholarships, applications, analytics)
- 📊 Dynamic Charts for Admin Insights
- 📱 Responsive UI using Tailwind CSS + DaisyUI

---

## 📁 Folder Structure (Client)

```
futureaid-client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/            # Auth context
│   ├── hooks/
│   ├── layouts/
│   ├── pages/              # Pages like Home, Scholarships, Dashboard, etc.
│   ├── routes/
│   ├── services/           # API utility
│   ├── App.jsx
│   └── main.jsx
├── .env
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🛠️ Technologies Used

- React.js
- React Router
- Tailwind CSS
- DaisyUI
- Axios
- Firebase Auth
- SweetAlert2
- Chart.js / Recharts
- Vite (build tool)

---

## 🔑 Environment Variables

Create a `.env` file in the root of your client project with the following:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 📦 Installation & Running the Client

1. **Clone the repo:**

```bash
git clone https://github.com/yourusername/futureaid-client.git
cd futureaid-client
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run dev
```

4. Visit the app at:  
👉 `http://localhost:5173`

---

## 🔗 Backend

You can find the backend API source [here](https://github.com/yourusername/futureaid-server).

---

## 🙋‍♂️ Author

Developed by **MD Jahid Hasan**  
Feel free to contribute, open issues, or fork!

---

## 📃 License

This project is licensed under the MIT License.
