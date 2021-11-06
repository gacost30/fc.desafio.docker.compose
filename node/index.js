const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const createSql = `CREATE TABLE IF NOT EXISTS people(name varchar(255))`
connection.query(createSql)

let lista = ''

app.get('/', (req,res) => {
    const names = ['Allan', 'Beatriz', 'Carol', 'Daniel', 'Erick', 'Fabiana', 'Gilson'];
    let name = names[Math.floor(Math.random()*names.length)]
    const insertSql = `INSERT INTO people(name) values('${name}')`
    connection.query(insertSql)

    const selectSql = `SELECT name FROM people`

    connection.query(selectSql, function (err, results, fields) {
        if (err) throw err;

        lista = ''
        
        for (i = 0; i < results.length; i++) {
            lista += results[i]['name'];
            lista += '<BR>';
        }
    })

    res.send('<h1>Full Cycle Rocks!</h1>' + lista)

    console.log('New Request')
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})
