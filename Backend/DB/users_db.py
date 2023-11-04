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
        self.keys = ('id', 'auth_id', 'email_text', 'full_name', 'phone')
        
    def init_db(self):
         self.curs.execute("""CREATE TABLE IF NOT EXISTS Users (
              user_id integer PRIMARY KEY AUTOINCREMENT,
              auth_id text NOT NULL,
              email text NOT NULL,
              full_name text NOT NULL,
              phone text)""")
              
    def populate_users(self):
        with self.conn:
            self.curs.executemany("INSERT INTO Users VALUES (?, ?, ?, ?, ?)", self.default_users)
            
    def insert_user(self, user):
        with self.conn:
            self.curs.execute("INSERT INTO Users VALUES (?, ?, ?, ?, ?)", 
                    (None, user.auth_id, user.email, user.full_name, user.phone))
                    
    def get_user_by_id(self, id):
        with self.conn:
            self.curs.execute("SELECT * FROM Users WHERE user_id=?", (id,))
            return fetchall_conversion(self.keys, self.curs.fetchall())
            
    def show_all_users(self):
        with self.conn:
            self.curs.execute("SELECT * FROM Users")
            return fetchall_conversion(self.keys, self.curs.fetchall())