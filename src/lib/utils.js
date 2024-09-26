import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';

export const WEBSITE_TITLE = "CodeClash: Compare Programming Languages & Frameworks";

const articlesDirectory = path.join(process.cwd(), 'src/app/articles');
const stacksDirectory = path.join(process.cwd(), 'src/app/stacks');
const paradigmsDirectory = path.join(process.cwd(), 'src/app/paradigms');

export function getAllStacks() {
    const fileNames = fs.readdirSync(stacksDirectory);
    return fileNames.filter(fname => /\.(md|mdx)$/.test(fname)).map(fileName => {
        return {
            params: {
                code: fileName.replace(/\.(md|mdx)$/, ''),
                type: "stack"
            }
        };
    });
}

export function getAllParadigms() {
    const fileNames = fs.readdirSync(paradigmsDirectory);
    return fileNames.filter(fname => /\.(md|mdx)$/.test(fname)).map(fileName => {
        return {
            params: {
                code: fileName.replace(/\.(md|mdx)$/, ''),
                type: 'paradigm'
            }
        };
    });
}

export function getAllComparisonIds() {
    const fileNames = fs.readdirSync(articlesDirectory);
    return fileNames.filter(fname => /\.(md|mdx)$/.test(fname)).map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.(md|mdx)$/, ''),
                type: "article"
            }
        };
    });
}

export function getComparisonData(id) {
    const fullPath = path.join(articlesDirectory, `${id}.md`) || path.join(articlesDirectory, `${id}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
        id,
        ...matterResult.data,
        content: matterResult.content
    };
}

export async function getComparisonContent(id, type="articles") {
    id = decodeURIComponent(id).replace("[-]", "#");
    const folderMapping = {
        "articles": articlesDirectory,
        "stacks": stacksDirectory,
        "paradigms": paradigmsDirectory
    }

    const mdPath = path.join(folderMapping[type], `${id}.md`);
    const mdxPath = path.join(folderMapping[type], `${id}.mdx`);
    
    let fullPath;
    if (fs.existsSync(mdPath)) {
        fullPath = mdPath;
    } else if (fs.existsSync(mdxPath)) {
        fullPath = mdxPath;
    } else {
        throw new Error(`File not found: ${mdPath} - ${mdxPath}`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    let contentHtml;
    if (path.extname(fullPath) === '.md') {
        const processedContent = await remark()
            .use(html)
            .use(rehypeHighlight)
            .process(matterResult.content);
        contentHtml = processedContent.toString();
    } else {
        // For MDX files
        const mdxSource = await serialize(matterResult.content, {
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight] // Add syntax highlighting for MDX
            }
        });
        contentHtml = mdxSource;
    }

    return {
        id,
        ...matterResult.data,
        contentHtml
    };
}