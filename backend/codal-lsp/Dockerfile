FROM ubuntu:18.04

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
      software-properties-common && \
    add-apt-repository -y ppa:team-gcc-arm-embedded/ppa && \
    apt-get update -qq && \
    apt-get purge -y nodejs && \
    apt-get purge -y npm && \
    apt-get install -y --no-install-recommends \
      git curl gpg-agent wget gcc-arm-embedded && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs && \
    wget https://apt.llvm.org/llvm.sh && \
    chmod +x llvm.sh && \
    ./llvm.sh 12 && \
    update-alternatives --install /usr/bin/clangd clangd /usr/bin/clangd-12 100 && \
    apt-get autoremove -y && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

EXPOSE 4000

RUN mkdir -p ~/.config/clangd
RUN echo "CompileFlags:\n\tAdd: [-fno-builtin]" >> /root/.config/clangd/config.yaml

# ENTRYPOINT [ "/bin/bash" ]

CMD npm run start