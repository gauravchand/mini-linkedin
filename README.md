# Mini LinkedIn

A simplified version of LinkedIn built with React, TypeScript, and Supabase. This project implements core social networking features like user profiles, posts, and connections.

## 🚀 Features

- User authentication (sign up, sign in, sign out)
- Profile management
- Post creation and interaction
- Real-time updates
- Responsive design

## 🛠️ Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Vite

- **Backend:**
  - Supabase (Database & Authentication)

## 📝 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

## ⚙️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mini-linkedin.git
cd mini-linkedin
```

2. Install dependencies:
```bash
cd project
npm install
```

3. Create a `.env` file in the project directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## 🗄️ Database Setup

1. Create a new Supabase project
2. Run the migration script from `project/supabase/migrations`
3. Update your environment variables

## 📋 Project Structure

```
project/
├── src/
│   ├── components/     # Reusable components
│   ├── contexts/       # React contexts
│   ├── lib/           # Library configurations
│   ├── pages/         # Page components
│   └── utils/         # Utility functions
├── public/            # Static assets
└── supabase/         # Database migrations
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Your Name
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- React Documentation
- Supabase Documentation
- Tailwind CSS Documentation
