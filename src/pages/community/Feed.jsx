import React, { useState, useRef } from 'react';
import { convertToRaw, EditorState } from "draft-js";

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import FeedLeftContent from '../../partials/community/FeedLeftContent';
import FeedPosts from '../../partials/community/FeedPosts';
import FeedRightContent from '../../partials/community/FeedRightContent';
import ModalBasic from '../../components/ModalBasic';
import Swal from 'sweetalert2';
import { baseURL } from '../baseUrl';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Avatar from '../../images/user-40-02.jpg';
import axios from 'axios';

function Feed() {
  const childRef = useRef()
  const id = localStorage.getItem('uid')
  const [value, setValue] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const name = localStorage.getItem('name')
  const [title, setTitle] = useState();
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
  const date = new Date(2023, 11, 13).toDateString()
  const check = new Date("2023-05-20T07:54:08.797").toDateString() === new Date(2023, 4, 20).toDateString()
  console.log(check);
  console.log(new Date("2023-05-20T07:54:08.797").toDateString());
  console.log(new Date(2023, 4, 20).toDateString());
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font"
  ];
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }]
    ]
  };
  const handleCreate = (e) => {
    e.preventDefault()
    Swal.fire({
      title: 'Xác nhận thông tin',
      html: 'This will close in a minutes',

      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
      },
    })
    var data = JSON.stringify({
      "ownerId": id,
      "title": title,
      "content": value
    });

    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseURL + '/newsfeeds/blogs',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        Swal.close()
        Swal.fire(
          "Good job!",
          "You success create a blog!",
          "success",
        );
        childRef.current.getDat()
      })
      .catch(function (error) {
        console.log();
        Swal.close()
        Swal.fire("Oops", "Wrong id or password!", "error");
      });

  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-0 w-full max-w-9xl mx-auto">

            <div className="xl:flex">

              {/* Left + Middle content */}
              <div className="md:flex flex-1">

                {/* Left content */}
                <FeedLeftContent />

                {/* Middle content */}
                <div className="flex-1 md:ml-8 xl:mx-4 2xl:mx-8">
                  <div className="md:py-8">

                    {/* Blocks */}
                    <div className="space-y-4">

                      {/* Post Block */}
                      <div className="bg-white shadow-md rounded border border-slate-200 p-5">
                        <div className="flex items-center space-x-3 mb-5">
                          <img className="rounded-full shrink-0" src={Avatar} width="40" height="40" alt="User 02" />
                          <div className="grow">
                            <label htmlFor="status-input" className="sr-only">
                              Let write a blog, {name}?
                            </label>
                            <input
                              id="status-input"
                              className="form-input w-full bg-slate-100 border-transparent focus:bg-white focus:border-slate-300 placeholder-slate-500"
                              type="text"
                              placeholder="What's happening, Mark?"
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <button aria-controls="feedback-modal" className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap" onClick={(e) => { e.stopPropagation(); setFeedbackModalOpen(true); }}>
                              Create blog -&gt;
                            </button>
                            <ModalBasic id="feedback-modal" modalOpen={feedbackModalOpen} setModalOpen={setFeedbackModalOpen} title="Let's write a blog">
                              {/* Modal content */}
                              <div className="px-5 py-4">
                                <div className="text-sm">
                                  <div className="font-medium text-slate-800 mb-3">Let us know what you think 🙌</div>
                                </div>
                                <div className="space-y-3">
                                  <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="name">Title <span className="text-rose-500">*</span></label>
                                    <input id="name" className="form-input w-full px-2 py-1" type="text" required onChange={e => setTitle(e.target.value)} />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="feedback">Message <span className="text-rose-500">*</span></label>
                                    <ReactQuill theme="snow"
                                      modules={modules}
                                      formats={formats}
                                      value={value} onChange={setValue} />
                                  </div>
                                </div>
                              </div>
                              {/* Modal footer */}
                              <div className="px-5 py-4 border-t border-slate-200">
                                <div className="flex flex-wrap justify-end space-x-2">
                                  <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setFeedbackModalOpen(false); }}>Cancel</button>
                                  <button onClick={e => handleCreate(e)} className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Create</button>
                                </div>
                              </div>
                            </ModalBasic>
                          </div>
                        </div>
                      </div>

                      {/* Posts */}
                      <FeedPosts ref={childRef} />

                    </div>


                  </div>
                </div>

              </div>

              {/* Right content */}
              <FeedRightContent />

            </div>

          </div>
        </main>

      </div>
    </div>
  );
}

export default Feed;