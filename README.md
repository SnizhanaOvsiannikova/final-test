# Oliver POS - React Visual Element Builder

A React-based visual element builder that allows users to create and customize UI components (sections and buttons) with real-time CSS property editing.

## 🚀 Features

- **Visual Element Creation**: Add sections and buttons dynamically
- **Real-time CSS Editing**: Modify properties like width, height, colors, spacing, etc.
- **Nested Elements**: Create up to 5 levels of nested sections
- **Element Selection**: Click to select and edit specific elements
- **Responsive Design**: Modern UI with styled-components
- **State Management**: Redux Toolkit for predictable state updates

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── lib/
│   │   └── components/   # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Section.tsx
│   │       ├── ElementRenderer.tsx
│   │       └── ControlInput.tsx
│   ├── Dropdown.tsx
│   ├── Sidebar.tsx
│   └── RootSection.tsx
├── store/               # Redux store and slices
│   ├── features/
│   │   ├── StylesSlice.tsx
│   │   ├── ElementsSlice.tsx
│   │   ├── DropdownSlice.tsx
│   │   └── UISlice.tsx
│   └── store.tsx
├── styles/              # Styled-components
│   ├── app.styles.ts
│   ├── sidebar.styles.ts
│   ├── button.styles.ts
│   ├── section.styles.ts
│   ├── dropdown.styles.ts
│   ├── control_input.styles.ts
│   ├── elements.styles.ts
│   └── rootSection.styles.ts
├── types/               # TypeScript type definitions
│   ├── element.types.ts
│   └── styles.types.ts
├── utils/               # Utility functions
│   └── elementUtils.ts
├── constants/           # Application constants
│   └── controls.constants.ts
├── hooks/               # Custom React hooks
│   └── storeHooks.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Styled Components
- **Icons**: React Icons
- **Build Tool**: Vite
- **Linting**: ESLint + TypeScript ESLint

## 📦 Setup and Installation

### Prerequisites

- Node.js (>=18.0.0)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd oliver_pos
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🎨 Usage

1. **Adding Elements**: Use the dropdown in the sidebar to select "SECTION" or "BUTTON" and add new elements
2. **Selecting Elements**: Click on any element in the main area to select it
3. **Editing Properties**: Use the controls in the sidebar to modify CSS properties:
   - Width/Height (with range sliders)
   - Colors (color picker)
   - Display and Position (dropdowns)
   - Padding/Margin (individual side controls)
   - Button text (for button elements)
4. **Nested Elements**: Select a section and add child elements (up to 5 levels deep)

## 🏗️ Key Components

- **Sidebar**: Contains element selection dropdown and CSS property controls
- **RootSection**: Main canvas area where elements are rendered
- **ElementRenderer**: Handles rendering of individual elements with selection logic
- **ControlInput**: Reusable component for different types of CSS property inputs

## 🔧 Configuration

The project uses:
- **Path aliases**: `@/` maps to `./src/`
- **TypeScript**: Strict mode enabled
- **Vite**: Modern build tool with HMR
- **Service Worker**: Basic caching for PWA functionality

## 📱 Browser Support

- Modern browsers with ES2022 support
- Chrome, Firefox, Safari, Edge (latest versions)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and tests
5. Submit a pull request

## 📄 License

This project is private and proprietary.

---

Built with ❤️ using React and TypeScript