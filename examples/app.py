import time
import docker


def _gen_image(url):
    client = docker.from_env()
    client.containers.run(
        "sreevardhanreddi/url-to-img",
        command="--url={} --width=400 --height=640".format(url),
        detach=True,
        volumes=[
            "/media:/media",
        ],
    )
    # wait for the container to exit
    time.sleep(5)


def main():
    _gen_image("https://github.com")


if __name__ == "__main__":
    main()
