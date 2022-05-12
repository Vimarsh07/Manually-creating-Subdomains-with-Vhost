// Import the two dependencies
const express = require("express");
const vhost = require("vhost");

// Create an app for the top-level domain
const app = express();

// Create an app for each subdomain. You can call these whatever you want.
const school1 = express();
const school2 = express();

// Set the domain based on whether it's in production or not. If the
// syntax doesn't look familiar, look up "ternary operator javascript"
// in a search engine or leave a comment below.
const domain =
    process.NODE_ENV === "production" ? "example.com" : "adminsite.local";

// Mount the extra apps on their subdomains.
app.use(vhost(`school1.${domain}`, school1));
app.use(vhost(`school2.${domain}`, school2));

// The routers will be moved to their own files in another step.

// a router for the root domain
app.get("/", (req, res) => {
    res.send(`hello world`);
});

// a router for the cats subdomain
school1.get("/", (req, res) => {
    res.send("here is the school1 subdomain");
});

// a router for the dogs subdomain
school2.get("/", (req, res) => {
    res.send("here is the school2 subdomain");
});

// start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`server is running at 127.0.0.1:${PORT}`));