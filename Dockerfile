FROM phusion/passenger-customizable:0.9.17
RUN /pd_build/ruby2.2.sh

# Set basic ENV vars
ENV HOME=/root TERM=xterm-color

# Use baseimage-docker's init process.
CMD ["/sbin/my_init"]

# Install some global npm modules
# RUN npm install -g phantomjs --phantomjs_cdnurl=http://cnpmjs.org/downloads; npm install -g eslint

# enable nginx
RUN rm -f /etc/service/nginx/down

RUN apt-get update

# Enable the Redis service.
# RUN /pd_build/redis.sh
# RUN rm -f /etc/service/redis/down

# Enable the memcached service.
# RUN /pd_build/memcached.sh
# RUN rm -f /etc/service/memcached/down

# Create dir for sources
ENV APP_HOME=/home/app/webapp
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# Install Gemfile so its cache doesn't get invalidated by copying the rest of the sources
COPY Gemfile Gemfile.lock $APP_HOME/
ENV BUNDLE_PATH=/home/app/bundle \
	BUNDLE_GEMFILE=$APP_HOME/Gemfile \
  BUNDLE_JOBS=2
RUN bundle install

# Install package.json to build the Front end.
# Set PATH so we can install node_modules outside of sources (mounted) dir and to allow npm find the bin(s) to execute npm commands later.
# RUN mkdir $APP_HOME/frontend
# COPY frontend/package.json $APP_HOME/frontend/
# ENV PATH="/home/app/node_modules/.bin:$PATH"
# RUN mkdir /home/app/node_modules \
#  && ln -s /home/app/node_modules $APP_HOME/frontend/node_modules
# RUN cd $APP_HOME/frontend && npm install && npm prune

# Copy sources
COPY . $APP_HOME

# Add "virtual host" config to Nginx
RUN rm /etc/nginx/sites-enabled/default
COPY webapp.conf /etc/nginx/sites-enabled/webapp.conf

# Install foreman to manage app from Procfile.dev. Its README's says not to install in Gemfile
# RUN gem install foreman

# Avoid losing some ENV vars because of Nginx (by default Nginx deletes all ENV vars)
RUN echo "env BUNDLE_PATH;" >> /etc/nginx/main.d/default.conf; \
  echo "env DB_PORT_DEVELOPMENT;" >> /etc/nginx/main.d/default.conf; \
  echo "env DB_PORT_PRODUCTION;" >> /etc/nginx/main.d/default.conf

# Allow www-data to access our app
RUN usermod -G staff app \
  && usermod -G staff www-data \
  && chown -R app:staff /home/app \
  && chmod -R g+s /home/app

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Enable SSH
RUN rm -f /etc/service/sshd/down
RUN /etc/my_init.d/00_regen_ssh_host_keys.sh
COPY authorized_keys /tmp/authorized_keys
RUN cat /tmp/authorized_keys >> /root/.ssh/authorized_keys && rm -f /tmp/authorized_keys

MAINTAINER Iporaitech
