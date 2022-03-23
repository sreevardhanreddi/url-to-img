# URL TO IMAGE

**URL TO IMAGE** is a docker image, which generates an image from a URL with specified width and height.

## Usage

Build the image

```shell

docker-compose up --build

```

run the image with following parameters

```shell

docker run --volume $PWD/media:/media sreevardhanreddi/url-to-img:latest --url=https://github.com --width=1920 --height=1080

```

Note

- all the images generated are in `png` format and have suffix `.gen.png`
