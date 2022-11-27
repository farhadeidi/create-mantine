#! /usr/bin/env node
import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ var __webpack_modules__ = ({

/***/ 512:
/***/ ((module) => {


const x = module.exports;
const ESC = '\u001B[';
const OSC = '\u001B]';
const BEL = '\u0007';
const SEP = ';';
const isTerminalApp = process.env.TERM_PROGRAM === 'Apple_Terminal';

x.cursorTo = (x, y) => {
	if (typeof x !== 'number') {
		throw new TypeError('The `x` argument is required');
	}

	if (typeof y !== 'number') {
		return ESC + (x + 1) + 'G';
	}

	return ESC + (y + 1) + ';' + (x + 1) + 'H';
};

x.cursorMove = (x, y) => {
	if (typeof x !== 'number') {
		throw new TypeError('The `x` argument is required');
	}

	let ret = '';

	if (x < 0) {
		ret += ESC + (-x) + 'D';
	} else if (x > 0) {
		ret += ESC + x + 'C';
	}

	if (y < 0) {
		ret += ESC + (-y) + 'A';
	} else if (y > 0) {
		ret += ESC + y + 'B';
	}

	return ret;
};

x.cursorUp = count => ESC + (typeof count === 'number' ? count : 1) + 'A';
x.cursorDown = count => ESC + (typeof count === 'number' ? count : 1) + 'B';
x.cursorForward = count => ESC + (typeof count === 'number' ? count : 1) + 'C';
x.cursorBackward = count => ESC + (typeof count === 'number' ? count : 1) + 'D';

x.cursorLeft = ESC + 'G';
x.cursorSavePosition = ESC + (isTerminalApp ? '7' : 's');
x.cursorRestorePosition = ESC + (isTerminalApp ? '8' : 'u');
x.cursorGetPosition = ESC + '6n';
x.cursorNextLine = ESC + 'E';
x.cursorPrevLine = ESC + 'F';
x.cursorHide = ESC + '?25l';
x.cursorShow = ESC + '?25h';

x.eraseLines = count => {
	let clear = '';

	for (let i = 0; i < count; i++) {
		clear += x.eraseLine + (i < count - 1 ? x.cursorUp() : '');
	}

	if (count) {
		clear += x.cursorLeft;
	}

	return clear;
};

x.eraseEndLine = ESC + 'K';
x.eraseStartLine = ESC + '1K';
x.eraseLine = ESC + '2K';
x.eraseDown = ESC + 'J';
x.eraseUp = ESC + '1J';
x.eraseScreen = ESC + '2J';
x.scrollUp = ESC + 'S';
x.scrollDown = ESC + 'T';

x.clearScreen = '\u001Bc';

x.clearTerminal = process.platform === 'win32' ?
	`${x.eraseScreen}${ESC}0f` :
	// 1. Erases the screen (Only done in case `2` is not supported)
	// 2. Erases the whole screen including scrollback buffer
	// 3. Moves cursor to the top-left position
	// More info: https://www.real-world-systems.com/docs/ANSIcode.html
	`${x.eraseScreen}${ESC}3J${ESC}H`;

x.beep = BEL;

x.link = (text, url) => {
	return [
		OSC,
		'8',
		SEP,
		SEP,
		url,
		BEL,
		text,
		OSC,
		'8',
		SEP,
		SEP,
		BEL
	].join('');
};

x.image = (buf, opts) => {
	opts = opts || {};

	let ret = OSC + '1337;File=inline=1';

	if (opts.width) {
		ret += `;width=${opts.width}`;
	}

	if (opts.height) {
		ret += `;height=${opts.height}`;
	}

	if (opts.preserveAspectRatio === false) {
		ret += ';preserveAspectRatio=0';
	}

	return ret + ':' + buf.toString('base64') + BEL;
};

x.iTerm = {};

x.iTerm.setCwd = cwd => OSC + '50;CurrentDir=' + (cwd || process.cwd()) + BEL;


/***/ }),

/***/ 340:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.withPromise = exports.withCallback = void 0;

/**
 * Open the input with a normal callback function
 *
 * @param {Input} input - input object
 * @param {function} valueMapper - function which maps the resulting id and value back to the expected format
 * @param {function} callback - callback function
 */
const withCallback = (input, valueMapper, callback) => {
  input.open();
  input.onSelect((id, value) => callback(valueMapper(id, value)));
};
/**
 * Open the input with a promise
 *
 * @param {Input} input - input object
 * @param {function} valueMapper - function which maps the resulting id and value back to the expected format
 */


exports.withCallback = withCallback;

const withPromise = (input, valueMapper) => {
  return new Promise((resolve, reject) => {
    input.open();
    input.onSelect((id, value) => {
      if (id === null) {
        reject();
      } else {
        resolve(valueMapper(id, value));
      }
    });
  });
};

exports.withPromise = withPromise;

/***/ }),

/***/ 398:
/***/ ((module, exports, __nccwpck_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _input = _interopRequireDefault(__nccwpck_require__(730));

var _renderer = _interopRequireDefault(__nccwpck_require__(59));

var _callbackMappers = __nccwpck_require__(340);

var _valueMappers = __nccwpck_require__(720);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Default options
 */
const defaultOptions = {
  outputStream: process.stdout,
  inputStream: process.stdin,
  values: [],
  defaultValue: 0,
  selected: '(x)',
  unselected: '( )',
  indentation: 0,
  cleanup: true,
  valueRenderer: value => value
};
/**
 * Create an instance of cli-select with the given options
 *
 * @param {object} options - options for cli-select
 * @param {function} callback - if specified, a callback will be used, otherwise a promise gets returned (optional)
 */

const creator = (options, callback) => {
  // merge options with default options
  options = _objectSpread({}, defaultOptions, options); // create renderer and input instances

  const renderer = new _renderer.default(options, options.outputStream);
  const input = new _input.default(options.inputStream);
  input.setDefaultValue(options.defaultValue);
  input.attachRenderer(renderer); // handle array and object values

  let valueMapper;

  if (Array.isArray(options.values)) {
    valueMapper = (0, _valueMappers.withArrayValues)(options);
  } else {
    valueMapper = (0, _valueMappers.withObjectValues)(options);
  } // map values


  options.values = valueMapper.input;
  input.setValues(options.values); // handle different callback methods

  if (typeof callback === 'function') {
    return (0, _callbackMappers.withCallback)(input, valueMapper.output, callback);
  } else {
    return (0, _callbackMappers.withPromise)(input, valueMapper.output);
  }
};

exports = module.exports = creator;
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var _default = creator;
exports["default"] = _default;

/***/ }),

/***/ 730:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _readline = _interopRequireDefault(__nccwpck_require__(521));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handle cli input
 */
class Input {
  /**
   * Input constructor
   *
   * @param {any} stream - stream to catch (optional)
   */
  constructor(stream = process.stdin) {
    // set default values
    this.stream = stream;
    this.values = [];
    this.selectedValue = 0;

    this.onSelectListener = () => {};

    this.onKeyPress = this.onKeyPress.bind(this);
  }
  /**
   * Set the available values
   *
   * @param {array} values - all available values
   */


  setValues(values) {
    this.values = values;

    if (this.renderer) {
      this.renderer.setValues(values);
    }
  }
  /**
   * Set the default value
   *
   * @param {number} defaultValue - default value id
   */


  setDefaultValue(defaultValue) {
    this.selectedValue = defaultValue;
  }
  /**
   * Attach a renderer to the input catcher
   *
   * @param {Renderer} renderer - renderer to use for rendering responses
   */


  attachRenderer(renderer) {
    this.renderer = renderer;
    this.renderer.setValues(this.values);
  }
  /**
   * Register an on select listener
   *
   * @param {function} listener - listener function which receives two parameters: valueId and value
   */


  onSelect(listener) {
    this.onSelectListener = listener;
  }
  /**
   * Open the stream and listen for input
   */


  open() {
    // register keypress event
    _readline.default.emitKeypressEvents(this.stream); // handle keypress


    this.stream.on('keypress', this.onKeyPress); // initially render the response

    if (this.renderer) {
      this.renderer.render(this.selectedValue);
    } // hide pressed keys and start listening on input


    this.stream.setRawMode(true);
    this.stream.resume();
  }
  /**
   * Close the stream
   *
   * @param {boolean} cancelled - true if no value was selected (optional)
   */


  close(cancelled = false) {
    // reset stream properties
    this.stream.setRawMode(false);
    this.stream.pause(); // cleanup the output

    if (this.renderer) {
      this.renderer.cleanup();
    } // call the on select listener


    if (cancelled) {
      this.onSelectListener(null);
    } else {
      this.onSelectListener(this.selectedValue, this.values[this.selectedValue]);
    }

    this.stream.removeListener('keypress', this.onKeyPress);
  }
  /**
   * Render the response
   */


  render() {
    if (!this.renderer) {
      return;
    }

    this.renderer.render(this.selectedValue);
  }
  /**
   * Handle key press event
   *
   * @param {string} string - input string
   * @param {object} key - object containing information about the pressed key
   */


  onKeyPress(string, key) {
    if (key) {
      if (key.name === 'up' && this.selectedValue > 0) {
        this.selectedValue--;
        this.render();
      } else if (key.name === 'down' && this.selectedValue + 1 < this.values.length) {
        this.selectedValue++;
        this.render();
      } else if (key.name === 'return') {
        this.close();
      } else if (key.name === 'escape' || key.name === 'c' && key.ctrl) {
        this.close(true);
      }
    }
  }

}

exports["default"] = Input;

/***/ }),

/***/ 59:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _readline = _interopRequireDefault(__nccwpck_require__(521));

var _ansiEscapes = __nccwpck_require__(512);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Response renderer
 */
class Renderer {
  /**
   * Renderer constructor
   *
   * @param {object} options - renderer options
   * @param {any} stream - stream to write to (optional)
   */
  constructor(options, stream = process.stdout) {
    this.options = options;
    this.stream = stream;
    this.values = [];
    this.initialRender = true;
  }
  /**
   * Set the available values
   *
   * @param {array} values - all available values
   */


  setValues(values) {
    this.values = values;
  }
  /**
   * Render the values
   *
   * @param {number} selectedValue - selected value (optional)
   */


  render(selectedValue = 0) {
    if (this.initialRender) {
      // hide the cursor initially
      this.initialRender = false;
      this.stream.write(_ansiEscapes.cursorHide);
    } else {
      // remove previous lines and values
      this.stream.write((0, _ansiEscapes.eraseLines)(this.values.length));
    } // output the current values


    this.values.forEach((value, index) => {
      const symbol = selectedValue === index ? this.options.selected : this.options.unselected;
      const indentation = ' '.repeat(this.options.indentation);
      const renderedValue = this.options.valueRenderer(value, selectedValue === index);
      const end = index !== this.values.length - 1 ? '\n' : '';
      this.stream.write(indentation + symbol + ' ' + renderedValue + end);
    });
  }
  /**
   * Cleanup the console at the end
   */


  cleanup() {
    this.stream.write((0, _ansiEscapes.eraseLines)(this.values.length));
    this.stream.write(_ansiEscapes.cursorShow);
  }

}

exports["default"] = Renderer;

/***/ }),

/***/ 720:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.withObjectValues = exports.withArrayValues = void 0;

/**
 * Map incoming and outgoing values if the initial values are an array
 *
 * @param {object} options - cli-select options
 */
const withArrayValues = options => {
  return {
    input: options.values,
    output: (id, value) => {
      return {
        id,
        value
      };
    }
  };
};
/**
 * Map incoming and outgoing values if the initial values are an object
 *
 * @param {object} options - cli-select options
 */


exports.withArrayValues = withArrayValues;

const withObjectValues = options => {
  const originalValues = options.values;
  return {
    input: Object.values(originalValues),
    output: (id, value) => {
      return {
        id: Object.keys(originalValues)[id],
        value
      };
    }
  };
};

exports.withObjectValues = withObjectValues;

/***/ }),

/***/ 268:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var fs = __nccwpck_require__(147),
    path = __nccwpck_require__(17);

module.exports = ncp;
ncp.ncp = ncp;

function ncp (source, dest, options, callback) {
  var cback = callback;

  if (!callback) {
    cback = options;
    options = {};
  }

  var basePath = process.cwd(),
      currentPath = path.resolve(basePath, source),
      targetPath = path.resolve(basePath, dest),
      filter = options.filter,
      rename = options.rename,
      transform = options.transform,
      clobber = options.clobber !== false,
      modified = options.modified,
      dereference = options.dereference,
      errs = null,
      started = 0,
      finished = 0,
      running = 0,
      limit = options.limit || ncp.limit || 16;

  limit = (limit < 1) ? 1 : (limit > 512) ? 512 : limit;

  startCopy(currentPath);
  
  function startCopy(source) {
    started++;
    if (filter) {
      if (filter instanceof RegExp) {
        if (!filter.test(source)) {
          return cb(true);
        }
      }
      else if (typeof filter === 'function') {
        if (!filter(source)) {
          return cb(true);
        }
      }
    }
    return getStats(source);
  }

  function getStats(source) {
    var stat = dereference ? fs.stat : fs.lstat;
    if (running >= limit) {
      return setImmediate(function () {
        getStats(source);
      });
    }
    running++;
    stat(source, function (err, stats) {
      var item = {};
      if (err) {
        return onError(err);
      }

      // We need to get the mode from the stats object and preserve it.
      item.name = source;
      item.mode = stats.mode;
      item.mtime = stats.mtime; //modified time
      item.atime = stats.atime; //access time

      if (stats.isDirectory()) {
        return onDir(item);
      }
      else if (stats.isFile()) {
        return onFile(item);
      }
      else if (stats.isSymbolicLink()) {
        // Symlinks don't really need to know about the mode.
        return onLink(source);
      }
    });
  }

  function onFile(file) {
    var target = file.name.replace(currentPath, targetPath);
    if(rename) {
      target =  rename(target);
    }
    isWritable(target, function (writable) {
      if (writable) {
        return copyFile(file, target);
      }
      if(clobber) {
        rmFile(target, function () {
          copyFile(file, target);
        });
      }
      if (modified) {
        var stat = dereference ? fs.stat : fs.lstat;
        stat(target, function(err, stats) {
            //if souce modified time greater to target modified time copy file
            if (file.mtime.getTime()>stats.mtime.getTime())
                copyFile(file, target);
            else return cb();
        });
      }
      else {
        return cb();
      }
    });
  }

  function copyFile(file, target) {
    var readStream = fs.createReadStream(file.name),
        writeStream = fs.createWriteStream(target, { mode: file.mode });
    
    readStream.on('error', onError);
    writeStream.on('error', onError);
    
    if(transform) {
      transform(readStream, writeStream, file);
    } else {
      writeStream.on('open', function() {
        readStream.pipe(writeStream);
      });
    }
    writeStream.once('finish', function() {
        if (modified) {
            //target file modified date sync.
            fs.utimesSync(target, file.atime, file.mtime);
            cb();
        }
        else cb();
    });
  }

  function rmFile(file, done) {
    fs.unlink(file, function (err) {
      if (err) {
        return onError(err);
      }
      return done();
    });
  }

  function onDir(dir) {
    var target = dir.name.replace(currentPath, targetPath);
    isWritable(target, function (writable) {
      if (writable) {
        return mkDir(dir, target);
      }
      copyDir(dir.name);
    });
  }

  function mkDir(dir, target) {
    fs.mkdir(target, dir.mode, function (err) {
      if (err) {
        return onError(err);
      }
      copyDir(dir.name);
    });
  }

  function copyDir(dir) {
    fs.readdir(dir, function (err, items) {
      if (err) {
        return onError(err);
      }
      items.forEach(function (item) {
        startCopy(path.join(dir, item));
      });
      return cb();
    });
  }

  function onLink(link) {
    var target = link.replace(currentPath, targetPath);
    fs.readlink(link, function (err, resolvedPath) {
      if (err) {
        return onError(err);
      }
      checkLink(resolvedPath, target);
    });
  }

  function checkLink(resolvedPath, target) {
    if (dereference) {
      resolvedPath = path.resolve(basePath, resolvedPath);
    }
    isWritable(target, function (writable) {
      if (writable) {
        return makeLink(resolvedPath, target);
      }
      fs.readlink(target, function (err, targetDest) {
        if (err) {
          return onError(err);
        }
        if (dereference) {
          targetDest = path.resolve(basePath, targetDest);
        }
        if (targetDest === resolvedPath) {
          return cb();
        }
        return rmFile(target, function () {
          makeLink(resolvedPath, target);
        });
      });
    });
  }

  function makeLink(linkPath, target) {
    fs.symlink(linkPath, target, function (err) {
      if (err) {
        return onError(err);
      }
      return cb();
    });
  }

  function isWritable(path, done) {
    fs.lstat(path, function (err) {
      if (err) {
        if (err.code === 'ENOENT') return done(true);
        return done(false);
      }
      return done(false);
    });
  }

  function onError(err) {
    if (options.stopOnError) {
      return cback(err);
    }
    else if (!errs && options.errs) {
      errs = fs.createWriteStream(options.errs);
    }
    else if (!errs) {
      errs = [];
    }
    if (typeof errs.write === 'undefined') {
      errs.push(err);
    }
    else { 
      errs.write(err.stack + '\n\n');
    }
    return cb();
  }

  function cb(skipped) {
    if (!skipped) running--;
    finished++;
    if ((started === finished) && (running === 0)) {
      if (cback !== undefined ) {
        return errs ? cback(errs) : cback(null);
      }
    }
  }
}




/***/ }),

/***/ 81:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("child_process");

/***/ }),

/***/ 147:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("fs");

/***/ }),

/***/ 17:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("path");

/***/ }),

/***/ 521:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("readline");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __nccwpck_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	var threw = true;
/******/ 	try {
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 		threw = false;
/******/ 	} finally {
/******/ 		if(threw) delete __webpack_module_cache__[moduleId];
/******/ 	}
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

// EXTERNAL MODULE: external "fs"
var external_fs_ = __nccwpck_require__(147);
// EXTERNAL MODULE: ./node_modules/cli-select/dist/index.js
var dist = __nccwpck_require__(398);
// EXTERNAL MODULE: ./node_modules/ncp/lib/ncp.js
var ncp = __nccwpck_require__(268);
;// CONCATENATED MODULE: ./src/helpers.ts
// import ncp from "ncp";


const fsPromises = external_fs_.promises;

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
const copyFile = async (source, target) => {
    ncp(source, target, function (err) {
        if (err) {
            throw err;
        }
    });
};
const runCommand = async (command) => {
    try {
        return await (__nccwpck_require__(81).execSync)(command, {
            stdio: "inherit",
        });
    }
    catch (error) {
        throw error;
    }
};
const isExists = (folderPath) => {
    if (!external_fs_.existsSync(folderPath)) {
        return false;
    }
    return true;
};
const deleteFolderIfExists = async (dir) => {
    if (isExists(dir)) {
        await fsPromises.rm(dir, { recursive: true });
    }
};
const makeFile = async (filePath, content) => {
    external_fs_.writeFileSync(filePath, content);
};
const selectOne = (values) => {
    return new Promise((resolve, reject) => {
        cliSelect({
            values: values,
            valueRenderer: (value, selected) => {
                if (selected) {
                    return value;
                }
                return value;
            },
        })
            .then((res) => {
            console.log("Selected =>", res.value);
            resolve(res.value);
        })
            .catch(() => {
            console.log("cancelled");
            reject();
        });
    });
};
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

// EXTERNAL MODULE: external "path"
var external_path_ = __nccwpck_require__(17);
;// CONCATENATED MODULE: ./src/templates.ts
const templateConfigs = {
    "vite-react": {
        constants: {
            siteName: "",
            apiUrl: "",
        },
        filesToCopy: [
            "src",
            "_templates",
            ".babel-plugin-macrosrc.json",
            ".eslintrc.json",
            ".prettierrc",
            "tsconfig.json",
            "vite.config.ts",
        ],
        scripts: {
            serve: "tsc && vite build && vite preview",
            mnc: "hygen component mantine --name",
            nc: "hygen component new --name",
            np: "hygen page new --name",
            tsc: "tsc",
            lint: "eslint ./src/**/*.{ts,tsx}",
            "lint:fix": "eslint --fix 'src/**/*.{ts,tsx}'",
        },
        dependencies: [
            "@emotion/react",
            "@fortawesome/fontawesome-svg-core",
            "@fortawesome/free-solid-svg-icons",
            "@fortawesome/react-fontawesome",
            "@mantine/core",
            "@mantine/form",
            "@mantine/hooks",
            "@reduxjs/toolkit",
            "@tanstack/react-query",
            "axios",
            "js-cookie",
            "react-redux",
            "react-router-dom",
        ],
        devDependencies: [
            "@types/js-cookie",
            "@typescript-eslint/eslint-plugin",
            "@typescript-eslint/parser",
            "babel-plugin-macros",
            "eslint",
            "eslint-config-prettier",
            "eslint-plugin-prettier",
            "eslint-plugin-react",
            "eslint-plugin-simple-import-sort",
            "prettier",
        ],
    },
};

;// CONCATENATED MODULE: ./src/index.ts




// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(".");
const args = process.argv.slice(2);
const appName = args[0];
const templates = ["vite-react"];
const clientPath = process.cwd();
const clientPath2 = external_path_.resolve("./");
const execPath = process.execPath;
const libPath = __dirname.slice(0, -4);
const createReactViteApp = async () => {
    let template = templates[0];
    const templatePath = `${libPath}/templates/${template}`;
    const configs = templateConfigs["vite-react"];
    const constants = {
        siteName: appName,
        apiUrl: "",
    };
    await runCommand(`yarn create vite ${appName} --template react-ts`);
    let packageContent = JSON.parse(external_fs_.readFileSync(`${appName}/package.json`, "utf8"));
    packageContent.scripts = {
        ...packageContent.scripts,
        ...configs.scripts,
    };
    await makeFile(`${appName}/package.json`, JSON.stringify(packageContent, null, 2));
    await deleteFolderIfExists(`./${appName}/src`);
    await asyncForEach(configs.filesToCopy, async (item) => {
        await copyFile(`${templatePath}/${item}`, `./${appName}/${item}`);
        console.log("Copied => ", item);
        await sleep(100);
    });
    await makeFile(`${appName}/src/configs/constants.ts`, `export const constants = ${JSON.stringify(constants, null, 2)}`);
    await sleep(200);
    await runCommand(`cd ${appName} && yarn`);
    await runCommand(`cd ${appName} && yarn add ${configs.dependencies.join(" ")}`);
    await runCommand(`cd ${appName} && yarn add -D ${configs.devDependencies.join(" ")}`);
};
const build = async () => {
    if (!appName) {
        console.log("Please input a name");
        return;
    }
    await createReactViteApp();
};
build();

})();

