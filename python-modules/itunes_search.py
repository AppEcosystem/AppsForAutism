import requests
import time

def get_item_by_id(id):
	time.sleep(.1)
	req = requests.get('https://itunes.apple.com/lookup', {'id': id})
	try:
		req = req.json()['results'][0]
	except:
		print(req.json());
		req = {"trackId": id,"trackName": "BAD_ID"}
	return req


# get_item_by_id(943680125)