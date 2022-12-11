export function captureParameterValues(str: string) {
    const regex = /(?<username>[a-zA-Z0-9]*)_(?<letter>[A-Z0-9]*)_spelled_out_in_(?<color>[a-zA-Z0-9_\.\- \(\)]*)_drawn_by_(?<artist>[a-zA-Z0-9_ \(\)]*)_/gm;
    
    // Alternative syntax using RegExp constructor
    // const regex = new RegExp('(?<username>[a-zA-Z0-9]*)_(?<letter>[A-Z0-9]*)_spelled_out_in_(?<color>[a-zA-Z0-9_ \\(\\)]*)_drawn_by_(?<artist>[a-zA-Z0-9_ \\(\\)]*)', 'gm')

    // const str = `aporter_0_spelled_out_in_Super_Pink_drawn_by_Robert_Storm_Peter_b60082ae-1197-445c-83a9-79c346144e97_x1_y0.png`;
    let m: any;
    let result: any = {
    }
    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        if (m?.groups) {
            result = {
                letter: m?.groups?.letter,
                color: m?.groups?.color,
                artist: m?.groups?.artist?.split('_').join(' ')
            }
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match: any, groupIndex: any) => {
            console.log(`Found match, group ${groupIndex}: ${match}`);
        });
    }
    return result;
}