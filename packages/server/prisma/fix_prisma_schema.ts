import * as fs from "fs";
const prismaSchema = fs.readFileSync('prisma/schema.prisma', 'utf-8')
const lines = prismaSchema.split("\n");
function replaceBetween(string,replacement,start,ending)
{
    replacement = start + ' ' + replacement;

    var pattern = new RegExp(start + ' \.+(?=' + ending + ')','g');

    return string.replace(pattern, replacement + ' ');
}
function replaceBetweenAndIncluding(string,replacement,start,ending)
{
    replacement = replaceBetween(string,replacement,start,ending);
    replacement = replacement.replace(start,'');
    replacement = replacement.replace(ending,'');
    return replacement;
}
const newLines = lines.map(line => {
    if (line.includes("time without time zone\"))")) {
        return replaceBetweenAndIncluding(line, "", "@default(dbgenerated(",
          "::time without time zone\"))");
    }
    if (line.includes("_fk") && line.includes("@@index(") && !line.includes("_idx")) {
        return line.replace("_fk", "_fk_idx");
    }

    if (line.trim().startsWith("wp_") && line.includes("@relation")) {
        return line.replace("wp_", "");
    }
    return line;
})
fs.writeFileSync('prisma/schema.prisma', newLines.join("\n"));
