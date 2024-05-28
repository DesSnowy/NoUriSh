CREATE DATABASE nourish;

\c nourish

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    password TEXT,
    tele VARCHAR(50)
);

CREATE TABLE "order" (
    id SERIAL PRIMARY KEY,
    canteen VARCHAR(50),
    stall VARCHAR(50),
    foodItem VARCHAR(255),
    price FLOAT,
    user_id INT,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES "user"(id)
);

INSERT INTO "user" (email, password, tele) VALUES ('mockMail@123', 'password123', '@john123');

INSERT INTO "order" (canteen, stall, foodItem, price, user_id) VALUES ('frontier', 'chinese', 'chicken rice', 3.50, 1);