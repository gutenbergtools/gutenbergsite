<?php
include_once ("pgcat.phh");

authenticate ();

pageheader ("Administration Index");
?>

<h2>Read This First</h2>

<h3>Entities and relations</h3>

<p>In this catalog you will find 2 different recurring concepts:</p>

<ul>
  <li>the entity</li>
  <li>the relation (or link).</li>
</ul>

<p>Don't confuse database link (relation) with HTML-link (underlined
text to click.)</p>

<p>Book, Author, Subject, Language and LoC Class are entities.</p>

<p>Book-Author, Book-Subject, Book-Language and Book-LoC Class are
relations.</p>

<p>You can <strong>add</strong>, <strong>edit</strong> and
<strong>delete</strong> entities. Add an author, add a book. You can
create and remove links between existing entities (<strong>link</strong>
and <strong>unlink</strong> entities). Link an author to a book.
Remember: to link you have to create the entities first. Of course, if
you find that the entity already exists in the catalog, you should not
create it again.</p>

<p>The advantage of the entity and link concept is that you have to enter data
only once. Every author exists only once in the database. You have to enter
the date of birth and of death only once. You have to enter the pseudonyms
and different orthografies of the name only once. If you find an error, you
have to fix it only once.</p>

<p>To add a new book:</p>

<ol>
  <li>Search for the author. If you don't find her, add her.</li>
  <li>Enter the book data.</li>
  <li>Link the author to the book.</li>
</ol>

<h3>HTML-Links and Buttons</h3>

<p>Clicking on a HTML-link will never alter any data.</p>

<p>Clicking on a button with: add, edit, delete, link or unlink in the
caption will alter data. (There are some other buttons though that don't
alter data.) </p>

<h2>Starting points</h2>

<h3>Reports / Statistics</h3>

<h4><a href="attribute_stats">MARC Attribute usage</a></h4>

<p>List all the MARC attributes/tags/codes currently in the system,
   and how many records use them; and see the usage.</p>

<h4><a href="subj_locc_by_etext">Books lacking a Subject and/or a LoCC</a></h4>

<p>List all the books which do not have any Subjects and/or LoCCs attached to them,
  sorted by Etext#, i.e. least recent first.</p>

<h4><a href="stats">Statistics</a></h4>

<p> Various statistics, mainly focused on authors.</p>

<h4><a href="empty_authors.php">Authors with no books</a></h4>

<p>A list of author entries that have no books attached to them, which usually means
  they should be deleted.</p>

<h4><a href="dupl_attrib_list">Duplicate MARC attributes</a></h4>

<p>MARC attributes whose values are not unique.</p>

<h3>User Tasks</h3>

<h4><a href="authors_list">Authors</a></h4>

<p>Manage authors, author aliases and interesting URLs for author.</p>

<h4><a href="books_form">Books</a></h4>

<p>Manage books, book-titles, book-authors, book-subjects, book-languages
and book-LoC classes.</p>

<h4><a href="titles">Batch-Edit Titles</a></h4>

<p>Select a batch of titles by regular expression and 
edit them all in one place.</p>

<h4><a href="subjects_list">Subjects</a></h4>

<p>Manage subjects.</p>

<h4><a href="categories_list">Categories</a></h4>

<p>Manage categories.</p>

<h4><a href="loccs_list">LoC Classes</a></h4>

<p>Manage LoC Classes.</p>

<h4><a href="langs_list">Languages</a></h4>

<p>Manage Languages. You will seldom need this, as most languages are
already entered.</p>

<h4><a href="password">Change Password</a></h4>

<p>Change your password. You'll probably have to login again.</p>

<h3>Administrator Tasks</h3>

<p>Requires Administrator rights.</p>

<h4><a href="users_list">Users</a></h4>

<p>Manage users. Add, remove, reset password etc.</p>

<h4><a href="mirrors_list">Mirrors</a></h4>

<p>Manage mirrors.</p>


<?php 
pagefooter (); 
?>
