import psycopg2
import xlrd
import time
import csv
import simplejson


# this is a database class for getting and setting data in a postgreSQL database
class PrioriDataDB:
    # will run automatically on instantiation
    def __init__(self):
        try:
            # if this was a db that was online I would include a login password and a connection url
            self.connection = psycopg2.connect("dbname=asdecosystem user=masakistewart")
            self.cursor = self.connection.cursor()
        except:
            print("could not connect!")

    def connect(self):
        try:
            # if this was a db that was online I would include a login password and a connection url
            self.connection = psycopg2.connect("dbname=asdecosystem user=masakistewart")
            self.cursor = self.connection.cursor()
        except:
            print("could not connect!")

    # def add_name_into_metadata(self):
    #     self.connect()
    #     sql = "SELECT name, app_id From appInfoV2 WHERE metadata IS NOT NULL"
    #     self.cursor.execute(sql)
    #     objs = self.cursor.fetchall()
    #     for item in objs:
    #         sql2 = "UPDATE appInfoV2 SET metadata"

    def get_metadata_from_appID(self, appID):
        self.connect()
        sql = "SELECT app_id, name, metadata FROM appInfoV2 Where app_id = " + str(appID)
        self.cursor.execute(sql)
        data = self.cursor.fetchall()
        return data

    def findAppIDByName(self, appName):
        print(appName)
        self.connect()
        sql = "SELECT app_id FROM appInfoV2 WHERE name = " + "'" + str(appName) + "'"
        self.cursor.execute(sql)
        data = self.cursor.fetchall()
        return data

    # function gets all data from db in the form list or tuple form
    def getAllFromAppInfo(self):
        self.connect()
        sql = "SELECT app_id, name, publisher, metadata FROM appInfoV2 WHERE metadata IS NOT NULL;"
        self.cursor.execute(sql)
        data = self.cursor.fetchall()
        self.closeShop()
        return data

    # sets into database with the values in order of name, publisher, app_id
    # insert_into was used to set the first batch of data before gathering metadata
    def insertInto(self, values):
        self.connect()
        sql = "INSERT INTO finalTableAndroid (app_id, app_name) VALUES (%s, %s);"
        data = (values[0], values[1])
        self.cursor.execute(sql, data)
        self.connection.commit()
        print('done')

    def insert_name_id(self, tablename, data):
        try:
            self.connect()
            # print(data)
            sql = "INSERT INTO appInfo (name, app_id) VALUES (%s, %s)"
            self.cursor.execute(sql, (data[0], data[1],))
            self.connection.commit()
            self.closeShop()
            print('done')
        except:
            print('this')

    # get data from a xls file used early with the first batch of data
    def getFromXLS(self, filename, tableName):
        self.connect()
        thing = xlrd.open_workbook(filename)
        sheet_names = thing.sheet_names()
        sheet = thing.sheet_by_name(tableName)
        print(sheet.nrows, sheet.name, sheet.ncols)
        for rx in range(sheet.nrows):
            tmp_tuple = sheet.row(rx)[0].value, sheet.row(rx)[1].value, sheet.row(rx)[6].value
            tmp_list = list(tmp_tuple)
            print(tmp_list)
            if tmp_list[0] != 'App name':
                self.insertInto(tmp_list)
            else:
                print("bullet dodged")

    # close the connection to the database
    def closeShop(self):
        connection = self.connection
        self.cursor.close()
        connection.close()
        print("connection and cursor closed")

    # check if it does or does not exits... to be finished
    def addIfDoesNotExist(self, newItems):
        self.connect()
        dbEntries = self.getAllFromAppInfo()
        ledger = {}
        count = 0
        for entry in dbEntries:
            ledger[entry[1]] = "already there"
        for item in newItems:
            try:
                ledger[item[1]]
                print("item: ", item, "has already been added")
            except Exception as e:
                count += 1
                self.insert_name_id('appInfo', newItems)
        print("there were ", count, " added out of ", len(newItems))

    # get only the appIDs from the appInfo table
    def getAppIDs(self):
        self.connect()
        sql = "SELECT app_id FROM finalTableAndroid;"
        self.cursor.execute(sql)
        data = self.cursor.fetchall()
        self.closeShop()
        print(len(data), " items in database")
        return data

    def getAppIDsAndrd(self):
        self.connect()
        sql = "SELECT app_id FROM finalTableAndroid;"
        self.cursor.execute(sql)
        data = self.cursor.fetchall()
        self.closeShop()
        print(len(data), " items in database")
        return data

    def getAppIDs(self):
        self.connect()
        sql = "SELECT app_id FROM finalTableandroid;"
        self.cursor.execute(sql)
        data = self.cursor.fetchall()
        self.closeShop()
        print(len(data), " items in database")
        return data

    def get_app_and_name(self):
        self.connect()
        sql = 'SELECT app_id, app_name FROM finalTableAndroid WHERE metadata IS NOT NULL'
        self.cursor.execute(sql)
        data = self.cursor.fetchall()
        self.closeShop()
        return data

    # insert the metadata into the table containing the app_id, publisher etc.
    def insertMetadata(self, appID, metadata):
        self.connect()
        cursor = self.connection.cursor()
        # sql = "SELECT name FROM appInfo WHERE app_id = " + str(appID)
        # cursor.execute()
        # names = cursor.fetchall()
        # print(names)
        # metadata = names[0][0] + " \n" + metadata
        cursor.execute("""UPDATE finalTableAndroid SET metadata = %s WHERE app_id = %s""", (metadata, appID,))
        self.connection.commit()
        self.closeShop()
        print('metadata for: ', appID, "was succesfully added")

    # create a new .csv file
    def table_to_csv(self):
        items = self.getAllFromAppInfo()
        with open('metadataV2.csv', 'a', newline='') as csvfile:
            writer = csv.writer(csvfile, delimiter=',')
            column_names = ('id', 'app_id', 'publisher', 'metadata', 'name')
            writer.writerow(column_names)
            for item in items:
                tmp_list = []
                for it in item:
                    if type(it) == str:
                        it = it.replace(',', '.')
                        tmp_list.append(it)
                    else:
                        tmp_list.append(it)
                        print("skipped")
                writer.writerow(tmp_list)
            print('csv formatting finished')

    def getBadIDs(self):
        sql = "SELECT app_id, name, publisher, metadata FROM appInfoV2 WHERE metadata IS NULL"
        self.connect()
        self.cursor.execute(sql)
        apps = self.cursor.fetchall()
        return apps

    def search_table(self, query):
        self.connect()
        sql = "SELECT app_id FROM finalTableAndroid WHERE to_tsvector(metadata) @@ plainto_tsquery('" + query + "')"
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        self.closeShop()
        print(result)
        return result

    def to_tsvector(self, query):
        self.connect()
        self.cursor.execute("SELECT to_tsvector('" + query + "')")
        res = self.cursor.fetchall()
        self.closeShop()
        return res[0]

    def from_itunes_to_db(self, data):
        self.connect()
        try:
            if not 'userRatingCountForCurrentVersion' in data:
                data['userRatingCountForCurrentVersion'] = 0.0
            if not 'averageUserRating' in data:
                data['averageUserRating'] = 0.0
            if not 'userRatingCount' in data:
                data['userRatingCount'] = 0.0
            # if hasattr(data, 'genres'):
            #     data['genres'] = {'genres': data['genres']}
            # if hasattr(data, 'languageCodesISO2A'):
            #     data['languageCodesISO2A'] = {'languageCodesISO2A': data['languageCodesISO2A']}
            # if hasattr(data, 'supportedDevices'):
            #     data['supportedDevices'] = {'supportedDevices': data['supportedDevices']}
            self.cursor.execute("""INSERT INTO app_table (
                                                          app_id,
                                                          app_name,
                                                          details,
                                                          release_date,
                                                          artist_id,
                                                          advisories,
                                                          average_user_rating,
                                                          average_user_recent_rating,
                                                          content_advisory_rating,
                                                          currency,
                                                          current_version_release_date,
                                                          features,
                                                          description,
                                                          price, 
                                                          primary_genre,
                                                          language_code,
                                                          minimum_os_version,
                                                          seller_name,
                                                          supported_devices,
                                                          age_rating,
                                                          user_rating_count,
                                                          icon,
                                                          screenshots,
                                                          version,
                                                          genres
                                                          ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
                                (data['trackId'],
                                 data['trackName'],
                                 simplejson.dumps(data),
                                 data['releaseDate'],
                                 data['artistId'],
                                 simplejson.dumps(data['advisories']),
                                 data['averageUserRating'],
                                 data['userRatingCountForCurrentVersion'],
                                 data['contentAdvisoryRating'],
                                 data['currency'],
                                 data['currentVersionReleaseDate'],
                                 simplejson.dumps(data['features']),
                                 data['description'],
                                 data['price'],
                                 data['primaryGenreName'],
                                 simplejson.dumps(data['languageCodesISO2A']),
                                 data['minimumOsVersion'],
                                 data['sellerName'],
                                 simplejson.dumps(data['supportedDevices']),
                                 data['trackContentRating'],
                                 data['userRatingCount'],
                                 data['artworkUrl60'],
                                 data['ipadScreenshotUrls'],
                                 data['version'],
                                 simplejson.dumps(data['genres'])
                                 ));
            print('done added: ', data['trackName'])
        except Exception as e:
            print(e)
            print('')
            print(data)
        self.connection.commit()
        self.closeShop()

    def get_categories(self):
        self.connect()
        self.cursor.execute('SELECT primary_genre FROM app_table;')
        genres = self.cursor.fetchall()
        self.closeShop()
        return genres

    def get_categories_android(self):
        self.connect()
        self.cursor.execute('SELECT genre FROM app_table_gplay')
        genres = self.cursor.fetchall()
        self.closeShop()
        return genres

    def insert_categories(self, object):
        self.connect()
        for genre in object:
            self.cursor.execute("""INSERT INTO categories_table (category, amount) VALUES (%s, %s);""", (genre, object[genre]))
            self.connection.commit()
        print('done')
        self.closeShop()

    def insert_url(self, urls):
        self.connect()
        count = 0
        for url in urls:
            count += 1
            statement = """INSERT INTO PrioriDataUrls (url) VALUES ('{0}');""".format(url)
            print(statement)
            self.cursor.execute(statement)
        self.connection.commit()
        print(count, "urls have been added to the PrioriDataUrls table")
        time.sleep(2)
        self.closeShop()
