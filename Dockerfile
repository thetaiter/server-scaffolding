FROM ubuntu:14.04.2
MAINTAINER Ian Tait <thetaiter@gmail.com>

#INITIAL SETUP
# git dependencies
RUN apt-get -y install libcurl4-gnutls-dev libexpat1-dev gettext libz-dev libssl-dev
# node dependencies
RUN apt-get -y install build-essential

# create lib dir
RUN mkdir -p /root/lib

# add git and node
ADD https://github.com/git/git/archive/v2.4.6.tar.gz /root/lib/git.tar.gz
ADD https://github.com/joyent/node/archive/v0.12.7.tar.gz /root/lib/node.tar.gz

RUN cd /root/lib && \
    tar -xvzf git.tar.gz && \
    cd git && \
    make configure && \
    ./configure --prefix=/usr && \
    make all && \
    make install

RUN cd /root/lib && \
    tar -xvzf node.tar.gz && \
    cd node

RUN cd /root/lib/node && \
    ./configure

RUN cd /root/lib/node && \
    make

RUN cd /root/lib/node && \
    make install

#CLEANUP
RUN apt-get -y clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*