const config = require("./config");


const getDbConnectionConfig = () => {
    if(config.NODE_ENV === "production") {
        return {
            connectionString: config.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        }
    };
    
    return {
        host: "127.0.0.1",
        user: "postgres",
        password: config.DATABASE_URL,
        database: "smartbrain",
    };
};

const database_config = {
    client: "pg",
    connection: getDbConnectionConfig(),
};


module.exports = {
    config: database_config
};
