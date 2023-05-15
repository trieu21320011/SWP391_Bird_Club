import React from 'react';

function ForumLeftContent() {
  return (
    <div className="w-full md:w-60 mb-8 md:mb-0">
      <div className="md:sticky md:top-16 md:h-[calc(100vh-64px)] md:overflow-x-hidden md:overflow-y-auto no-scrollbar">
        <div className="md:py-8">
          <div className="flex justify-between items-center md:block">
            {/* Title */}
            <header className="mb-6">
              <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Blogs ✨</h1>
            </header>

            {/* Button */}
            <div className="xl:hidden mb-6">
              <button className="btn md:w-full bg-indigo-500 hover:bg-indigo-600 text-white">Blog</button>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-4 md:space-y-3 -mx-4">

          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumLeftContent;
