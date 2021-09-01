var mysql = require('mysql2');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'sqlTest', 
    password: 'testingSQL-', 
    database: 'MySQLServer'
});

con.connect(function(err){
    if(err) throw err;
    console.log("Hello World!\n");
    //Commented out the values 
    //var sql = "CREATE TABLE testing (name VARCHAR(255), address VARCHAR(255))";
    //var sql = "INSERT INTO testing (name, address) VALUES ('Dragons Lair LLC', 'My Place')";
    //var sql = "DROP TABLE customers";    //Deletes the table 
    //var sql = "UPDATE customers SET address = 'The Lair' WHERE address = 'My Place');
    //This is for the above two commands. 
    /*con.query(sql, function (err, result){
        if (err) throw err;
        console.log("Success");
    });
    //*/
    //Sample Querry for selecting something from the table.
    con.query("Select * FROM testing", function(err, result, fields){
        if(err) throw err;
        console.log(result);
    })
    //*/
    //results.affectedRows returns the number of rows that are returned by the query.
    //SQL query sample formats:
    //SELECT [*] FROM [table] WHERE [condition] ORDER BY [attribute] LIMIT [number]
    //SELECT user.name AS user, products.name AS favorite FROM users JOIN products ON users.favorite_product = product.id

});