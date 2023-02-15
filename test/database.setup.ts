import * as mysql from 'mysql2/promise';

module.exports = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3305,
  });

  // drop the schema
  try {
    connection.query('DROP DATABASE IF EXISTS `test`');
    connection.query('CREATE DATABASE `test`');
    console.log(`Schema test created successfully.`);
    connection.end();
  } catch (error) {
    console.error(`Error executing query: ${error}`);
  } finally {
    connection.end();
  }
};
