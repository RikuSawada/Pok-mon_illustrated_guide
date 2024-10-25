\c
appdb;

INSERT INTO user_info (stripe_id, first_name, last_name, first_name_kana, last_name_kana, email,
                       postal_code, prefecture, city, town_and_street, building_name,
                       username, password)
VALUES ('asdfg', '太郎', '山田', 'タロウ', 'ヤマダ', 'taro.yamada@example.com',
        '100-0001', '東京都', '千代田区', '千代田1-1', '千代田ビルディング',
        'taro_yamada', '$2a$10$1vlglWdVCLW96Hj493IYFeQOXC6mq/47496lu5H1FvpWfy0pyQ/rK'),
       ('qwert', '花子', '田中', 'ハナコ', 'タナカ', 'hanako.tanaka@example.com',
        '100-0002', '東京都', '中央区', '日本橋2-2', '日本橋ビルディング',
        'hanako_tanaka', '$2a$10$1vlglWdVCLW96Hj493IYFeQOXC6mq/47496lu5H1FvpWfy0pyQ/rK');

--パスワードはエンコードされたpassword

INSERT INTO user_roles (user_info_id, role)
VALUES (1, 'ROLE_USER'),
       (1, 'ROLE_ADMIN'), -- Taro Yamadaには2つのロールを割り当てる例
       (2, 'ROLE_USER')
;

INSERT INTO open_ai_api_model(id, model_name, model_display_name)
VALUES ('1', 'gpt-3.5-turbo', 'GPT3.5'),
       ('2', 'gpt-4', 'GPT4');

INSERT INTO purchase_status(status)
VALUES ('処理中'),
       ('決済完了');

INSERT INTO payment_method(payment_method)
VALUES ('クレジットカード');

INSERT INTO price (id, amount, currency, enabled, interval, product_id)
VALUES ('price_1P6NLpCXrocY14EXzr2DWvIB', 11000, 'jpy', 't', 'year', 'prod_Pu5vWm8brWPhZX'),
       ('price_1P62IcCXrocY14EXmHKKloXe', 1000, 'jpy', 't', NULL, 'prod_Pu5vWm8brWPhZX'),
       ('price_1P4HnKCXrocY14EXomaRbqNc', 5000, 'jpy', 't', 'month', 'prod_Pu5z1SylqR1g2n'),
       ('price_1P4HjFCXrocY14EXwFn4b1Is', 1000, 'jpy', 't', 'month', 'prod_Pu5vWm8brWPhZX'),
       ('price_1P4H3ICXrocY14EXpym3He26', 1000, 'jpy', 't', NULL, 'prod_Pu5D3LNNmutwfo'),
       ('price_1P4H3ICXrocY14EXiqXAtD29', 1000, 'jpy', 't', 'month', 'prod_Pu5D3LNNmutwfo');

INSERT INTO product (id, default_price_id, name, description, enabled)
VALUES ('prod_Pu5z1SylqR1g2n', 'price_1P4HnKCXrocY14EXomaRbqNc', 'プレミアムプラン',
        'プレミアムプラン', 't'),
       ('prod_Pu5vWm8brWPhZX', 'price_1P4HjFCXrocY14EXwFn4b1Is', 'スタンダードプラン', '基本プラン',
        't'),
       ('prod_Pu5D3LNNmutwfo', 'price_1P4H3ICXrocY14EXiqXAtD29', 'スタンダードプラン(test)',
        '標準のプラン', 'f');

INSERT INTO employees(id, name, icon_path, description)
VALUES (1, 'John Doe', '/icons/john_doe.png', 'Senior Developer'),
       (2, 'Jane Smith', '/icons/jane_smith.png', 'Project Manager'),
       (3, 'Ella Fitzgerald', '/icons/ella_fitzgerald.png', 'UI/UX Designer');;

INSERT INTO features(id, employee_id, name, icon_path, description, required_prod, recommend)
VALUES (1, 1, 'Feature A', '/features/feature_a.png', 'Description of Feature A',
        'prod_Pu5vWm8brWPhZX', TRUE),
       (2, 2, 'Feature B', '/features/feature_b.png', 'Description of Feature B',
        'prod_Pu5vWm8brWPhZX', FALSE),
       (3, 3, 'Feature C', '/features/feature_c.png', 'Description of Feature C',
        'prod_Pu5z1SylqR1g2n', TRUE);;

INSERT INTO prompts(id, feature_id, chat_num, role, content, enabled)
VALUES (1, 1, 100, 'system', 'Content for Prompt 1 related to Feature A', TRUE),
       (2, 2, 101, 'system', 'Content for Prompt 2 related to Feature B', TRUE),
       (3, 3, 102, 'system', 'Content for Prompt 3 related to Feature C', TRUE);
