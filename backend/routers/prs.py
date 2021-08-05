import datetime
from typing import Optional, List
from pydantic import BaseModel
from pr_service import PullRequestsService
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from fastapi.logger import logger


class PullRequestModel(BaseModel):
    number: int
    title: str
    description: Optional[str] = None
    author: str
    status: str
    labels: List[str] = []


class PullRequestOutModel(BaseModel):
    number: int
    title: str
    description: Optional[str] = None
    author: str
    status: str
    labels: List[str] = []
    creation_time: datetime.datetime


def create_pr_router(pr_service: PullRequestsService):
    pr_router = APIRouter()

    @pr_router.get('', response_model=list[PullRequestOutModel], response_model_exclude_unset=True)
    def get_pull_requests():
        try:
            pr_list = []
            response = pr_service.get_pull_requests()
            list_cur = list(response)
            for doc in list_cur:
                pr_list.append(
                    PullRequestOutModel(number=doc["number"], title=doc["title"], description=doc["description"],
                                        author=doc["author"],
                                        status=doc["status"], labels=doc["labels"], creation_time=doc["creation_time"]))
            return pr_list
        except Exception as e:
            if e.__str__() == "pull request was not found":
                return JSONResponse(content=e.__str__(), status_code=404)
            else:
                error = f"Got Exception when trying get pull requests {e.__str__()}"
                logger.exception(error)
                return JSONResponse(content=error, status_code=500)

    @pr_router.post('', response_model=PullRequestModel, response_model_exclude_unset=True)
    def add_pr(pr: PullRequestModel):
        try:
            creation_time = datetime.datetime.now()
            pr_updated = pr.dict()
            pr_updated['creation_time'] = creation_time
            pr_updated['status'] = pr_updated['status'].lower().capitalize()
            status = pr_service.add_pull_request(pr_updated)
            if not status:
                raise Exception(f"was error with insert {pr} to the db")
            return pr
        except Exception as e:
            if e.__str__() == "doc with this title already found in db" or e.__str__() == "doc with this number already found in db":
                return JSONResponse(content=e.__str__(), status_code=409)
            if e.__str__() == "status of pull request is not valid must be Open,Closed or Draft":
                return JSONResponse(content=e.__str__(), status_code=422)
            return JSONResponse(content=e.__str__(), status_code=500)

    return pr_router
