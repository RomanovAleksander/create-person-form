# Create Person Form

A registration form implementation for personal and document data featuring dynamic validation and input masking.

**[(Live Demo)](https://romanovaleksander.github.io/create-person-form/)**

## Tech Stack

| Category | Technology |
| --- | --- |
| **Core** | React 19 + TypeScript 5.6 |
| **Build Tool** | Vite 6 |
| **Form Management** | react-final-form + final-form |
| **Validation** | Zod 3 |
| **Select** | react-select |
| **Input Masking** | react-imask |
| **Styling** | SCSS Modules, clsx |
| **Date Utilities** | date-fns |

---

## Architecture

The project is built using a **Feature-based approach**, which isolates business logic from shared UI components.

```
src/
├── features/          # Modules grouped by business domain
│   └── createPerson/  # Everything related to the "Create Person" logic
└── shared/            # Reusable blocks, domain-agnostic
    └── ui/            # Generic UI kit (inputs, buttons, wrappers)

```

### Folder Structure

```
src/
├── features/
│   └── createPerson/
│       ├── components/         # Form sections (PatientData, Documents, Result)
│       ├── constants/          # Select option lists
│       └── validation/         # Zod validation schema
├── shared/
│   ├── types/                  # General TypeScript interfaces
│   ├── ui/                     # UI components and masked inputs
│   └── utils/                  # Zod adapter
└── styles/                     # Global styles, variables, and mixins

```

---
## Installation and Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Run the development server:**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### All Available Scripts
```bash
# Start the development server with Hot Module Replacement (Vite)
npm run dev # Local: http://localhost:5173

# Run full project validation: Type-check (TSC) + Production Build (Vite)
npm run build # Generates an optimized production bundle in /dist

# Preview the locally built production application
npm run preview # Local: http://localhost:4173

# Run static code analysis (ESLint) to find bugs and formatting issues
npm run lint # Scans the /src directory

# Automatically fix linting and code style violations
npm run lint:fix # Fixes auto-resolvable issues (formatting, imports, etc.)
```
