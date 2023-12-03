from BO.user import user
from DB.utils import fetchall_conversion
import sqlite3

class usersDB():
    def __init__(self):
        self.conn = sqlite3.connect('DB/car_rental_user_maintenance.db', check_same_thread=False)
        self.conn.execute('PRAGMA foreign_keys = ON')
        self.curs = self.conn.cursor()
        self.default_users = [
            (None, '1', 'Neil Perkins', 'neilperkins@gmail.com', '0863817301'),
            (None, '2', 'Walter Young', 'walteryoung@gmail.com', '0872010312'),
            (None, '3', 'Justin Kemp', 'justinkemp@gmail.com', '08638918280'),
            (None, '4', 'Elena Armstrong', 'elenaarmstrongh@gmail.com', '0863819304'),
            (None, '5', 'Nina Cantrell', 'ninacantrell@gmail.com', '0877318230')
        ]
        self.keys = ('id', 'auth_id', 'full_name', 'email_text', 'phone')
        
    def init_db(self):
         self.curs.execute("""CREATE TABLE IF NOT EXISTS Users (
              user_id integer PRIMARY KEY AUTOINCREMENT,
              auth_id text NOT NULL UNIQUE,
              full_name text NOT NULL,
              email text NOT NULL UNIQUE, 
              phone text)""")
              
    def populate_users(self):
        with self.conn:
            self.curs.executemany("INSERT INTO Users (user_id, auth_id, full_name, email, phone) VALUES(?, ?, ?, ?, ?)", self.default_users)
            
    def insert_user(self, user):
        with self.conn:
            self.curs.execute("INSERT INTO Users (user_id, auth_id, email, full_name, phone) VALUES (?, ?, ?, ?, ?)",
                    (None, user.auth_id, user.email, user.full_name, user.phone))
                    
    def delete_user(self, id):
        with self.conn:
            self.curs.execute("DELETE FROM Users WHERE user_id=?", (id,))
                    
    def get_user_by_id(self, id):
        with self.conn:
            self.curs.execute("SELECT * FROM Users WHERE user_id=?", (id,))
            return fetchall_conversion(self.keys, self.curs.fetchall())
             
    def get_user_by_email(self, email):
        with self.conn:
            self.curs.execute("SELECT * FROM Users WHERE email=?", (email,))
            return fetchall_conversion(self.keys, self.curs.fetchall())

    def show_all_users(self):
        with self.conn:
            self.curs.execute("SELECT * FROM Users")
            return fetchall_conversion(self.keys, self.curs.fetchall())

    def update_user_by_id(self, user_id, data):

        with self.conn:
            try:
                self.curs.execute("UPDATE Users SET full_name = ?, phone = ? WHERE user_id = ?", (data["full_name"], data["phone"], user_id))
                self.conn.commit()
                return True
            except sqlite3.Error as e:
                print(f"Database error: {e}")
                return False
            except Exception as e:
                print(f"Exception in _query: {e}")
                return False