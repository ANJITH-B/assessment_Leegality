
[[Live Preview]](https://assessment-leegality.vercel.app/products)

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install dependencies

```bash
npm install
```
### 3. Add env
```bash
VITE_BASE_URL=https://dummyjson.com
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application in your browser

```
http://localhost:5173
```

## 📝 Assumptions Made

- Category filtering uses the API endpoint provided.
- Brand and price filtering are handled client-side.
- Filter and pagination states are preserved while navigating between the Product Listing Page and Product Detail Page.

## 🏗️ Architectural Decisions

- Built using **React, React Router (Framework Mode), TypeScript, and Tailwind CSS**.
- Followed a route-based feature structure with dedicated `page.tsx` and `layout.tsx` files.
- UI components are split into smaller reusable components such as Product Card, Filters, and Pagination.
- Custom hooks are used to separate API handling and state management logic.
- Maintained clear separation between routes, components, hooks, services, and types for better scalability and maintainability.
- Implemented Tailwind variants to ensure consistent UI styling and maintain a scalable design system
- Add compound component pattern to keep layout logic separated and for the accurate loading skeleton 

## 🚀 Improvements With More Time

- Add unit and integration tests.
- Improvement skeleton loading layouts.
- Improve accessibility and keyboard navigation.
- Add API response caching and performance optimizations.
- Enhance responsive UI and overall user experience.
- Add clear error boundaries and empty state handling.
