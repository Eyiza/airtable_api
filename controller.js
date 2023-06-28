const base = require('./airtable.js');

exports.fetchDataFromAirtable = async (req, res) => {
  try {
    // Specify your Airtable table name
    const table = base('Demo');

    // Fetch records from the table
    const records = await table.select().firstPage();

    // Extract the necessary data from the records
    const data = records.map((record) => ({
      id: record.id,
      name: record.get('Name'),
      level: record.get('Level'),
      DOB: record.get('DOB'),
      age: record.get('Age')
    }));

    // Send the data as the API response
    res.json(data);
  } catch (err) {
    console.error('Error retrieving data from Airtable:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
