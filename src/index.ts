#! /usr/bin/env node

import {
  asyncForEach,
  copyFile,
  deleteFolderIfExists,
  makeFile,
  runCommand,
  sleep,
} from "./helpers";
import * as fs from "fs";
import { templateConfigs } from "./templates";

const sourceFilePath = new URL(".", import.meta.url);
const sourceFolderPath = new URL("..", sourceFilePath);

const args = process.argv.slice(2);
const appName = args[0];
const templates = ["vite-react"];
const libPath = sourceFolderPath.pathname;

const createReactViteApp = async () => {
  let template = templates[0];
  const configs = templateConfigs["vite-react"];
  const constants = {
    siteName: appName,
    apiUrl: "",
  };

  await runCommand(`yarn create vite ${appName} --template react-ts`);
  let packageContent = JSON.parse(
    fs.readFileSync(`${appName}/package.json`, "utf8")
  );

  packageContent.scripts = {
    ...packageContent.scripts,
    ...configs.scripts,
  };

  await makeFile(
    `${appName}/package.json`,
    JSON.stringify(packageContent, null, 2)
  );

  await deleteFolderIfExists(`./${appName}/src`);

  await asyncForEach(configs.filesToCopy, async (item) => {
    const filePath = new URL(
      `../templates/${template}/${item}`,
      sourceFilePath
    );
    await copyFile(filePath.pathname, `./${appName}/${item}`);
    console.log("Copied => ", item);
    await sleep(100);
  });

  await makeFile(
    `${appName}/src/configs/constants.ts`,
    `export const constants = ${JSON.stringify(constants, null, 2)}`
  );
  await sleep(200);

  await runCommand(`cd ${appName} && yarn`);
  await runCommand(
    `cd ${appName} && yarn add ${configs.dependencies.join(" ")}`
  );
  await runCommand(
    `cd ${appName} && yarn add -D ${configs.devDependencies.join(" ")}`
  );
};

const build = async () => {
  if (!appName) {
    console.log("Please input a name");
    return;
  }

  await createReactViteApp();
};

build();
