"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDeep = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
async function readDeep(dir) {
    return new Promise((resolve, fail) => {
        walk(dir, (err, res) => {
            if (!err) {
                resolve(res);
            }
            else {
                fail(err);
            }
        });
    });
}
exports.readDeep = readDeep;
function walk(dir, done) {
    var results = [];
    fs_1.default.readdir(dir, function (err, list) {
        if (err)
            return done(err);
        var pending = list.length;
        if (!pending)
            return done(null, results);
        list.forEach(function (file) {
            file = path_1.default.resolve(dir, file);
            fs_1.default.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending)
                            done(null, results);
                    });
                }
                else {
                    results.push(file);
                    if (!--pending)
                        done(null, results);
                }
            });
        });
    });
}
;
function ensureDirectory(dir) {
    if (!fs_1.default.existsSync(dir)) {
        console.log(`doesnt exist : ${dir}`);
    }
    if (dir.indexOf('.') !== -1) {
        dir = path_1.default.dirname(dir);
    }
    const _dir_parts = dir.split(path_1.default.sep);
    _dir_parts.map((_, i) => {
        if (i > 1 || _dir_parts.length - 1 === i) {
            let tempDir = path_1.default.join(..._dir_parts.slice(0, i + 1));
            if (dir.startsWith(path_1.default.sep)) {
                tempDir = `${path_1.default.sep}${tempDir}`;
            }
            if (!fs_1.default.existsSync(tempDir)) {
                fs_1.default.mkdirSync(tempDir);
            }
        }
    });
}
(async () => {
    let files = await readDeep(path_1.default.join('..', 'categorize', 'public', 'images'));
    files = files.filter(x => x.endsWith('.png'));
    console.log(`files: ${files.length}`);
})();
//# sourceMappingURL=index.js.map