FROM phusion/passenger-customizable:0.9.17
RUN /pd_build/ruby2.2.sh

# Set correct environment variables.
ENV HOME /root

# Use baseimage-docker's init process.
CMD ["/sbin/my_init"]

# install headless browser for tests
RUN npm install -g phantomjs

# enable nginx
RUN rm -f /etc/service/nginx/down

# Enable the Redis service.
RUN /pd_build/redis.sh
RUN rm -f /etc/service/redis/down

# Enable the memcached service.
RUN /pd_build/memcached.sh
RUN rm -f /etc/service/memcached/down

# Install Gemfile
ENV APP_HOME /home/app/webapp
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
ADD Gemfile $APP_HOME/
ENV BUNDLE_GEMFILE=$APP_HOME/Gemfile \
  BUNDLE_JOBS=2 \
  BUNDLE_PATH=/home/app/bundle
RUN bundle install

# Copy app to container
ADD . $APP_HOME

# Add "virtual host" config to Nginx
RUN rm /etc/nginx/sites-enabled/default
COPY webapp.conf /etc/nginx/sites-enabled/webapp.conf

# Keep BUNDLE_PATH so Nginx knows where to find gems (by default Nginx deletes all ENV vars)
RUN echo "env BUNDLE_PATH;" >> /etc/nginx/main.d/default.conf

# Allow www-data to access our app
RUN usermod -G staff app
RUN usermod -G staff www-data
RUN chown -R app:staff /home/app
RUN chmod -R g+s /home/app

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Enable SSH
RUN rm -f /etc/service/sshd/down
RUN /etc/my_init.d/00_regen_ssh_host_keys.sh
ADD authorized_keys /tmp/authorized_keys
RUN cat /tmp/authorized_keys >> /root/.ssh/authorized_keys && rm -f /tmp/authorized_keys

MAINTAINER Iporaitech
