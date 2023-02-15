import * as mysql from 'mysql2/promise';

module.exports = async () => {
  // create a connection to the database
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
  });

  // drop the schema
  try {
    const [rows, fields] = await connection.execute(
      'DROP DATABASE IF EXISTS `test`'
    );
  } catch (error) {
    console.error(`Error executing query: ${error.message}`);
  } finally {
    console.log(`Schema test dropped successfully.`);
    connection.end();
  }
};
