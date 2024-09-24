'use client';

import { MDXRemote } from 'next-mdx-remote';
import RelatedComparisons from '@/components/RelatedComparisons';

export default function MDXContent({ source, comparisons }) {
  return <MDXRemote {...source} 
            components={{RelatedComparisons: RelatedComparisons(comparisons)}}
          />;
}