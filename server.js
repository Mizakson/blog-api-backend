// server.js
// main entry point for build

const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});