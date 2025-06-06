FROM ruby:latest

EXPOSE 4000

RUN gem install bundler jekyll \
 && mkdir /gutenbergsite \
 && chmod 755 /gutenbergsite

COPY --chmod=755 docker-entrypoint.sh /docker-entrypoint.sh

WORKDIR /gutenbergsite

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["bundle", "exec", "jekyll", "serve", "-H", "0.0.0.0"]
