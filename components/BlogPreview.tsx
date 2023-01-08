import React from 'react';
import {BlogPost} from '../types/blog';
import BlogHeader from './BlogHeader';

const BlogPreview: React.FC<BlogPost> = (props) => {
  const {bodyText, title, createdAt, tags, author, lastEdited} = props;
  const previewText: string = bodyText.substring(0, 150) + '...';
  return (
    <section>
      <div className="my-[4px]">
        <BlogHeader createdAt={createdAt} author={author} />
      </div>
      <h2 className="font-bold"> {title} </h2>
      <p className="mt-2">{previewText}</p>
      <div className="flex gap-3">
        {tags.map((tag: string, idx) => {
          return (
            <p
              key={idx}
              className="bg-sky-600 px-2 mt-2 font-medium text-[1rem] rounded-xl text-zinc-800"
            >
              {tag}
            </p>
          );
        })}
      </div>
    </section>
  );
};

export default BlogPreview;
