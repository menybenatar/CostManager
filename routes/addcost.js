const express = require('express');
const router = express.Router();
const cost = require('../models/costs');
const report = require('../models/report');
const users = require('../models/users');
const utilsNamespace = require("../utils/utils");

/**
 * Handle the POST request to add a new cost
 */
router.post('', async function (req, res, next) {
    try {
        const { user_id, year, month, day, description, category, sum } = req.body;

        // Find the user by user_id if the user not found throw
        const user = await users.findOne({ id: user_id });
        if (user === null) {
            //If the user not found throw Error
            throw new Error('The user does not exist!');
        }

        // Generate a new unique ID for the cost document
        const id = utilsNamespace.generateId();

        // Create a new cost document
        const newCost = new cost({
            user_id,
            year,
            month,
            day,
            id,
            description,
            category,
            sum
        });

        // Check if the computed report already exists in the DB and if exists, remove it from the DB
        await report.findOneAndRemove({ user_id, year, month });

        // Save the cost document to the database
        const savedCost = await newCost.save();

        // Return the saved cost document as the response
        res.status(200).json(savedCost);

    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;