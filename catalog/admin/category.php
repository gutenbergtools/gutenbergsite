<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once("pgcat.phh");

authenticate();

getstr("mode");
$caption = ucfirst($mode) . " Category";

pageheader($caption);

include_once("sqlform.phh");

class ListBooksTable extends MoreTable
{
    public function __construct()
    {
        $this->AddColumn(
            "<a href=\"book?mode=edit&fk_books=#pk#\">#pk#</a>",
            "Etext Nr.",
            "right",
            "1*"
        );
        $this->AddSimpleColumn("author", "Author");
        $this->AddSimpleColumn("title", "Title");
        $this->limit = 25;
        $this->relay = ["fk_categories", "mode", "filter"];
    }
}

$db = $config->db();
$db->logger = new logger();
$f = new SQLForm();
getint("fk_categories");
getstr("filter");

if (ismode("delete")) {
    $db->Exec("select count (*) as cnt from mn_books_categories " .
           "where fk_categories = $fk_categories");
    $cnt = $db->get("cnt");
    if ($cnt > 0) {
        $f->SubCaption("Warning: There are $cnt books related to this category. ");
    }
    $f->SubCaption("You are about to delete this category.");
    $f->SubCaption("Press the '$caption' button to continue or " .
            "hit the back button on your browser to dismiss.");
} else {
    $f->Text("category", "category", "Category", SQLCHAR, 80, 240, true);
    $f->LoadData("select * from categories where pk = $fk_categories");
}
$f->Hidden("fk_categories");
$f->Hidden("filter");

if (isupdatemode("add")) {
    $category_name = isset($_POST["category"]) ? $_POST["category"] : "";
    if ($f->Check()) {
        $formatter = $db->GetFormatter();
        $category_value = $formatter->f($category_name, SQLCHAR);
        if (!$db->Exec("select pk from categories where category = $category_value")) {
            error_msg("Could not check whether category already exists.");
        }
        if ($db->FirstRow()) {
            error_msg("Category '" . htmlspecialchars(htmlspecialchars($category_name,
                ENT_QUOTES, "UTF-8"), ENT_QUOTES, "UTF-8") . "' already exists!");
        }

        $sql = $f->mkInsert($formatter);
        if ($db->Exec("insert into categories " . $sql)) {
            msg("Category added !");
        } else {
            error_msg("Could not add category!");
        }
    }
}
if (isupdatemode("edit")) {
    $category_name = isset($_POST["category"]) ? $_POST["category"] : "";
    if ($f->Check()) {
        $formatter = $db->GetFormatter();
        $category_value = $formatter->f($category_name, SQLCHAR);
        if (!$db->Exec("select pk from categories where category = $category_value " .
            "and pk <> $fk_categories")) {
            error_msg("Could not check whether category already exists.");
        }
        if ($db->FirstRow()) {
            error_msg("Category '" . htmlspecialchars(htmlspecialchars($category_name,
                ENT_QUOTES, "UTF-8"), ENT_QUOTES, "UTF-8") . "' already exists!");
        }

        $sql = $f->mkUpdate($formatter);
        if ($db->Exec("update categories set " . $sql . "where pk = $fk_categories")) {
            msg("Category modified !");
        } else {
            error_msg("Could not modify category !");
        }
    }
}
if (isupdatemode("delete")) {
    $db->BeginTrans();
    $links_deleted = $db->Exec("delete from mn_books_categories where fk_categories = $fk_categories");
    $category_deleted = $links_deleted &&
        $db->Exec("delete from categories where pk = $fk_categories");

    if ($category_deleted && $db->Commit()) {
        msg("Category deleted !");
    } else {
        $db->Rollback();
        error_msg("Could not delete category !");
    }
}

if (isupdate()) {
    if (!isupdatemode("delete")) {
        echo("    <p><a href=\"category?mode=edit&filter=$filter&fk_categories=$fk_categories\">" .
          "Back to Category</a></p>\n\n");
    }
} else {
    $f->Output($caption, $caption);
}

echo("    <p><a href=\"categories_list?filter=$filter\">" .
      "Back to Category List</a></p>\n\n");

pagefooter();
