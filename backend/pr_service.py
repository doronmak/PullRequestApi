from data_managers.mongo_manager import MongoManager


class PullRequestsService(object):
    def __init__(self, data_manager: MongoManager):
        self.data_manager = data_manager

    def get_pull_requests(self):
        return self.data_manager.get_pull_requests()

    def add_pull_request(self, pull_request: dict):
        doc = self.data_manager.find_one_pull_request_by_number(pull_request.get("number"))
        if doc:
            raise Exception("doc with this number already found in db")
        if not self.is_status_valid(pull_request):
            raise Exception("status of pull request is not valid must be Open,Closed or Draft")
        if self.is_title_exist(pull_request):
            raise Exception("doc with this title already found in db")
        return self.data_manager.add_pull_request(pull_request)

    def is_title_exist(self, pull_request: dict):
        doc = self.data_manager.find_one_pull_request_by_title(pull_request.get("title"))
        if doc:
            return True
        return False

    def is_status_valid(self, pull_request: dict):
        if pull_request.get("status").lower() in ["open", "closed", "draft"]:
            return True
        else:
            return False
