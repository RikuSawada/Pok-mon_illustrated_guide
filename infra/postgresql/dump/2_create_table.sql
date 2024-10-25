\c
appdb;

DROP TABLE IF EXISTS chat_response;
DROP TABLE IF EXISTS chat_request;
DROP TABLE IF EXISTS feature_history;
DROP TABLE IF EXISTS prompts;
DROP TABLE IF EXISTS features;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS contract_info;
DROP TABLE IF EXISTS payment_method;
DROP TABLE IF EXISTS purchase_status;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS price;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS user_info;
DROP TABLE IF EXISTS sign_up;
DROP TABLE IF EXISTS open_ai_api_model;

CREATE TABLE open_ai_api_model
(
    id                 text PRIMARY KEY,
    model_name         text NOT NULL,
    model_display_name text NOT NULL
);

CREATE TABLE  sign_up
(
    id                      UUID    PRIMARY KEY,
    first_name              TEXT    NOT NULL,
    last_name               TEXT    NOT NULL,
    first_name_kana         TEXT    NOT NULL,
    last_name_kana          TEXT    NOT NULL,
    email                   TEXT    NOT NULL,
    postal_code             TEXT    NOT NULL,
    prefecture              TEXT    NOT NULL,
    city                    TEXT    NOT NULL,
    town_and_street         TEXT    NOT NULL,
    building_name           TEXT,
    username                TEXT    NOT NULL UNIQUE,
    password                TEXT    NOT NULL,
    enabled                 BOOLEAN NOT NULL DEFAULT FALSE,
    verification_code       TEXT    NOT NULL
);

CREATE TABLE user_info
(
    id                      SERIAL PRIMARY KEY,
    stripe_id               TEXT    NOT NULL,
    first_name              TEXT    NOT NULL,
    last_name               TEXT    NOT NULL,
    first_name_kana         TEXT    NOT NULL,
    last_name_kana          TEXT    NOT NULL,
    email                   TEXT    NOT NULL,
    postal_code             TEXT    NOT NULL,
    prefecture              TEXT    NOT NULL,
    city                    TEXT    NOT NULL,
    town_and_street         TEXT    NOT NULL,
    building_name           TEXT,
    username                TEXT    NOT NULL UNIQUE,
    password                TEXT    NOT NULL,
    account_non_expired     BOOLEAN NOT NULL DEFAULT TRUE,
    account_non_locked      BOOLEAN NOT NULL DEFAULT TRUE,
    credentials_non_expired BOOLEAN NOT NULL DEFAULT TRUE,
    enabled                 BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE user_roles
(
    user_info_id INTEGER NOT NULL,
    role         text    NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_info_id) REFERENCES user_info (id)
);

CREATE TABLE purchase_status
(
    id     SERIAL PRIMARY KEY,
    status text NOT NULL
);

CREATE TABLE payment_method
(
    id             SERIAL PRIMARY KEY,
    payment_method text NOT NULL
);

CREATE TABLE price
(
    id         TEXT PRIMARY KEY,
    product_id TEXT    NOT NULL,
    amount     INTEGER NOT NULL,
    currency   TEXT    NOT NULL,
    interval   TEXT,
    enabled    boolean NOT NULL
);

CREATE TABLE product
(
    id               TEXT PRIMARY KEY,
    default_price_id TEXT NOT NULL,
    name             TEXT NOT NULL,
    description      TEXT NOT NULL,
    enabled          boolean DEFAULT TRUE,
    FOREIGN KEY (default_price_id) REFERENCES price (id)
);

CREATE TABLE contract_info (
       id TEXT PRIMARY KEY,
       user_info_id INTEGER NOT NULL,
       product_id TEXT NOT NULL,
       price_id TEXT,
       invoice_id TEXT NOT NULL,
       price INTEGER NOT NULL,
       status TEXT NOT NULL,
       created TIMESTAMP NOT NULL,
       started TIMESTAMP,
       current_period_start TIMESTAMP,
       current_period_end TIMESTAMP,
       cancel_at TIMESTAMP,
       canceled_at TIMESTAMP,
       FOREIGN KEY (user_info_id) REFERENCES user_info(id),
       FOREIGN KEY (product_id) REFERENCES product(id),
       FOREIGN KEY (price_id) REFERENCES price(id)
);

CREATE TABLE employees
(
    id          INTEGER PRIMARY KEY,
    name        TEXT NOT NULL,
    icon_path   TEXT NOT NULL,
    description TEXT NOT NULL,
    enabled      BOOLEAN not null DEFAULT TRUE
);

CREATE TABLE features
(
    id          INTEGER PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    name        TEXT    NOT NULL,
    icon_path   TEXT    NOT NULL,
    description TEXT    NOT NULL,
    required_prod TEXT NOT NULL ,
    recommend   BOOLEAN NOT NULL,
    enabled      BOOLEAN not null DEFAULT TRUE,
    FOREIGN KEY (employee_id) REFERENCES employees (id),
    FOREIGN KEY (required_prod) REFERENCES product (id)
);

CREATE TABLE prompts
(
    id         INTEGER PRIMARY KEY,
    feature_id INTEGER NOT NULL,
    chat_num   INTEGER NOT NULL,
    role       TEXT    NOT NULL CHECK (role = 'system'),
    content    TEXT    NOT NULL,
    enabled    BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (feature_id) REFERENCES features (id)
);

CREATE TABLE feature_history
(
    id uuid PRIMARY KEY ,
    user_info_id INTEGER not null,
    feature_id   INTEGER NOT NULL,
    when_used TIMESTAMP not null,
    FOREIGN KEY (user_info_id) REFERENCES user_info (id),
    FOREIGN KEY (feature_id) REFERENCES features (id),
    CONSTRAINT unique_user_feature UNIQUE (user_info_id, feature_id)
);

CREATE TABLE chat_request
(
    id           uuid PRIMARY KEY,
    user_info_id INTEGER not null,
    feature_id   INTEGER NOT NULL,
    chat_num     INTEGER not null,
    role         text    not null CHECK (role = 'user'),
    content      text    not null,
    enabled      BOOLEAN not null DEFAULT TRUE,
    CONSTRAINT fk_user FOREIGN KEY (user_info_id) REFERENCES user_info (id),
    CONSTRAINT fk_features FOREIGN KEY (feature_id) REFERENCES features (id)
);

CREATE TABLE chat_response
(
    id           uuid PRIMARY KEY,
    chat_info_id uuid    NOT NULL,
    user_info_id INTEGER not null,
    feature_id   INTEGER not null,
    chat_num     INTEGER not null,
    role         text    not null CHECK (role = 'assistant'),
    content      text    not null,
    enabled      BOOLEAN not null DEFAULT TRUE,
    CONSTRAINT fk_chat_info_id FOREIGN KEY (chat_info_id) REFERENCES chat_request (id),
    CONSTRAINT fk_user FOREIGN KEY (user_info_id) REFERENCES user_info (id),
    CONSTRAINT fk_features FOREIGN KEY (feature_id) REFERENCES features (id)
);




