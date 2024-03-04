const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const pool = new Pool({
  user: 'moral503',
  password: 'hG0rwDrm5KbOVGgM2yZyPagsPb3IQTQX',
  host: 'dpg-cmduaa6d3nmc73dn5bqg-a.oregon-postgres.render.com',
  port: '5432',
  database: 'lover_flower',
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect()
  .then(() => {
    console.log('Connected to the database');
    
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
  });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', async (req, res) => {
  res.status(200).json({ result: 'all ok' });
});

app.get('/api/all-products', async (req, res) => {
  try {
    const result = await (await pool.query(`SELECT * FROM medicine_drugs`)).rows
    return res.status(200).json({ products: JSON.stringify(result) });
  } catch (error) {
    return res.status(500).json({ result: `${error}` });
  }
});

app.get('/api/choosed-products', async (req, res) => {
  try {
    const {choosed} = req.query;

    const result = await (await pool.query(`SELECT * FROM medicine_drugs WHERE id IN (${JSON.parse(choosed).join(', ')})`)).rows
    return res.status(200).json({ products: JSON.stringify(result) });
  } catch (error) {
    return res.status(500).json({ result: `${error}` });
  }
});

app.get('/api/all-coupones', async (req, res) => {
  try {
    const result = await (await pool.query(`SELECT * FROM medicine_coupones`)).rows
    return res.status(200).json({ products: JSON.stringify(result) });
  } catch (error) {
    return res.status(500).json({ result: `${error}` });
  }
});

app.get('/api/get-specific-coupone/:coupone', async (req, res) => {
  try {
    const {coupone} = req.params;
    const result = await (await pool.query(`SELECT * FROM medicine_coupones WHERE coupon='${coupone.slice(1)}'`)).rows
    return res.status(200).json({ products: JSON.stringify(result.length > 0 ? result : undefined) });
  } catch (error) {
    return res.status(500).json({ result: `${error}` });
  }
});

app.get('/api/get-by-filters/', async (req, res) => {
  try {
    const {prefered, sortby, types} = req.query;

    const typesString = JSON.parse(types).length > 0 ? `(${JSON.parse(types).map(str => `'${str}'`).join(', ')})` : "('bad', 'diet', 'drugs', 'mazi', 'vitamines')"

    console.log(typesString);

    const result = await (await pool.query(`
    SELECT * FROM medicine_drugs
    JOIN medicine_drugs_types ON medicine_drugs.id = medicine_drugs_types.drugs_id
    WHERE medicine_drugs_types.type IN ${typesString}`)).rows
    .sort((a, b) => {
      if (sortby === 'from-cheep') {
        return a.cost - b.cost
      } else if (sortby === 'from-expensive') {
        return b.cost - a.cost
      } else if (sortby === 'from-old') {
        return a.creation_date - b.creation_date
      } else if (sortby === 'from-new') {
        return b.creation_date - a.creation_date
      }
    })

    return res.status(200).json({ products: JSON.stringify(result.length > 0 ? result : false) });
  } catch (error) {
    return res.status(500).json({ result: `${error}` });
  }
});

app.get('/api/getproducts/filters/', async (req, res) => {
  try {
    const {filters, currentPage} = req.query;
    const {has, categories, cost, brands, frame_materials} = JSON.parse(filters);

    const categoriesString = categories.length > 0 ? categories.map(str => `'${str}'`).join(', ') : "'triatlon', 'twise_suspension', 'bmx', 'single_suspension', 'single_speed', 'gravy', 'mountain', 'city', 'road_bike'"
    const brandsString = brands.length > 0 ? brands.map(str => `'${str}'`).join(', ') : "'look', 'trek', 'orbea', 'black','scott'"
    const frameMaterialsString = frame_materials.length > 0 ? frame_materials.map(str => `'${str}'`).join(', ') : "'Aluminium', 'Carbon Fiber', 'Steel', 'Titanium'"
    const hasString = has ? `AND world_bike_product.in_stock=${!has}` : ''

    const result = await (await pool.query(`
      SELECT * FROM world_bike_product
      JOIN world_bike_type ON world_bike_product.id = world_bike_type.prodct_id
      JOIN world_bike_brand ON world_bike_product.id = world_bike_brand.prodct_id
      JOIN world_bike_properties ON world_bike_product.id = world_bike_properties.prodct_id
      WHERE world_bike_type.byke_type IN (${categoriesString})
      ${hasString}
      AND world_bike_product.cost >= ${cost.from}
      AND world_bike_product.cost <= ${cost.to}
      AND world_bike_brand.brand_name IN(${brandsString})
      AND world_bike_properties.frame_material IN(${frameMaterialsString})
      `)).rows;


    res.status(201).json({ pagesCount: Math.round(result.length / 9), data: JSON.stringify(result.filter((item, index) => index <= +currentPage*10-1 && index >= +currentPage*10-10))});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// post requests

app.post('/api/mail', async (req, res) => {
  try {
    const {mail, agree} = req.body;

    const query = {
      text: 'INSERT INTO Products (mail, treatment_data) VALUES ($1, $2)',
      values: [mail, agree],
    };
    await pool.query(`INSERT INTO world_bike_mail_letters (email, agree) VALUES ('${mail}', ${agree})`);
    res.status(201).json({ message: 'Product created successfully' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});