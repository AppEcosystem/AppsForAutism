from sqlmethods import PrioriDataDB
# from file_reader import Csv_helper
# from itunes_search import get_item_by_id
from priori_sraper import Scraper

# db = PrioriDataDB()
# csv = Csv_helper()

# ids = csv.readFile('/Users/masakistewart/App-Ecosystem/python-modules/autism_specific_csv/aspbergers.csv')
# count = 0

# for id in ids:
# 	count += 1
# 	data = get_item_by_id(id['app_id'])
# 	db.from_itunes_to_db(data)
# 	print(count)


# ids = csv.readFile('/Users/masakistewart/App-Ecosystem/python-modules/autism_specific_csv/asd.csv')
# count = 0

# for id in ids:
# 	count += 1
# 	data = get_item_by_id(id['app_id'])
# 	db.from_itunes_to_db(data)
# 	print(count)


# ids = csv.readFile('/Users/masakistewart/App-Ecosystem/python-modules/autism_specific_csv/apple_paid_autism.csv')
# count = 0
# for id in ids:
# 	count += 1
# 	data = get_item_by_id(id['app_id'])
# 	db.from_itunes_to_db(data)
# 	print(count)

# print('\n\n\n\n\n')

# ids = csv.readFile('/Users/masakistewart/App-Ecosystem/python-modules/autism_specific_csv/apple_free_autism.csv')
# count = 0

# for id in ids:
# 	count += 1
# 	data = get_item_by_id(id['app_id'])
# 	db.from_itunes_to_db(data)
# 	print(count)

# genres_object = {
#
# }
#
# genres = db.get_categories_android()
#
# for items in genres:
# 	item = items[0]
# 	if not item in genres_object:
# 		genres_object[item] = 1
# 	else:
# 		genres_object[item] += 1
# 		print(item)
#
# db.insert_categories(genres_object)


# for item in db.getAppIDs():
# 	print(item[0])
import time

s = Scraper()

s.switch_100()

count = 1
p = PrioriDataDB()
while count != 1500:
    urls = s.get_app_urls()
    p.insert_url(urls)
    s.click_next()
    time.sleep(2)
    count += 1
