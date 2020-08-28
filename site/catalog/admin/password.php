<?php

include_once ("pgcat.phh");

getint ("admin");
$db = $config->db ();
$db->logger = new logger ();

include_once ("sqlform.phh");

if ($admin) {
  // changing other people's passwords requires createuser permission
  authenticate ("createuser");
  getint ("fk_users");
  $db->exec ("select login from users where pk = $fk_users");
  if ($db->FirstRow ()) {
    $login = $db->get ("login", SQLCHAR);
  } else {
    error_msg ("No such user");
  }
  pageheader ("Administrator Change Password For: $login");
} else {
  authenticate ();
  $login = $_SERVER['PHP_AUTH_USER'];
  $sql_login = $db->f ($login, SQLCHAR);
  $db->exec ("select pk from users where login = $sql_login");
  if ($db->FirstRow ()) {
    $fk_users = $db->get ("pk", SQLINT);
  }
  pageheader ("Change Password For: $login");
}

getstr ("filter");

if (!isupdate ()) {
  form_open ();
  if ($admin) {
    p ("Enter password for user {$_SERVER['PHP_AUTH_USER']}: <input type=\"password\" name=\"oldpassword\">");
  } else {
    p ("Enter old password for user $login: <input type=\"password\" name=\"oldpassword\">");
  }
  p ("<strong>Do not use</strong> the same password as for other important services!");
  p ("Enter new password for user $login: <input type=\"password\" name=\"newpassword1\"> at least 8 characters");
  p ("Reenter new password for user $login: <input type=\"password\" name=\"newpassword2\">");
  form_hidden ("admin", $admin);
  form_hidden ("fk_users", $fk_users);
  form_hidden ("filter", $filter);
  form_submit ("Change password");
  form_close ();
} else {
  // make sure you got the old password 
  getstr ("oldpassword");
  $sql_login = $db->f ($_SERVER['PHP_AUTH_USER'], SQLCHAR);
  $sql_password = $db->f (md5 ($oldpassword), SQLCHAR);
  $db->exec ("select pk from users where login = $sql_login and password = $sql_password");
  if (!$db->FirstRow ()) {
    error_msg ("Incorrect old password!");
    die ();
  }
  getstr ("newpassword1");
  getstr ("newpassword2");
  if ($newpassword1 != $newpassword2) {
    error_msg ("You entered 2 different passwords!");
  }
  if (strlen ($newpassword1) < 8) {
    error_msg ("New password must be at least 8 characters long.");
  }
  $sql_password = $db->f (md5 ($newpassword1), SQLCHAR);
  if ($db->exec ("update users set password = $sql_password where pk = $fk_users")) {
    msg ("Password changed");
  } else {
    error_msg ("Could not change password");
  }
}

p ("<a href=\"user?fk_users=$fk_users&amp;mode=edit&amp;filter=$filter\">Back to User</a>");
p ("<a href=\"users_list?filter=$filter\">Back to User List</a>");

pagefooter ();

?>
