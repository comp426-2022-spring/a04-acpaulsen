const dbs = require('better-sqlite3')
const db = new dbs('log.db')
const sql = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name= 'accesslog'`);

let query = sql.get();
if (query == undefined) {
    console.log('Log database appears to be empty. Creating log database...')
    const sqlInit = `
    CREATE TABLE accesslog ( id INTERGER PRIMARY KEY, remoteaddr VARCHAR, remoteuser VARCHAR, time VARCHAR, method VARCHAR, 
        url VARCHAR, protocol VARCHAR, httpversion NUMERIC, status INTEGER, referer VARCHAR, useragent VARCHAR);
    `

    db.exec(sqlInit)
}
else {
    console.log('Log database exists.')
}

module.exports = db

//materials taken from lecture