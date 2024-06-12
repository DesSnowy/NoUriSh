CREATE DATABASE nourish;

\c nourish

CREATE TABLE "user" (
    email VARCHAR(255) PRIMARY KEY,
    password TEXT,
    name VARCHAR(255),
    tele VARCHAR(50),
    residence VARCHAR(50)
);

CREATE TABLE "order" (
    id SERIAL PRIMARY KEY,
    canteen VARCHAR(50) NOT NULL,
    stall VARCHAR(50) NOT NULL,
    food_item VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    tele VARCHAR(50) NOT NULL
);

CREATE TABLE "canteen" (
    canteen_id SERIAL PRIMARY KEY,
    canteen_name VARCHAR(50)
);

CREATE TABLE "stall" (
    stall_id SERIAL PRIMARY KEY,
    stall_name VARCHAR(50),
    canteen_id int,
    CONSTRAINT fk_canteen FOREIGN KEY(canteen_id) REFERENCES canteen(canteen_id)
);

CREATE TABLE "food" (
    food_id SERIAL PRIMARY KEY,
    food_name VARCHAR(50),
    price FLOAT NOT NULL,
    stall_id int,
     CONSTRAINT fk_stall FOREIGN KEY(stall_id) REFERENCES stall(stall_id)
);
