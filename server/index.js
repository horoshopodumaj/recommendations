const express = require("express");
PORT = process.env.PORT || 8000;
const app = express();

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
