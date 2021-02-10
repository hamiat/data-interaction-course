<?php
declare(strict_types=1);

namespace App;
/*grouping files or classes */


use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

class RecentNewsApi
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

        /*get most recent news */
        $group->get('', function (Request $request, Response $response, $args) {
            $response->getBody()->write(json_encode($this->newsService->getMostRecent()));
            return $response->withHeader('Content-Type', 'application/json');
        });
    }

}
