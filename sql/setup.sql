-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS todos CASCADE;
DROP TABLE IF EXISTS todousers CASCADE;

CREATE TABLE todousers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_hash VARCHAR NOT NULL
);

CREATE TABLE todos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT,
  todo VARCHAR NOT NULL,
  complete BOOLEAN, 
  FOREIGN KEY (user_id) REFERENCES todousers(id)
);