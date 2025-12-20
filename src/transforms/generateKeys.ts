import { generateKeys } from "../generateKeys.ts";
import type { Transform } from "../types.ts";

export function createGenerateKeysTransform(template: string): Transform {
	return {
		name: "generate-keys",
		apply: (astProxy) => {
			const newKeys = generateKeys(astProxy.entries(), astProxy, template);
            console.log("Entries: " + astProxy.entries().length)
			for (const entry of astProxy.entries()) {
				const newKey = newKeys.get(entry);
				if (newKey) {
					entry.key = newKey;
				}
			}
            console.log("createGenerateKeysTransform")
			return undefined;
		},
	};
}
