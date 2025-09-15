# Oliver POS - React Visual Element Builder

A React-based visual element builder that allows users to create and customize UI components (sections and buttons) with real-time CSS property editing.

## 🚀 Features

- **Visual Element Creation**: Add sections and buttons dynamically
- **Real-time CSS Editing**: Modify properties like width, height, colors, spacing, etc.
- **Nested Elements**: Create up to 5 levels of nested sections
- **Element Selection**: Click to select and edit specific elements
- **Responsive Design**: Modern UI with styled-components
- **State Management**: Redux Toolkit with Redux Persist for state persistence
- **PWA Support**: Service worker for offline functionality

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── lib/
│   │   └── components/   # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Section.tsx
│   │       ├── ElementRenderer.tsx
│   │       ├── ControlInput.tsx
│   │       └── LoadingScreen.tsx
│   ├── Dropdown.tsx
│   ├── Sidebar.tsx
│   ├── RootSection.tsx
│   └── OperationButton.tsx
├── store/               # Redux store and slices
│   ├── features/
│   │   ├── StylesSlice.tsx
│   │   ├── ElementsSlice.tsx
│   │   ├── DropdownSlice.tsx
│   │   └── UISlice.tsx
│   ├── persistConfigs.ts
│   └── store.tsx
├── styles/              # Styled-components
│   ├── app.styles.ts
│   ├── sidebar.styles.ts
│   ├── button.styles.ts
│   ├── section.styles.ts
│   ├── dropdown.styles.ts
│   ├── control_input.styles.ts
│   ├── element_renderer.styles.ts
│   ├── loading_screen.styles.ts
│   ├── operation_btn.styles.ts
│   └── rootSection.styles.ts
├── types/               # TypeScript type definitions
│   ├── element.types.ts
│   └── styles.types.ts
├── utils/               # Utility functions
│   ├── elementUtils.ts
│   └── constants.ts
├── constants/           # Application constants
│   └── controls.constants.ts
├── hooks/               # Custom React hooks
│   └── storeHooks.tsx
├── App.tsx
├── main.tsx
└── index.css
public/
├── images/
│   └── avatar.png
├── manifest.json
└── sw.js               # Service Worker
```

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **State Management**: Redux Toolkit + Redux Persist
- **Styling**: Styled Components
- **Icons**: React Icons
- **Build Tool**: Vite
- **Linting**: ESLint + TypeScript ESLint

## 📦 Setup and Installation

### Prerequisites

- Node.js (>=20.19.0 or >=22.12.0)
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

1. **Initial Setup**: The app automatically creates a root section when first loaded
2. **Adding Elements**: 
   - Select an existing section to enable the dropdown
   - Choose "SECTION" or "BUTTON" from the dropdown to add new elements
3. **Selecting Elements**: Click on any element in the main area to select it
4. **Editing Properties**: Use the controls in the sidebar to modify CSS properties:
   - **Width/Height**: Range sliders with text input for precise values
   - **Colors**: Color picker with hex input
   - **Display and Position**: Dropdown selectors
   - **Padding/Margin**: Individual side controls (Top, Right, Bottom, Left)
   - **Button Text**: Text input for button elements
5. **Nested Elements**: Select a section and add child elements (up to 5 levels deep)
6. **Clear State**: Use the "Clear State" button to reset the entire application

## 🏗️ Key Components

### Core Components
- **App**: Main application container with initialization logic
- **Sidebar**: Contains user info, element selection dropdown, and CSS property controls
- **RootSection**: Main canvas area where elements are rendered
- **ElementRenderer**: Handles rendering of individual elements with selection and nesting logic

### UI Components
- **Button**: Customizable button component with styling support
- **Section**: Container component that can hold child elements
- **Dropdown**: Reusable dropdown component for element selection
- **ControlInput**: Dynamic input component for different CSS property types
- **OperationButton**: Action button for operations like clearing state
- **LoadingScreen**: Shows while state is being restored from persistence

### State Management
- **ElementsSlice**: Manages the element tree structure and styling
- **StylesSlice**: Handles default styles for sections and buttons
- **UISlice**: Manages UI state like selected elements
- **DropdownSlice**: Controls dropdown selections

## 🔧 Configuration

The project uses:
- **Path aliases**: `@/` maps to `./src/`
- **TypeScript**: Strict mode enabled with comprehensive type checking
- **Vite**: Modern build tool with HMR and optimized bundling
- **Redux Persist**: Automatic state persistence to localStorage
- **Service Worker**: PWA functionality with caching strategies

## 🎯 Key Features

### Element Management
- Dynamic element creation with unique IDs
- Hierarchical nesting with level indicators
- Maximum nesting depth protection (5 levels)
- Element selection with visual feedback

### Styling System
- Real-time CSS property editing
- Support for various input types (range, color, select, text)
- Spacing controls for padding and margin
- Style inheritance and customization

### State Persistence
- Automatic save/restore of element tree
- Persistent styling changes
- Session-based UI state management

## 📱 Browser Support

- Modern browsers with ES2022 support
- Chrome, Firefox, Safari, Edge (latest versions)
- PWA installation support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Build and test: `npm run build`
6. Submit a pull request

## 📄 License

This project is private and proprietary.

---

Built with ❤️ using React and TypeScript