from fastapi import FastAPI
from settings import config, resources
from fastapi.responses import JSONResponse
from data_managers.mongo_manager import MongoManager
from routers import prs
from pr_service import PullRequestsService
from fastapi.middleware.cors import CORSMiddleware


def init_routes(app: FastAPI, pr_service):
    @app.get(config.BASE_URL)
    def index():
        data = "Api is on fire!"
        return JSONResponse(content=data, status_code=200)

    app.include_router(prs.create_pr_router(pr_service), prefix=resources.PRS)


def init_service():
    mongo_manager = MongoManager()
    return PullRequestsService(mongo_manager)


def create_app():
    pr_service = init_service()
    app = FastAPI(title="Pull Requests API", openapi_url=config.OPEN_API_URL, docs_url=config.DOCS_URL,
                  redoc_url=config.REDOC_URL)

    origins = ["*"]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    init_routes(app, pr_service)
    return app
