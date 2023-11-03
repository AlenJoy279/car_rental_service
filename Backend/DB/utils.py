def fetchall_conversion(keys, car_data):
    return [dict(zip(keys, values)) for values in car_data]