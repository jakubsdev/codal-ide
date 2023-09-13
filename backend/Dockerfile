FROM ubuntu:18.04

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
      software-properties-common && \
    add-apt-repository -y ppa:team-gcc-arm-embedded/ppa && \
    apt-get update -qq && \
    apt-get purge -y nodejs && \
    apt-get purge -y npm && \
    apt-get install -y --no-install-recommends \
      git make cmake python3 curl \
      gcc-arm-embedded && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs && \
    apt-get autoremove -y && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

WORKDIR /app/codal

RUN git clone https://github.com/lancaster-university/microbit-v2-samples.git . && \
    python3 build.py && \
    rm MICROBIT.bin && \
    rm MICROBIT.hex && \
    cd source && \
    rm main.cpp

WORKDIR /app

COPY . .

#ENTRYPOINT [ "/bin/bash" ]

EXPOSE 5000

CMD ["/bin/bash", "-c", "npm start"]
