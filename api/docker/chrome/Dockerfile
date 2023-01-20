FROM ubuntu:22.04
# Chrome dependency Instalation
RUN apt-get update && apt-get install -y \
    curl

 # Chrome instalation
RUN curl -LO  https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -y ./google-chrome-stable_current_amd64.deb
RUN rm google-chrome-stable_current_amd64.deb
# Check chrome version
# RUN echo "Chrome: " && google-chrome --version

COPY entrypoint.sh  /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

EXPOSE 9222

CMD /usr/bin/entrypoint.sh
