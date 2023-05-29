const express = require('express');
const router = express.Router();

// Array of developers
const developersArr = [
    {"firstname":"Meny", "lastname":"Ben-Atar", "id":208433854, "email":"menybenatar@gmail.com"},
    {"firstname":"Yair", "lastname":"Sultan", "id":318, "email":"menybenatar@gmail.com"}
];
/**
 * Handle the GET request to get the developers array data
 */
router.get('/', function(req, res, next) {
    res.status(200).json(developersArr);
});

module.exports = router;
