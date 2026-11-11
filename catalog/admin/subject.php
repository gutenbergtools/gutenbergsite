<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once("pgcat.phh");

authenticate();

getstr("mode");
$caption = ucfirst($mode) . " Subject";

pageheader($caption);

include_once("sqlform.phh");

class ListBooksTable extends MoreTable
{
    public function __construct() {
        $this->AddColumn(
            "<a href=\"book?mode=edit&fk_books=#pk#\">#pk#</a>",
            "Etext Nr.",
            "right",
            "1*"
        );
        $this->AddSimpleColumn("author", "Author");
        $this->AddSimpleColumn("title", "Title");
        $this->limit = 25;
        $this->relay = ["fk_subjects", "mode", "filter"];
    }
}

$db = $config->db();
$db->logger = new logger();
$f = new SQLForm();
getint("fk_subjects");
getstr("filter");

if (($mode === "edit" || $mode === "delete") &&
    ($fk_subjects === null || $fk_subjects < 1)) {
    error_msg("Invalid subject ID.");
}

$subject_name = "";
$subject_exists = false;

if ($fk_subjects !== null &&
    $db->Exec("select subject from subjects where pk = $fk_subjects")) {
    //it will make life nicer if the message includes *what* subject was linked.
    $subject_exists = $db->FirstRow();
    if ($subject_exists) {
        $subject_name = $db->Get("subject");
    }
}
if (($mode === "edit" || $mode === "delete") && !$subject_exists) {
    error_msg("Subject not found.");
}
if (!$subject_name) {
    /* if getting the actual name fails for some reason, use the internal number instead;
     at least it is something...*/
    $subject_name = "Internal #: $fk_subjects";
}

if (ismode("delete")) {
    $db->Exec("select count (*) as cnt from mn_books_subjects " .
        "where fk_subjects = $fk_subjects");
    $cnt = $db->get("cnt");
    $safe_subject_name = htmlspecialchars($subject_name, ENT_QUOTES, "UTF-8");
    if ($cnt > 0) {
        $f->SubCaption("Warning: There are $cnt books related to \"$safe_subject_name\". ");
    }
    $f->SubCaption("You are about to delete \"$safe_subject_name\".");
    $f->SubCaption("Press the '$caption' button to continue or " .
        "hit the back button on your browser to dismiss.");
} else {
    $f->Text("subject", "subject", "Subject", SQLCHAR, 80, 240, true);
    $f->LoadData("select * from subjects where pk = $fk_subjects");

}
$f->Hidden("fk_subjects");
$f->Hidden("filter");

if (isupdatemode("add")) {
    $subject_name = $_POST["subject"];
    if ($f->Check()) {
        $formatter = $db->GetFormatter();
        $subject_value = $formatter->f($subject_name, SQLCHAR);
        if (!$db->Exec("select pk from subjects where subject = $subject_value")) {
            error_msg("Could not check whether subject already exists.");
        }
        if ($db->FirstRow()) {
            error_msg("Subject '$subject_name' already exists!");
        }

        $sql = $f->mkInsert($formatter);
        if ($db->Exec("insert into subjects " . $sql . " returning pk")) {
            $fk_subjects = $db->Get("pk", SQLINT);
            msg("Subject  '$subject_name' added !");
        } else {
            error_msg("Could not add subject '$subject_name'!");
        }
    }
}

if (isupdatemode("edit")) {
    $subject_name = $_POST["subject"];
    if ($f->Check()) {
        $sql = $f->mkUpdate($db->GetFormatter());
        if ($db->Exec("update subjects set " . $sql . "where pk = $fk_subjects")) {
            msg("Subject '$subject_name' modified !");
        } else {
            error_msg("Could not modify subject '$subject_name'!");
        }
    }
}

if (isupdatemode("delete")) {
    $db->BeginTrans();
    $links_deleted = $db->Exec("delete from mn_books_subjects where fk_subjects = $fk_subjects");
    $subject_deleted = $links_deleted &&
        $db->Exec("delete from subjects where pk = $fk_subjects");

    if ($subject_deleted && $db->Commit()) {
        msg("Subject '$subject_name' deleted !");
    } else {
        $db->Rollback();
        error_msg("Could not delete subject '$subject_name'!");
    }
}

if ($fk_subjects) {
    echo("Internal Subject #: <b> $fk_subjects </b><br>");
    //Only display the Internal # when it exists. ;-)
}
if (isupdate()) {
    if (!isupdatemode("delete")) {
        $safe_subject_name = htmlspecialchars($subject_name, ENT_QUOTES, "UTF-8");
        echo("    <p><a href=\"subject?mode=edit&filter=$filter" .
            "&fk_subjects=$fk_subjects\">" .
            "Back to Subject \"$safe_subject_name\"</a></p>\n\n");
    }
} else {
    $f->Output($caption, $caption);

    if (ismode("edit")) {
        echo("<br>" .
          "<a href=\"subject?filter=$filter&mode=delete" .
          "&fk_subjects=$fk_subjects\">" .
          "Delete Subject</a>\n");

        $table = new ListBooksTable();
        $db->Exec("select fk_books as pk, text as title, author " .
               "from (mn_books_subjects join attributes using (fk_books)) " .
               "left join mn_books_authors using (fk_books) " .
               "left join authors on authors.pk = fk_authors " .
               "where fk_subjects=$fk_subjects and fk_attriblist in (240, 245, 246) " .
               "order by author, title " .
               $table->MkOffset());
        if ($db->Get("pk")) {
            $table->PrintTable($db, "Books for Subject");
        } else {
            echo("<p><b>There are no books with this Subject!</b></p>\n");
        }
    }
}

echo("    <p><a href=\"subjects_list?filter=$filter\">" .
      "Back to Subject List</a></p>\n");
echo("    <p><a href=\"subject?filter=$filter&mode=add\">" .
      "Add a new Subject</a></p>\n\n");

pagefooter();
