<?php
include_once ("pgcat.phh");

authenticate ();

pageheader ("Books");

echo ("<h2>Search a book</h2>\n");

form_open ("books_list");
?>

<table class="dialog" cellspacing=\"2\" cellpadding=\"4\" width=\"100%\">
<colgroup><col width=\"1%\"/></colgroup>
<tr class="oddrow">
  <th><label for="author" accesskey="a">Author:</label></th>
  <td><input type="text" id="author" name="author" 
             title="Enter author name in the format: 'Brontë, Emily'." style="width: 30em"/></td>
</tr>
<tr class="evenrow">
  <th><label for="title" accesskey="t">Title:</label></th>
  <td><input type="text" id="title" name="title" 
             title="Enter title of work." style="width: 30em"/></td>
</tr>
<tr class="oddrow">
  <th><label for="nr" accesskey="t">EText&nbsp;Nr.:</label></th>
  <td><input type="text" id="nr" name="nr" 
             title="Enter EText Nr. of work." style="width: 10em"/></td>
</tr>
<tr class="evenrow">
  <th></th>
  <td><input type="submit" id="submit" accesskey="s" value="Search" 
             title="Start search"/>
      <input type="reset" id="reset" accesskey="r" value="Reset" 
             title="Reset form"/></td>
</tr>
</table>

<?php 
form_close ();

echo ("<h2><a href=\"book?mode=add\">Add a book</a></h2>\n");

pagefooter (); 
?>
