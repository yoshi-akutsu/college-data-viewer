const csv = require('csv-parser');
const fs = require('fs');

fs.createReadStream('../names.csv')
  .pipe(csv())
  .on('data', (row) => {
    fs.appendFile('schoolnames.js', '"' + row.instnm + '"' + ',', function (err) {
            if (err) throw err;
            console.log('Saved!');
        })
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });