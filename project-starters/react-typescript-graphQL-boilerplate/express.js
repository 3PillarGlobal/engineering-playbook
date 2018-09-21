const express = require('express');
const app = express();
const PORT = 3000;
const DIST = './dist';

app.use(express.static(DIST));

app.listen(PORT, () => {
    console.log(`Server started on: http://localhost:${PORT}`);
})