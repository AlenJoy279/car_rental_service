class user():
    def __init__(self, auth_id, email, full_name, phone=None):
        self.auth_id = auth_id
        self.email = email
        self.full_name = full_name
        self.phone = phone