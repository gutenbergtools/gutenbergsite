# gutenbergsite
The Project Gutenberg Web site, database, and other internals

This is the *source* which is used to build the site. It is managed by git in a repository at https://github.com/gbnewby/gutenbergsite
  
An ssh key is needed to enable pulls or commits, but any user logged into github may send pull requests. 

*** On the Project Gutenberg site, use the designated username to edit files and generate the site. ***

The basic setup is:
 $BASEDIR is the path where we maintain the site.
 $BASEDIR/gutenbergsite is the git-maintained content
 $BASEDIR/html is the path on the server that the webserver uses as its DOCUMENT ROOT.

We use Jekyll to convert pages from github-flavored markdown to HTML, applying our styles.

Most pages for the live site (i.e., under $BASEDIR/html) should exist under $BASEDIR/gutenbergsite. Any exceptions will be noted in $BASEDIR/gutenbergsite/_config.yml (the Jekyll configuration file).

To update the git-maintained content and push to the live site:
  cd $BASEDIR/gutenbergsite
  jekyll build --verbose
    (--verbose is optional)

Any changes to files under gutenbergsite should be checked in via git. For example, 
  git add FILENAME (for newly created files only)
  git commit (give an informative commit log message)
  git push

Similarly, any changes made via github.com should be pulled to $BASEDIR/gutenbergsite:
  cd $BASEDIR/gutenbergsite
  git pull

Pages that will be converted from markdown to HTML (and have our header/footer added) are in $BASEDIR/gutenbergsite/site

To make it easier to track where things are, we use the same structure and filenames as the live site. For example, site/about/index.md will correspond to about/index.html for the live site.  However, the actual filename and path is in the .md file (the first lines at the top): Jekyll does not build the directory structure you use, instead it follows the metadata at the top of the md files.

Content that should be copied as-is to the live site is put at the the top-level of $BASEDIR/gutenbergsite.  For example, we have a directory "catalog" for the catalog interface, and "gutenberg" for the site assets (css and pictures).

Use the "keep_files" variable in Jekyll's _config.yml for anything that is not part of the gutenbergsite repo but is maintained separately in $BASEDIR/html. This includes symlinks. Anything with usernames, passwords, codes, or other private information should not be added to the gutenbergsite repo.





