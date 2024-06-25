CREATE DATABASE nourish;

\c nourish

CREATE TABLE "user" (
    email VARCHAR(255) PRIMARY KEY,
    password TEXT,
    name VARCHAR(255),
    tele VARCHAR(50),
    residence VARCHAR(50)
);

CREATE TABLE "canteen" (
    canteen_id SERIAL PRIMARY KEY,
    canteen_name VARCHAR(50),
    canteen_image VARCHAR(500)
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
    description VARCHAR(255),
     CONSTRAINT fk_stall FOREIGN KEY(stall_id) REFERENCES stall(stall_id)
);

CREATE TABLE "group" (
    group_id SERIAL PRIMARY KEY,
    canteen_id int,
    residence VARCHAR(50),
    status BOOLEAN,
    user_email VARCHAR(255),
    CONSTRAINT fk_canteen FOREIGN KEY(canteen_id) REFERENCES canteen(canteen_id),
    CONSTRAINT fk_user FOREIGN KEY(user_email) REFERENCES "user"(email)
);

CREATE TABLE "order" (
    order_id SERIAL PRIMARY KEY,
    canteen VARCHAR(50),
    stall VARCHAR(50),
    fooditem VARCHAR(50),
    user_email VARCHAR(255),
    group_id INT,
    quantity INT,
    price FLOAT,
    created_time TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY(user_email) REFERENCES "user"(email)
);

INSERT INTO canteen (canteen_name, canteen_image)VALUES
('frontier', 'https://uci.nus.edu.sg/oca/wp-content/uploads/sites/9/2018/05/Frontier-Canteen-1024x684.jpg'),
('deck', 'https://uci.nus.edu.sg/oca/wp-content/uploads/sites/9/2018/05/deck.jpg');

INSERT INTO stall (stall_name, canteen_id) VALUES
('chinese_frontier', 1),
('korean_frontier', 1),
('western_deck', 2),
('pasta_deck', 2);

INSERT INTO food (food_name, price, stall_id, description) VALUES
('chicken rice', 3.5, 1, 'chicken rice description'),
('chicken noodle',3.5, 1, 'some good noodles');

INSERT INTO "user" VALUES
('test123@test.com', 'some random hashed password', 'tester', 'test123', 'PGP');

INSERT INTO "group" (canteen_id, residence, status, user_email) VALUES
(1, 'PGP', true, 'test123@test.com'),
(2, 'Tembusu', true, 'test123@test.com');