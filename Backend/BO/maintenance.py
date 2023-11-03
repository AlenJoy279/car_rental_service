class maintenance():
    def __init__(self, car_id, start_date, desc, end_date=None):
        self.car_id = car_id
        self.start_date = start_date
        self.end_date = end_date
        self.desc = desc