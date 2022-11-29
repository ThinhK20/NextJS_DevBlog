import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next';
import {useEffect, useMemo, useState} from 'react';
import BlogPreview from '../components/BlogPreview';
import PageHeader from '../components/PageHeader';
import {getBlogs} from '../server/blogs';
import {BlogPost} from '../types/blog';

const Home: NextPage = ({
  blogData,
  tags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [filterWord, setFilterWord] = useState<string[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number[]>([]);

  const filterBlog: BlogPost[] = useMemo(() => {
    return filterWord.length > 0
      ? blogData.filter((blog: BlogPost) => {
          return filterWord.every((filter) => blog.tags.includes(filter));
        })
      : blogData;
  }, [filterWord]);

  const filterLabel = (tag: EventTarget, idx: number) => {
    if (tag instanceof Element) {
      if (selectedIdx.includes(idx)) {
        setSelectedIdx(selectedIdx.filter((id) => id !== idx));
        setFilterWord(filterWord.filter((filter) => filter !== tag.innerHTML));
      } else {
        setSelectedIdx([...selectedIdx, idx]);
        setFilterWord([...filterWord, tag.innerHTML]);
      }
    }
  };

  return (
    <>
      <PageHeader/>
      <main className="layout">
        <title>Home Page</title>
        <section>
          <div className="mt-3 text-center">
            <h1 className="text-[3rem]">Welcome to Dev Blog</h1>
            <p className="">
              A full-stack blog made with Next.js, TailwindCSS, Github GraphQL
            </p>
          </div>
        </section>
        <section className="flex flex-col items-center text-[1.15rem] mt-12">
          <div className="flex gap-3 mb-12">
            {tags.map((tag: string, idx: number) => {
              return (
                <button
                  className={`${
                    selectedIdx.includes(idx) ? 'label-selected' : 'label '
                  } hover:bg-sky-400 transition-all duration-300`}
                  key={idx}
                  onClick={(e) => filterLabel(e.target, idx)}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {filterBlog.map((blog: BlogPost) => {
            return (
              <div
                className="w-[80rem] max-h overflow-hidden mx-6 mb-6 bg-neutral-200 text-zinc-800 rounded-lg p-4 hover:bg-slate-600 hover:text-neutral-300 transition-all duration-300"
                key={blog.id}
              >
                <a href={blog.url} rel="noreferrer">
                  <BlogPreview
                    title={blog.title}
                    bodyText={blog.bodyText}
                    createdAt={blog.createdAt}
                    author={blog.author}
                    tags={blog.tags}
                    lastEdited={blog.lastEdited}
                  />
                </a>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  let blogs: BlogPost[] = await getBlogs();
  let tags: string[] = [];
  for (const blog of blogs) {
    for (const tag of blog.tags) {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    }
  }
  return {
    props: {
      blogData: blogs,
      tags: tags,
    },
  };
};
