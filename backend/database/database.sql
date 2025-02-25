CREATE DATABASE nourish;

\c nourish

CREATE TABLE "user" (
    email VARCHAR(255) PRIMARY KEY,
    password TEXT,
    name VARCHAR(255),
    tele VARCHAR(50),
    residence VARCHAR(50),
    isAdmin BOOLEAN DEFAULT FALSE
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
    incomplete BOOLEAN,
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
    status VARCHAR(50),
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
('pasta_deck', 2),
('Japanese_deck', 2);

INSERT INTO food (food_name, price, stall_id, description) VALUES
('Chicken Rice', 3.5, 1, 'Tender chicken served with aromatic rice and savory sauce.'),
('Chicken Noodle',3.5, 1, 'Succulent chicken with flavorful noodles in a savory broth.'),
('Korean Chicken', 5, 2, 'Crispy, spicy Korean-style chicken with a tangy sauce.'),
('Fish N Chip', 4, 3, 'Crispy battered fish served with golden fries and tartar sauce.'),
('Carbonara Pasta', 5, 4, 'Creamy pasta with pancetta, egg, and Parmesan cheese.'),
('Kimbap', 4, 2, 'Korean rice rolls filled with vegetables, meat, and egg.'),
('Ginseng Chicken Soup', 4, 2,'Hearty Korean soup with tender chicken, ginseng, and aromatic herbs.'),
('Chicken Katsu Don', 4.5, 5, 'Crispy chicken cutlet served over rice with savory sauce and egg.');


INSERT INTO "user" VALUES
('test123@test.com', '$2b$10$ZK/aOSzuezgKps6ISJsMpOZNChlYcJoTWXcGnY9GMaJwPX/2zDLFC', 'tester', 'test123', 'PGP', false),
('admin@admin.com', '$2b$10$ZK/aOSzuezgKps6ISJsMpOZNChlYcJoTWXcGnY9GMaJwPX/2zDLFC', 'admin', 'admin', 'PGP', true);

INSERT INTO "group" (canteen_id, residence, status, incomplete, user_email) VALUES
(1, 'PGP', true, true,'test123@test.com'),
(2, 'Tembusu', true, true,'test123@test.com');

