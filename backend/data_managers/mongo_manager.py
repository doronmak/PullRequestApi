from settings.config import MONGO_URI
from pymongo import MongoClient


class MongoManager(object):
    def __init__(self):
        self.client = MongoClient(MONGO_URI)
        self.db_client = self.client.app
        self.prs_collections = self.db_client.prs

    def get_pull_requests(self):
        return self.prs_collections.find()

    def add_pull_request(self, pull_request):
        try:
            status = self.prs_collections.insert_one(pull_request)
        except Exception as e:
            print(e)
            return False
        return True

    def find_one_pull_request_by_number(self, number: int):
        doc = self.prs_collections.find_one({'number': number})
        return doc

    def find_one_pull_request_by_title(self, title: str):
        doc = self.prs_collections.find_one({'title': title})
        return doc
