const express = require('express');
const router = express.Router();

// Array of developers
const developersArr = [
    {"firstname":"Meny", "lastname":"Ben-Atar", "id":208433854, "email":"menybenatar@gmail.com"},
    {"firstname":"Yair", "lastname":"Sultan", "id":318176708, "email":"yair.sultanv@gmail.com"}
];

router.get('', function(req, res, next) {
    res.status(200).json(developersArr);
});

module.exports = router;
