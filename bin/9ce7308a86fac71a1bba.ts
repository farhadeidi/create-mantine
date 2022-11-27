var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { asyncForEach, copyFile, deleteFolderIfExists, makeFile, runCommand, sleep, } from "./helpers";
import * as fs from "fs";
import { templateConfigs } from "./templates";
const sourceFilePath = new URL(".", import.meta.url);
const sourceFolderPath = new URL("..", sourceFilePath);
const args = process.argv.slice(2);
const appName = args[0];
const templates = ["vite-react"];
const libPath = sourceFolderPath.pathname;
const createReactViteApp = () => __awaiter(void 0, void 0, void 0, function* () {
    let template = templates[0];
    const configs = templateConfigs["vite-react"];
    const constants = {
        siteName: appName,
        apiUrl: "",
    };
    yield runCommand(`yarn create vite ${appName} --template react-ts`);
    let packageContent = JSON.parse(fs.readFileSync(`${appName}/package.json`, "utf8"));
    packageContent.scripts = Object.assign(Object.assign({}, packageContent.scripts), configs.scripts);
    yield makeFile(`${appName}/package.json`, JSON.stringify(packageContent, null, 2));
    yield deleteFolderIfExists(`./${appName}/src`);
    yield asyncForEach(configs.filesToCopy, (item) => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = new URL(`../templates/${template}/${item}`, sourceFilePath);
        yield copyFile(filePath.pathname, `./${appName}/${item}`);
        console.log("Copied => ", item);
        yield sleep(100);
    }));
    yield makeFile(`${appName}/src/configs/constants.ts`, `export const constants = ${JSON.stringify(constants, null, 2)}`);
    yield sleep(200);
    yield runCommand(`cd ${appName} && yarn`);
    yield runCommand(`cd ${appName} && yarn add ${configs.dependencies.join(" ")}`);
    yield runCommand(`cd ${appName} && yarn add -D ${configs.devDependencies.join(" ")}`);
});
const build = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!appName) {
        console.log("Please input a name");
        return;
    }
    yield createReactViteApp();
});
build();
