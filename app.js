import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import { format } from "path";

dotenv.config();

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
}

const dir = formatDate(new Date());

const output = "output/" + dir + "/";

console.log(output);
if (!fs.existsSync("output")) {
  fs.mkdirSync("output");
}
if (!fs.existsSync(output)) {
  fs.mkdirSync(output, (err) => {});
}

function join(arr, separator) {
  if (arr.length === 0) {
    return "";
  }

  let result = arr[0];

  for (let i = 1; i < arr.length; i++) {
    result += separator + arr[i];
  }

  return result;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function competion(promot, content) {
  let result = await openai.chat.completions.create({
    messages: [
      { role: "system", content: promot },
      { role: "user", content },
    ],
    // gpt-3.5-turbo or gpt-4-turbo
    model: "gpt-3.5-turbo",
  });
  return result.choices[0].message.content;
}

const promot_essayist = fs.readFileSync("promot_essayist.md", "utf8");
const promot_judger = fs.readFileSync("promot_judger.md", "utf8");

async function generateArticle(subtitles) {
  return competion(promot_essayist, subtitles);
}

function chooseTheBest(articles) {
  return competion(promot_judger, join(articles, "@THE_NEXT_ONE@"));
}

async function write(filename, content) {
  fs.writeFile(filename, content, (err) => {
    if (err) {
      console.error("写入文件时出错:", err);
    } else {
      console.log("文件 " + filename + " 已成功写入。");
    }
  });
}

async function main() {
  console.log("开始生成文章...");

  let articles = [];

  const subtitles = fs.readFileSync("subtitles.txt", "utf8");

  const tasks = [];

  for (let i = 0; i < 5; i++) {
    tasks.push(
      new Promise(async (resolve) => {
        const article = await generateArticle(subtitles);
        articles.push(article);
        resolve();
        write(output + "output" + i + ".txt", article);
      })
    );
  }

  await Promise.all(tasks);

  const bestArticle = await chooseTheBest(articles);

  write(output + "output_the_best.txt", bestArticle);

  console.log(bestArticle);
}

await main();
