const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../controllers/authController');
const { getCapTable, createCapTable, updateCapTable, deleteCapTable } = require('../controllers/capTableController');

// Get the cap table for a company
router.get('/:companyId', authenticateToken, async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const capTable = await getCapTable(companyId);
        res.json(capTable);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new cap table for a company
router.post('/', authenticateToken, async (req, res) => {
    try {
        const capTableData = req.body;
        const newCapTable = await createCapTable(capTableData);
        res.status(201).json(newCapTable);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an existing cap table
router.put('/:capTableId', authenticateToken, async (req, res) => {
    try {
        const capTableId = req.params.capTableId;
        const updates = req.body;
        const updatedCapTable = await updateCapTable(capTableId, updates);
        res.json(updatedCapTable);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a cap table
router.delete('/:capTableId', authenticateToken, async (req, res) => {
    try {
        const capTableId = req.params.capTableId;
        await deleteCapTable(capTableId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;