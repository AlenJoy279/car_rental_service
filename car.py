class car():
    def __init__(self, make, model, year, type, transmission, powertrain,
                    vin_number, seats, cargo_capacity, status, price_per_day, range=None):
        self.make = make
        self.model = model
        self.year = year
        self.type = type
        self.transmission = transmission
        self.powertrain = powertrain
        self.vin_number = vin_number
        self.seats = seats
        self.cargo_capacity = cargo_capacity
        self.status = status
        self.price_per_day = price_per_day
        self.range = range