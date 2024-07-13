const bcrypt = require('bcrypt');
const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'nourish',
    password: 'urpassword',
    port: 5432,
    local: 1
});

async function initializeUsers() {
  await client.connect();

  const users = [
    {
      email: 'admin@admin.com',
      password: 'admin',
      name: 'admin',
      tele: 'admin',
      residence: 'Tembusu',
      isadmin: true
    }
  ];

  for (const user of users) {
    const result = await client.query('SELECT * FROM "user" WHERE email = $1', [user.email]);
    if (result.rows.length === 0) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await client.query(
        'INSERT INTO "user" (email, password, name, tele, residence, isAdmin) VALUES ($1, $2, $3, $4, $5, $6)',
        [user.email, hashedPassword, user.name, user.tele, user.residence, user.isadmin]
      );
    }
  }

  await client.end();
}

initializeUsers().catch(err => console.error(err));
