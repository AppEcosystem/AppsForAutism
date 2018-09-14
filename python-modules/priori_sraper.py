import time
from selenium import webdriver


class Scraper:
    def __init__(self):
        priori_url = "https://www.prioridata.com/search/apps?search_text=autism"
        self.driver = webdriver.Firefox()
        self.driver.get(priori_url)
        time.sleep(2)

    def get_app_urls(self):
        element = self.driver.find_elements_by_tag_name('a')
        final = []
        for items in element:
            try:
                href = items.get_attribute('href')
                if href.find("https://prioridata.com/apps/") != -1:
                    final.append(href.replace('https://', ""))
            except:
                print("error")
        return final

    def switch_100(self):
        dropdown = self.driver.find_element_by_class_name("select2-selection")
        dropdown.click()
        time.sleep(2)
        final_target = self.driver.find_element_by_xpath('/html/body/span[2]/span/span[2]/ul/li[4]')
        action = webdriver.ActionChains(self.driver)
        action.move_by_offset(443.3999938964844, 893.0499877929688).click(final_target)
        action.perform()
        time.sleep(2)
        return self

    def click_next(self):
        self.driver.find_element_by_xpath('//*[@id="DataTables_Table_0_next"]/a').click()
        return self



