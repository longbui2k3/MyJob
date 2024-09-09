const app = require("./src/app");

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
