class user():
    def __init__(self, auth_id, email, full_name, phone=None):
        self.auth_id = auth_id
        self.full_name = full_name
        self.email = email
        self.phone = phone