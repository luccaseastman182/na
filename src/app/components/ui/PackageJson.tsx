{
  "name": "nsbs-online-learning-platform",
  "version": "1.0.0",
  "description": "National Society of Business Sciences (NSBS) online learning platform",
  "main": "index.js",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "format": "prettier --write ."
  },
  "dependencies": {
    "next": "^15.1.2",
    "react": "^19.0.0",
    "typescript": "^5.7.2",
    "tailwindcss": "^2.2.19",
    "zod": "^3.11.6",
    "prisma": "^3.5.0",
    "zustand": "^3.5.0",
    "axios": "^0.21.1"
  },
  "devDependencies": {
    "eslint": "^7.32.0",
    "prettier": "^2.3.2",
    "postcss": "^8.3.6",
    "autoprefixer": "^10.2.6"
  }
}
