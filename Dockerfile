FROM suconghou/node
LABEL maintainer="suconghou@gmail.com"
COPY sproxy /usr/local/bin/
CMD ["sproxy"]
