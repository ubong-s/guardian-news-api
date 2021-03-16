import React from 'react';

import { useGlobalContext } from './context';

const Stories = () => {
  const { isLoading, results } = useGlobalContext();

  if (isLoading) {
    return <div className='loading'></div>;
  }

  return (
    <section className='stories'>
      {results.map((story) => {
        const { id, sectionName, webTitle, webUrl } = story;

        return (
          <article className='story' key={id}>
            <button type='button' className='btn'>
              {sectionName}
            </button>
            <h4>{webTitle}</h4>
            {/* <p>{webPublicationDate}</p> */}
            <a
              href={webUrl}
              className='read-link'
              target='_blank'
              rel='noreferrer'
            >
              Read More
            </a>
          </article>
        );
      })}
    </section>
  );
};

export default Stories;
