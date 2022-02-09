const puppeteer = require("puppeteer");
const fs = require("fs");
const parseArgs = require("minimist");
const _ = require("lodash");

/**
 * takeScreenShot
 *
 * @param {string} urlParam
 * @param {int} width
 * @param {int} height
 */
const takeScreenShot = async (
  urlParam = "https://example.com",
  width = 1920,
  height = 1080
) => {
  let url = new URL(_.trim(urlParam, "/"));
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-sandbox",
    ],
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: width,
    height: height,
  });

  await page.goto(url);
  let imageName = url.pathname.split("/").slice(-1)[0];
  let imagePath = url.pathname.replace(imageName, "");
  imageName = imageName ? imageName : url.host;
  let finalImagePath = `/media/${imagePath}${imageName}.gen.png`;
  await fs.mkdir(`/media/${imagePath}`, { recursive: true }, () => {});
  await page.screenshot({ path: finalImagePath });
  await browser.close();
};

let args = parseArgs(process.argv.splice(2));

takeScreenShot(args.url, args.width, args.height)
  .then(() => {
    console.log("Done.");
  })
  .catch((e) => {
    console.error(e);
  });
