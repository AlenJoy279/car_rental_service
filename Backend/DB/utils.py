# ################################################
# ######     Code Taken From
# ######     https://stackoverflow.com/questions/47807446/convert-a-list-of-tuples-into-a-list-of-dict 
# ################################################

def fetchall_conversion(keys, car_data):
    return [dict(zip(keys, values)) for values in car_data]
