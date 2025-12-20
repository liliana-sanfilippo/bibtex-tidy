import type { Transform } from "../types.ts";

export function createEncodeUrlsTransform(): Transform {
    console.log("createEncodeUrlsTransform")
	return {
		name: "encode-urls",
		apply: (ast) => {
			for (const field of ast.fields()) {
				if (field.name.toLocaleLowerCase() === "url") {
					for (const entry of field.value.concat) {
						entry.value = encodeUrl(entry.value);
					}
					ast.invalidateField(field);
				}
			}
			return undefined;
		},
	};
}

function encodeUrl(url: string): string {
	return url.replace(/\\?_/g, "\\%5F");
}
