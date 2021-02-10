<?php
declare(strict_types=1);

namespace App;
/*grouping files or classes */


use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

class NewsApi
{
    /**
     * @var NewsService
     */
    private NewsService $newsService;


    /**
     * NewsApi constructor.
     * @param NewsService $newsService
     */
    public function __construct(NewsService $newsService)
    {
        $this->newsService = $newsService;
    }

    public function setup(Group $group)
    {
        /* get all news */
        $group->get('', function (Request $request, Response $response, $args) {
            $response->getBody()->write(json_encode($this->newsService->getNews()));
            return $response->withHeader('Content-Type', 'application/json');
        });

        /*get most recent news */
      //  $group->get('', function (Request $request, Response $response, $args) {
     //       $response->getBody()->write(json_encode($this->newsService->getMostRecent()));
        //return $response->withHeader('Content-Type', 'application/json');
        //});

        /*create news */
        $group->post('', function (Request $request, Response $response, $args) {
            $model = $this->getNewsModelFromRequest();
            $returnModel = $this->newsService->createNewsItem($model);
            $response->getBody()->write(json_encode($returnModel));
            return $response->withHeader('Content-Type', 'application/json');
        });
        /* get news with id */
        $group->get('/{id}', function (Request $request, Response $response, $args) {
            $newsModel = $this->newsService->getNewsItem((int)$args['id']);
            if (!$newsModel) {
                $response->getBody()->write(json_encode(new ErrorModel("News item not found, bruh!")));
                return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
            }
            $response->getBody()->write(json_encode($newsModel));
            return $response->withHeader('Content-Type', 'application/json');
        });
        /* edit new items */
        $group->put('/{id}', function (Request $request, Response $response, $args) {
            $model = $this->getNewsModelFromRequest();
            $model->id = (int)$args['id'];
            $returnModel = $this->newsService->updateNewsItem($model);
            $response->getBody()->write(json_encode($returnModel));
            return $response->withHeader('Content-Type', 'application/json');
        });

        /* delete new items */
        $group->delete('/{id}', function (Request $request, Response $response, $args) {
            $this->newsService->deleteNewsItem((int)$args['id']);
            return $response->withStatus(204);
        });
    }

    /**
     * @return NewsModel
     */
    public function getNewsModelFromRequest(): NewsModel
    {
        $input = json_decode(file_get_contents('php://input'));
        $title = $input->title;
        $content = $input->content;
        return new NewsModel($title, $content);
    }
}
