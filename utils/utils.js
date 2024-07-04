import { fileURLToPath } from "url";
import path from "path";
export const getDirname = (importMetaUrl) => {
    const __filename = fileURLToPath(importMetaUrl);
    const __dirname = path.dirname(__filename);
    return { __filename, __dirname };
};
