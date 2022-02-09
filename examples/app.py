from concurrent.futures import ThreadPoolExecutor
from urllib import request

import docker
import requests
from bs4 import BeautifulSoup


def _gen_image(url):
    client = docker.from_env()
    client.containers.run(
        "url-to-img",
        command="--url={} --width=400 --height=640".format(url),
        detach=True,
        volumes=[
            "/home/smartcow/url-to-img/media:/media",
        ],
    )


def main():
    res = requests.get("https://www.docker.com/sitemap.xml")
    soup = BeautifulSoup(res.content, features="html.parser")

    urls = []
    for link in soup.find_all("loc"):
        urls.append(link.text)

    with ThreadPoolExecutor(max_workers=2) as workers:
        workers.map(_gen_image, urls)


if __name__ == "__main__":
    main()
