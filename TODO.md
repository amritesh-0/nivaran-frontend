# Fix Require Errors in React Components

## Tasks
- [x] Edit Hero.jsx: Import report.json and replace require with imported animation data
- [x] Edit HowItWorks.jsx: Import route.json and replace require with imported animation data
- [x] Edit CallToAction.jsx: Import analytics.json and replace require with imported animation data
- [x] Test the application to ensure errors are resolved

## Notes
- Replace `require('/public/lottie/filename.json')` with ES6 imports since Vite doesn't support require in browser
- Import path should be '/lottie/filename.json' as public folder is served at root
