<?php
/** @noinspection ALL */
declare(strict_types=1);

namespace App;



use PDO;
use PDOStatement;

class NewsService
{
    private PDO $pdo;

    /**
     * CounterService constructor.
     * @param PDO $pdo
     */
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * @param string $query
     * @return bool|PDOStatement
     */
    private function prepare(string $query)
    {
        return $this->pdo->prepare($query);
    }
    // get all news
    public function getNews(): array
    {
        $query = "select * from newsletter ORDER BY id DESC";
        $statement = $this->prepare($query);
        $statement->execute();

        $newitems = array();
        while ($entry = $statement->fetchObject(NewsModel::class)) {
            $newitems[] = $entry;
        }
        return $newitems;
    }



    //get most from newsletter the latest (only 1) news
    public function getMostRecent(): array
    {
        $query = "select * from newsletter ORDER BY id DESC LIMIT 1";
        $statement = $this->prepare($query);
        $statement->execute();

        $mostRecent = array();
        while ($entry = $statement->fetchObject(NewsModel::class)) {
            $mostRecent[] = $entry;
        }
        return $mostRecent;
    }


    public function getNewsItem(int $id): ?NewsModel
    {
        $query = "select id,title,content from newsletter where id=:id";
        $statement = $this->prepare($query);
        $statement->execute(compact('id'));
        return $statement->fetchObject(NewsModel::class) ?: null;
    }

    public function createNewsItem(NewsModel $model): NewsModel
    {
        $query = "insert into newsletter (title,content) values (:title,:content);";
        $statement = $this->prepare($query);
        $statement->execute([
                'title'=>$model->title,
                'content'=>$model->content
            ]);
/* after inserting a row, get the id of the row back    */
        $id = (int)$this->pdo->lastInsertId();
        return $this->getNewsItem($id);
    }


    public function updateNewsItem(NewsModel $model): ?NewsModel
    {
        $query = "update newsletter set title=:title,content=:content,created=current_timestamp where id=:id;";
        $statement = $this->prepare($query);
        $statement->execute([
            'id' => $model->id,
            'title' => $model->title,
            'content' => $model->content
        ]);

        return $this->getNewsItem($model->id);
    }


    public function deleteNewsItem(int $id)
    {
        $query = "delete from newsletter where id=:id";
        $statement = $this->prepare($query);
        $statement->execute(['id' => $id]);
    }

    /********admin section ******/

    public function getAdminPosts(): array
    {
        $query = "select * from contactInfo ORDER BY id DESC";
        $statement = $this->prepare($query);
        $statement->execute();

        $newAdminItems = array();
        while ($entry = $statement->fetchObject(NewsModel::class)) {
            $newAdminItems[] = $entry;
        }
        return $newAdminItems;
    }

}
