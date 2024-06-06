CREATE DATABASE nourish;

\c nourish

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    password TEXT,
    name VARCHAR(255),
    tele VARCHAR(50),
    residence VARCHAR(50)
);

CREATE TABLE "order" (
    id SERIAL PRIMARY KEY,
    canteen VARCHAR(50),
    stall VARCHAR(50),
    foodItem VARCHAR(255),
    price FLOAT,
    tele VARCHAR(50)
);
