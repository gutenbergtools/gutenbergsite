# gutenbergsite
The Project Gutenberg Web site, database, and other internals

This is the *source* which is used to build the site. It is managed by git, with this private repository:
  https://github.com/gbnewby/gutenbergsite
  
An ssh key is needed to enable pulls or commits.

The repository includes the needed configuration files for Jekyll, which takes the markdown (.md) files
in the repo, and creates HTML files in the destination on the ibiblio server.

Documentation for this is in the "Notes and TO DO" document, currently. Once procedures stabilize, they
will be moved to this README or elsewhere in the repo.

The goal is to use the git-based repo to edit the content of PG pages, using markdown. The markdown will
then be converted to HTML that uses the .css, header/footer etc., and goes where needed in the live Apache
document root.

There will be other components of the site that are managed in different ways, and these are in the
.gitignore (so they don't get overwritten).

