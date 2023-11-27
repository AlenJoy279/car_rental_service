class rental():
    def __init__(self, user_id, car_id, pick_up, start_date, start_time, drop_off,
                    end_date, end_time, total_cost, status, payment_status):
        self.user_id = user_id
        self.car_id = car_id
        self.pick_up = pick_up
        self.start_date = start_date
        self.start_time = start_time
        self.drop_off = drop_off
        self.end_date = end_date
        self.end_time = end_time
        self.total_cost = total_cost
        self.status = status
        self.payment_status = payment_status