# something else
import csv
from sqlmethods import PrioriDataDB

db_methods = PrioriDataDB()

class Csv_helper():
    def readFile(self, filename):
        with open(filename, 'r') as csvfile:
            csvfile.readline()
            reader = csv.reader(csvfile)
            names_ids = []
            for item in reader:
                names_ids.append({
                    "app_id": item[0]
                })
                # names_ids.append(item)
            # for item in names_ids:
            #     print(item['app_id'])
            print(len(names_ids))
        return names_ids



    def apps_to_objs(self):
        csv = Csv_helper()
        apps = []
        # items = csv.readFile('appCheck.csv')
        # for item in items:
        #     apps.append(db_methods.get_metadata_from_appID(item[1])[0])
        apps = db_methods.get_app_and_name()
        app_objs = []
        for app in apps:
            app_obj = {
                "app_name": app[1],
                "app_id": app[0],
                'autism specific': 0,
                "edutainment":0,
                'a1': 0,
                'a2': 0,
                'a3': 0,
                'a4': 0,
                'a5': 0,
                'b1': 0,
                'b2': 0,
                'b3': 0,
                'c1': 0,
                'c2': 0,
                'c3': 0,
                'c4': 0,
                "linked_queries": []
            }
            app_objs.append(app_obj)
        return app_objs

    def find_obj_and_append_query(self, app_id, list_of_objs, query, group_title):
        for obj in list_of_objs:
            for key in obj:
                if obj[key] == app_id:
                    obj['linked_queries'].append(query)
                    # obj['group_titles'].append(group_title)
                    obj[group_title] += 1
        return list_of_objs

    def read_file_for_queries(self, keywords_csv):
        apps_objs = self.apps_to_objs()
        groupTitles = ['autism specific','edutainment',
                       "a1", "a2",
                       "a3","a4", "a5",
                       "b1", "b2", "b3",
                       "c1", "c2", "c3", "c4"]

        with open(keywords_csv, 'r') as csvfile:
            csvfile.readline()
            lines = csv.reader(csvfile)
            count = 0
            for line in lines:
                if len(line) == 0:
                    count += 1
                else:
                    results = db_methods.search_table(line[0])
                    for tuple in results:
                        apps_objs = self.find_obj_and_append_query(tuple[0], apps_objs, line[0], groupTitles[count])
        # print(count, len(groupTitles) - 1)
        return apps_objs

    def obj_to_csv(self, list_of_objs):
        with open('list.csv', 'a', newline='') as csvfile:
            writer = csv.writer(csvfile, delimiter=',')
            for obj in list_of_objs:
                listqueries = str(obj['linked_queries']).replace(',', '.').replace('[', '').replace(']', '')
                # listgrouping = str(obj['group_titles']).replace(',', '.').replace('[', '').replace(']', '')
                writer.writerow([obj["app_name"], obj['app_id'], listqueries, obj["autism specific"],
                                 obj["edutainment"],
                                 obj['a1'], obj['a2'], obj['a3'], obj['a4'],obj['a5'],
                                 obj['b1'], obj['b2'], obj['b3'],
                                 obj['c1'],obj['c2'], obj['c3'], obj['c4']])
        print('done')
