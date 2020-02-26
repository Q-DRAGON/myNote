import sqlite3

def create(conn):
    sql_create = '''
    CREATE TABLE `users`(
        `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        `username` TEXT NOT NULL UNIQUE,
        `password` TEXT NOT NULL,
        `email` TEXT NOT NULL
    )
    '''
    conn.execute(sql_create)


def insert(conn, username, password, email):
    sql_insert = """
    INSERT INTO
        `users`(`username`, `password`, `email`)
    VALUES
        (?, ?, ?)
        """
    conn.execute(sql_insert, (username, password, email))
    print('insert success')


def select(conn):
    sql_query = """
    SELECT
        *
    FROM
        users
    """
    values = conn.execute(sql_query)
    for v in values:
        print(v)


def delete(conn, user_id):
    sql_delete = """
    DELETE FROM
        `users`
    WHERE
        `id`=?
    """
    conn.execute(sql_delete, (user_id,))
    print('delete success of {}'.format(user_id))


def delete_all(conn):
    sql_delete = """
    DELETE FROM
        `users`
    """
    conn.execute(sql_delete)


def update(conn, user_id, email):
    sql_update = """
    UPDATE
        `users`
    SET
        `email`=?
    WHERE
        `id`=?
    """
    conn.execute(sql_update, (email, user_id))


def main():
    db_path = "demo.sqlite"
    conn = sqlite3.connect(db_path)
    # create(conn)
    # delete_all(conn)
    insert(conn, 'woyao', '123', "@123")
    insert(conn, 'tom', '111', '@321')
    update(conn, 2, '@tom')
    select(conn)
    delete(conn, 1)
    select(conn)

    conn.commit()
    conn.close()

if __name__ == '__main__':
    main()
