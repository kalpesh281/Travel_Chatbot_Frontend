# TripTalk - AI Travel Assistant 🌍✈️

A modern, interactive travel planning chatbot built with React that helps users explore destinations, plan itineraries, and get personalized travel recommendations for India.

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-FF0055?style=for-the-badge&logo=framer)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
- [Customization](#customization)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Features
- **AI-Powered Chat Interface** - Interactive conversational UI for travel planning
- **Smart Response System** - Context-aware responses based on user queries
- **Quick Suggestions** - Pre-defined prompts for common travel queries
- **Real-time Chat** - Instant message updates with smooth animations
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

### Chat Features
- 💬 User and bot message differentiation with unique avatars
- ⚡ Loading indicators during bot responses
- 📱 Fixed input box at bottom with scrollable message area
- 🎨 Beautiful gradient backgrounds and smooth animations
- 🔄 Auto-scroll to latest messages
- ⌨️ Enter key to send, Shift+Enter for new line

### Travel Features
- 🏰 Destination recommendations (Rajasthan, Kerala, Goa, Himalayas, etc.)
- 💰 Budget planning assistance
- 📅 Itinerary creation support
- 🏨 Accommodation suggestions
- 🍛 Food and restaurant recommendations
- 🎒 Custom travel style matching (luxury, mid-range, budget)

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.x** - UI library
- **React Router DOM** - Navigation
- **React Hooks** - State management (useState, useRef, useEffect)

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Custom Gradients** - Blue to purple gradient theme

### Icons
- **Lucide React** - Modern icon set
- **React Icons** - Additional icon library (MdOutlineTravelExplore)

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/triptalk.git
cd triptalk
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Install Required Packages
```bash
npm install react-router-dom framer-motion lucide-react react-icons
# or
yarn add react-router-dom framer-motion lucide-react react-icons
```

### Step 4: Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will open at `http://localhost:5173` (or your configured port).

## 🎯 Usage

### Basic Chat Flow

1. **Start Conversation**
   - Open the application
   - Bot greets with welcome message
   - Quick suggestions appear for easy start

2. **Ask Questions**
   - Type your travel query in the input box
   - Press Enter or click Send button
   - Bot responds with relevant information

3. **Navigate**
   - Click "Home" button to return to homepage
   - Click "New Chat" to start fresh conversation
   - Click logo to go back to home

### Example Queries

```
"I want to visit Rajasthan"
"Plan a 7-day trip to Kerala"
"What's the budget for a Goa trip?"
"Recommend hotels in Jaipur"
"Best time to visit Himalayas"
"Food recommendations in Kerala"
```

## 📁 Project Structure

```
triptalk/
├── src/
│   ├── components/
│   │   ├── ChatPage.jsx          # Main chat interface
│   │   └── MessageBubble.jsx     # Message component (inside ChatPage)
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── public/
│   └── assets/                    # Images and static files
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🧩 Components

### ChatPage Component

Main component that handles the entire chat interface.

**State Management:**
- `messages` - Array of chat messages (user and bot)
- `inputMessage` - Current input text
- `isLoading` - Loading state during bot response
- `isMenuOpen` - Mobile menu toggle state

**Key Functions:**
- `handleSendMessage()` - Processes user input and generates bot response
- `generateResponse()` - Returns contextual responses based on user query
- `scrollToBottom()` - Auto-scrolls to latest message
- `handleSuggestionClick()` - Pre-fills input with suggestion

### MessageBubble Component

Renders individual chat messages with animations.

**Props:**
- `message` - Message object containing type, text, and timestamp
- `index` - Message index for staggered animations

**Features:**
- Different styling for user vs bot messages
- Avatar display for both user and bot
- Smooth entry animations
- Hover effects
- Cloud-style message bubbles

## 🎨 Customization

### Color Scheme

Modify the gradient in `ChatPage`:
```jsx
// Current: Blue to Purple
className="bg-gradient-to-br from-blue-50 to-purple-50"

// Change to: Green to Blue
className="bg-gradient-to-br from-green-50 to-blue-50"
```

### Bot Responses

Customize responses in the `generateResponse()` function:
```jsx
const generateResponse = (userInput) => {
  const input = userInput.toLowerCase();
  
  // Add your custom logic
  if (input.includes('your-keyword')) {
    return 'Your custom response';
  }
  // ... existing logic
};
```

### Quick Suggestions

Modify the `quickSuggestions` array:
```jsx
const quickSuggestions = [
  { icon: <YourIcon className="w-4 h-4" />, text: 'Your suggestion text' },
  // Add more suggestions
];
```

### Styling

All components use Tailwind CSS. Modify classes directly in JSX:
```jsx
// Example: Change message bubble color
className="bg-blue-50"  // Change to any Tailwind color
```

## 🔮 Future Enhancements

### Planned Features
- [ ] Integration with real AI API (OpenAI, Claude, or custom backend)
- [ ] User authentication and chat history
- [ ] Image upload for destination queries
- [ ] Interactive maps for destination visualization
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] Export itinerary as PDF
- [ ] Price comparison for hotels and flights
- [ ] Weather integration
- [ ] Currency converter
- [ ] Booking system integration

### Technical Improvements
- [ ] Database integration for message persistence
- [ ] Server-side rendering (Next.js)
- [ ] Progressive Web App (PWA) capabilities
- [ ] Performance optimization with React.memo
- [ ] Unit and integration tests
- [ ] Accessibility improvements (ARIA labels)
- [ ] Dark mode theme
- [ ] Internationalization (i18n)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Use functional components with hooks
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide Icons](https://lucide.dev/) - Icon library
- [React Icons](https://react-icons.github.io/react-icons/) - Additional icons

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

**Made with ❤️ for travelers around the world**

⭐ Star this repo if you find it helpful!