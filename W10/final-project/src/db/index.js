const { Pool } = require('pg')
 
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'finals'
});

pool.query(` 
  SELECT *
  FROM users
`)
.then(res => {
  console.log(res.rows);
})
.catch(err => console.error('query error', err.stack))


