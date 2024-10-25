\c appdb;

CREATE OR REPLACE PROCEDURE public.user_insert_procedure(
    stripe_id TEXT,
    first_name TEXT,
    last_name TEXT,
    first_name_kana TEXT,
    last_name_kana TEXT,
    email TEXT,
    postal_code TEXT,
    prefecture TEXT,
    city TEXT,
    town_and_street TEXT,
    building_name TEXT,
    input_username TEXT,
    password TEXT
)
AS $$
DECLARE
user_info_id int;
BEGIN
    -- USER_INFOへのINSERT。すべての値を引数から受け取る
INSERT INTO user_info (
    stripe_id, first_name, last_name, first_name_kana, last_name_kana,
    email, postal_code, prefecture, city, town_and_street, building_name, username, password
) VALUES (
             stripe_id, first_name, last_name, first_name_kana, last_name_kana,
             email, postal_code, prefecture, city, town_and_street, building_name, input_username, password
         );

-- 登録したUSER_INFOのidを取得
SELECT id INTO user_info_id FROM user_info WHERE username = input_username;

-- USER_ROLESへのINSERT。引数から受け取ったrole_nameを使用
INSERT INTO user_roles (user_info_id, role) VALUES (user_info_id, 'USER');

END;
$$
LANGUAGE plpgsql;
