import type { Transform } from "../types.ts";
import {generateKeys} from "../generateKeys.ts";

export function removeNumberPrefixFromKey(
    template: string
): Transform {
    return {
        name: "remove-number-prefix-keys",
        dependencies: ["generate-keys"],
        apply(astProxy) {
            const newKeys = generateKeys(astProxy.entries(), astProxy, template);
            for (const entry of astProxy.entries()) {
                const newKey = newKeys.get(entry);
                if (!entry.key) {
                    entry.key = newKey;
                }
                // todo hier schauen wegen den ! und ob da jemals was undefined sein kann
                if(isNumberPrefix(entry.key!.charAt(0))) {
                    let newkey = entry.key;
                    while (isNumberPrefix(newKey!.charAt(0)) && newKey!.length! > 0) {
                        newkey = newKey!.slice(1);
                    }
                    entry.key = newkey;
                }
            }
            return undefined;
        },
    };
}


function isNumberPrefix(prefix: string): prefix is `${number}` {
    return /^[0-9]+$/.test(prefix);
}