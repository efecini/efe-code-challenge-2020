const app = require("express")();
const bodyParser = require("body-parser");
const pg = require('pg');

var client = new pg.Client({
    user: process.env.PGUSER, //env var: PGUSER
    database: process.env.PGDATABASE, //env var: PGDATABASE
    password: process.env.PGPASSWORD, //env var: PGPASSWORD
    host: process.env.PGHOST, // Server hosting the postgres database
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/getfee", async (req, res) => {
    const queryResult = await calculateHourlyEthFeeBetweenEOA();
    res.json(queryResult);
})

connectToDatabase();

app.listen(8080, () => console.log("Server is running on port 8080."));

async function connectToDatabase() {
    try {
        await client.connect();
    } catch (e) {
        console.error(`Failed to connect ${e}`)
    }
}

async function calculateHourlyEthFeeBetweenEOA() {
    try {
        // 1 ETH = 10^18 WEI
        const results = await client.query(
        `SELECT
            DATE_PART('epoch',DATE_TRUNC('HOUR',transactions.block_time)) as t , ROUND(SUM((transactions.gas_used*transactions.gas_price)/1000000000000000000)::numeric,2) as v
        FROM
            transactions
        WHERE
            transactions."to" NOT LIKE '0x0000000000000000000000000000000000000000' AND
            NOT EXISTS (SELECT address FROM contracts WHERE transactions."to" = contracts.address OR transactions."from" = contracts.address)
        GROUP BY
            DATE_TRUNC('HOUR',transactions.block_time)`
        );
        console.log(results.rows);
        return results.rows;
    } catch (e) {
        console.error(`Failed to make to query for calculateHouryEthFeeBetweenEOA: ${e}`)
        return [];
    }
}