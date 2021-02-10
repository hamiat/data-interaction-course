<?php
declare(strict_types=1);

namespace App;


use Slim\App;
use Slim\Factory\AppFactory;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;
use Slim\Psr7\Request;
use Slim\Psr7\Response;

class Api
{
    private App $app;

    /**
     * Api constructor.
     */
    public function __construct()
    {
        $this->app = AppFactory::create();

        $this->setup($this->app);
    }

    public function run()
    {
        $this->app->run();
    }

    function getDatabaseSettings(): DatabaseSettings
    {
        $settings = new DatabaseSettings();
        $settings->username = getenv('MYSQL_USERNAME');
        $settings->password = getenv('MYSQL_PASSWORD');
        $settings->host = getenv('MYSQL_HOST');
        $settings->database = getenv('MYSQL_DATABASE');
        $settings->sslCa = getenv('MYSQL_SSL_CA');
        $settings->sslKey = getenv('MYSQL_SSL_KEY');
        $settings->sslCert = getenv('MYSQL_SSL_CERT');

        if (!file_exists($settings->sslCa) || !file_exists($settings->sslKey) || !file_exists($settings->sslCert)) {
            error_log("Missing MySQL SSL files");
            die();
        }

        return $settings;
    }

    private function setup(App $app): App
    {
        $settings = $this->getDatabaseSettings();
        $pdoFactory = new PdoFactory($settings);
        $pdo = $pdoFactory->createPdo();


        $app->options('/{routes:.*}', function (Request $request, Response $response) {
            // CORS Pre-Flight OPTIONS Request Handler
            return $response;
        });

        //all news uses NewsApi
        $newsApi = new NewsApi(new NewsService($pdo));
        $app->group('/api/newsletter', function (Group $group) use ($newsApi) {
            $newsApi->setup($group);
        });

        //recent news - uses RecentNewsApi
        $recentNewsApi = new RecentNewsApi(new NewsService($pdo));
        $app->group('/api/recent', function (Group $group) use ($recentNewsApi) {
            $recentNewsApi->setup($group);
        });

        //get admin posts - uses AdminPostsAPI
        $recentNewsApi = new AdminPostsAPI(new NewsService($pdo));
        $app->group('/api/adminposts', function (Group $group) use ($recentNewsApi) {
            $recentNewsApi->setup($group);
        });



        return $app;
    }

}
