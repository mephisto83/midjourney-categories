export function captureParameterValues() {
    const regex = /"(?<letter>[A-Z0-9]*)" spelled out in (?<color>[a-zA-Z0-9 \(\)]*) drawn by (?<artist>Ian Miller) --upbeta --v 4 --upbeta --upbeta --v 4 /;

    // Alternative syntax using RegExp constructor
    // const regex = new RegExp('"(?<letter>[A-Z0-9]*)" spelled out in (?<color>[a-zA-Z0-9 \\(\\)]*) drawn by (?<artist>Ian Miller) --upbeta --v 4 --upbeta --upbeta --v 4 ', '')

    const str = `"5" spelled out in Pastel Blue drawn by Ian Miller --upbeta --v 4 --upbeta --upbeta --v 4 `;
    let m;

    if ((m = regex.exec(str)) !== null) {
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            console.log(`Found match, group ${groupIndex}: ${match}`);
        });
    }
}