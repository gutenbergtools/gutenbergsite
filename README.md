# Project Gutenberg Website

This is the source content, database, and other internal files used for building the [gutenberg.org](https://www.gutenberg.org) website.

This is a `git` repository hosted on Github at https://github.com/gbnewby/gutenbergsite.


## Development

If you wish to experiment you can develop and run the site on your local machine.

Dependencies:

* [Ruby](https://www.ruby-lang.org/) language
* [Jekyll](https://jekyllrb.com/) static website generator
* Git

Once Ruby, Jekyll, and Git are setup:

    git clone https://github.com/gbnewby/gutenbergsite.git
    cd gutenbergsite
    bundle exec jekyll serve

Then open your web browser to http://localhost:4000


### Further Information

You will need a Github account, and a SSH key to enable pulls or commits, but any user logged into github may submit commit requests. 

If you are new to Github and git repositories, please first read the Github [Quick Start](https://help.github.com/en/github/getting-started-with-github/quickstart) guide.

If you are new to Jekyll, get started by reading the [docs](https://jekyllrb.com/docs/).


## Static Site Generation

We use Jekyll to convert pages from github-flavored markdown to HTML, applying our styles.

The static files are generated directly on the Project Gutenberg site. Use the designated `username` to edit files and generate the site.

To make it easier to track where things are, we use the same structure and filenames as the live site. For example, `site/about/index.md` will correspond to `about/index.html` for the live site.  However, the actual filename and path is in the markdown file (the first lines at the top of the `.md` files): Jekyll does not build the directory structure you use, instead it follows the metadata at the top of the markdown files.

Content that should be copied as-is to the live site is put at the the top-level of `$BASEDIR/gutenbergsite`.  For example, we have a directory `catalog` for the catalog interface, and `gutenberg` for the site assets (CSS and pictures).

Use the `keep_files` variable in Jekyll's `_config.yml` for anything that is not part of the `gutenbergsite` repo but is maintained separately in `$BASEDIR/html`. This includes symlinks. Anything with usernames, passwords, codes, or other private information should not be added to the `gutenbergsite` repo.

The basic setup is:

* `$BASEDIR`: the path where we maintain the site.
* `$BASEDIR/gutenbergsite`: the git-maintained content
* `$BASEDIR/html`: the path on the server that the web server uses as its `DOCUMENT ROOT`.

Most pages for the live site (i.e., under `$BASEDIR/html`) should exist under `$BASEDIR/gutenbergsite`. Any exceptions will be noted in `$BASEDIR/gutenbergsite/_config.yml` (the Jekyll configuration file).

To update the git-maintained content and push to the live site:

    cd $BASEDIR/gutenbergsite
    jekyll build --verbose

Note: `--verbose` is optional.

Any changes to files under `gutenbergsite` should be checked in via git. For example, 

    git add FILENAME      # for newly created files only
    git commit "MESSAGE"  # give an informative commit log message
    git push

Similarly, any changes made via github.com should be pulled to `$BASEDIR/gutenbergsite`:

    cd $BASEDIR/gutenbergsite
    git pull

Pages that will be converted from markdown to HTML (and have our header/footer added) are in `$BASEDIR/gutenbergsite/site`.


## License

This is free and unencumbered software released into the public domain. Read more in the [LICENSE](LICENSE) file.
