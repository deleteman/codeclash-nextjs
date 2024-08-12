import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';


const articlesDirectory = path.join(process.cwd(), 'src/app/articles');

export function getAllComparisonIds() {
    const fileNames = fs.readdirSync(articlesDirectory);
    return fileNames.filter(fname => /\.(md|mdx)$/.test(fname)).map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.(md|mdx)$/, '')
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

export async function getComparisonContent(id) {
    id = decodeURIComponent(id)
    const mdPath = path.join(articlesDirectory, `${id}.md`);
    const mdxPath = path.join(articlesDirectory, `${id}.mdx`);
    
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