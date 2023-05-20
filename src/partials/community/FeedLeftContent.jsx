import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../pages/baseUrl';

function FeedLeftContent() {
  return (
    <div className="w-full md:w-60 mb-8 md:mb-0">
      <div className="md:sticky md:top-16 md:h-[calc(100vh-64px)] md:overflow-x-hidden md:overflow-y-auto no-scrollbar">
        <div className="md:py-8">
          
          {/* Title */}
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Newsfeed ✨</h1>
          </header>
          
          {/* Search form */}
          <div className="xl:hidden mb-6">
            <form className="relative">
              <label htmlFor="feed-search-mobile" className="sr-only">
                Search
              </label>
              <input id="feed-search-mobile" className="form-input w-full pl-9 focus:border-slate-300" type="search" placeholder="Search…" />
              <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                <svg
                  className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </form>
          </div>
          

          
        </div>
      </div>
    </div>
  );
}

export default FeedLeftContent;
