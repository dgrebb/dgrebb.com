FROM catthehacker/ubuntu:act-latest
RUN apt-get update \
    && apt-get install -y wget unzip \
    && curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install

CMD /bin/sh