const express = require('express');
const router = express.Router();
const cost = require('../models/costs');
const report = require('../models/report');
const users = require('../models/users');
const utilsNamespace = require("../utils/utils");
/**
 * Handle the GET request to get report
 */
router.get('', async function (req, res, next) {
    try {
        const { user_id, year, month } = req.query;
        // Check if all parameters are present
        if (!user_id || !year || !month) {
            throw new Error('Missing required parameters');
        }
        // validate the date
        if (!utilsNamespace.validateDate(parseInt(year), parseInt(month), 1)) {
            throw new Error('Date invalid');
        }
        // validate if the user exists
        const user = await users.findOne({ id: user_id });
        if (!user) {
            throw new Error( "User doesn't exist in the DB");
        }


        // Check if the computed report already exists in the database
        const existingReport = await report.findOne({ user_id, month, year });
        if (existingReport) {
            // If the report already exists, return it as a JSON response
            res.status(200).json(existingReport.report);
        } else{
            // Create an object to store the costs by category
            const costsByCategory = {
                food: [],
                health: [],
                housing: [],
                sport: [],
                education: [],
                transportation: [],
                other: []
            };

            // Retrieve the costs for the specified month, year, and user
            const costs = await cost.find({ user_id, year, month });

            // Iterate over the costs and categorize them
            costs.forEach(cost => {
                const { day, description, sum, category } = cost;
                costsByCategory[category].push({ day, description, sum });
            });

            // Save the computed report to the 'reports' collection
            const newReport = new report({
                user_id,
                month,
                year,
                report: costsByCategory
            });
            await newReport.save();

            // Return the report as a JSON response
            res.status(200).json(costsByCategory);
        }


    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
