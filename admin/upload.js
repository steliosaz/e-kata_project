const db = require('../services/connectdb');

exports.upload = async(req, res, next) => {
    try {
        const { fetch_date, products } = req.body;

        // Insert products into the Product table
        const productValues = products.map((product) => {
            const { id, name, category, subcategory } = product;
            return `('${id}', '${name}', '${category}', '${subcategory}')`;
        });

        const productInsertQuery = `
      INSERT INTO product (id, name, category, subcategory)
      VALUES ${productValues.join(', ')}
    `;

        db.query(productInsertQuery, (error, productResult) => {
            if (error) {
                console.error('Error inserting products:', error);
                res.status(500).json({ message: 'Error inserting data' });
                return;
            }

            // Insert prices into the Price table
            const priceValues = products.flatMap((product) => {
                const { id, prices } = product;
                return prices.map((price1) => {
                    const { price, date } = price1;
                    return `('${id}', '${price}', '${date}')`;
                });
            });

            const priceInsertQuery = `
        INSERT INTO price (product_id, value, date)
        VALUES ${priceValues.join(', ')}
      `;

            db.query(priceInsertQuery, (error, priceResult) => {
                if (error) {
                    console.error('Error inserting prices:', error);
                    res.status(500).json({ message: 'Error inserting data' });
                    return;
                }

                res.status(200).json({ message: 'Data inserted successfully' });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error inserting data' });
    }
}