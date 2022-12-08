import path from 'path';
import fs from 'fs';

export async function readDeep(dir): Promise<string[]> {
    return new Promise((resolve, fail) => {
        walk(dir, (err, res) => {
            if (!err) {
                resolve(res);
            }
            else {
                fail(err);
            }
        })
    })
}
function walk(dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

function ensureDirectory(dir) {
    if (!fs.existsSync(dir)) {
        console.log(`doesnt exist : ${dir}`);
    }
    if (dir.indexOf('.') !== -1) {
        dir = path.dirname(dir);
    }
    const _dir_parts = dir.split(path.sep);
    _dir_parts.map((_, i) => {
        if (i > 1 || _dir_parts.length - 1 === i) {
            let tempDir = path.join(..._dir_parts.slice(0, i + 1));
            if (dir.startsWith(path.sep)) {
                tempDir = `${path.sep}${tempDir}`;
            }
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir);
            }
        }
    });
}

(async () => {
    let files = await readDeep(path.join('..', 'categorize', 'public', 'images'));
    files = files.filter(x => x.endsWith('.png'));
    console.log(`files: ${files.length}`);
})();