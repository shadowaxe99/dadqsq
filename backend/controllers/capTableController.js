const CompanyModel = require('../models/Company');
const ShareholderModel = require('../models/Shareholder');
const EquityGrantModel = require('../models/EquityGrant');

const fetchCapTable = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const shareholders = await ShareholderModel.find({ company: companyId });
    const equityGrants = await EquityGrantModel.find({ company: companyId });

    const capTable = {
      companyDetails: company,
      shareholders: shareholders,
      equityGrants: equityGrants
    };

    res.status(200).json(capTable);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cap table', error: error.message });
  }
};

const updateCapTable = async (req, res) => {
  try {
    const companyId = req.params.id;
    const { shareholders, equityGrants } = req.body;

    // Update shareholders
    for (const shareholder of shareholders) {
      const { _id, ...updateData } = shareholder;
      await ShareholderModel.findByIdAndUpdate(_id, updateData, { new: true });
    }

    // Update equity grants
    for (const equityGrant of equityGrants) {
      const { _id, ...updateData } = equityGrant;
      await EquityGrantModel.findByIdAndUpdate(_id, updateData, { new: true });
    }

    res.status(200).json({ message: 'Cap table updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cap table', error: error.message });
  }
};

const addShareholder = async (req, res) => {
  try {
    const companyId = req.params.id;
    const newShareholder = new ShareholderModel({ ...req.body, company: companyId });
    const savedShareholder = await newShareholder.save();

    res.status(201).json(savedShareholder);
  } catch (error) {
    res.status(500).json({ message: 'Error adding shareholder', error: error.message });
  }
};

const issueEquityGrant = async (req, res) => {
  try {
    const companyId = req.params.id;
    const newEquityGrant = new EquityGrantModel({ ...req.body, company: companyId });
    const savedEquityGrant = await newEquityGrant.save();

    res.status(201).json(savedEquityGrant);
  } catch (error) {
    res.status(500).json({ message: 'Error issuing equity grant', error: error.message });
  }
};

module.exports = {
  fetchCapTable,
  updateCapTable,
  addShareholder,
  issueEquityGrant
};