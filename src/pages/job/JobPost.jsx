import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import JobListItem from '../../partials/job/JobListItem';

import Image03 from '../../images/company-icon-03.svg';
import Image04 from '../../images/company-icon-07.svg';
import Image05 from '../../images/company-icon-08.svg';
import Image06 from '../../images/company-icon-01.svg';
import { useNavigate } from 'react-router-dom';
import ModalBasic from '../../components/ModalBasic';

function JobPost() {

  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
  const uid = localStorage.getItem("uid")
    let navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
    const handleOnClick= (e) => {
      e.preventDefault()
      navigate('/job/users-tiles')
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
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
            {/* Page content */}
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row lg:space-x-8 xl:space-x-16">
              {/* Content */}
              <div>
                <div className="text-sm text-slate-500 italic mb-2">Posted Jan 6, 2023</div>
                <header className="mb-4">
                  {/* Title */}
                  <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Your bird club online</h1>
                </header>

                {/* Company information (mobile) */}
                <div className="bg-white p-5 shadow-lg rounded-sm border border-slate-200 mb-6 lg:hidden">
                  <div className="text-center mb-6">
                    <div className="inline-flex mb-3">
                      <img className="w-16 h-16 rounded-full" src={Image06} width="64" height="64" alt="Company 01" />
                    </div>
                    <div className="text-lg font-bold text-slate-800 mb-1">Revolut Ltd</div>
                    <div className="text-sm text-slate-500 italic">179 Jobs Posted</div>
                  </div>
                </div>


                <hr className="my-6 border-t border-slate-200" />

                {/* The Role */}
                <div>
                  <h2 className="text-xl leading-snug text-slate-800 font-bold mb-2">The Role</h2>
                  <div className="space-y-6">
                    <p>Whether it’s for a large club or just you and your friends, BirdClub provides you with a space to connect, share records and publish photos - all for free..</p>
                    <p>
                      At the Bird Club, we are passionate about birds and all things avian. We are a community of bird enthusiasts, from beginners to experienced birders, united by our love for these magnificent creatures. Whether you're an avid birder or simply have a curiosity about the fascinating world of birds, you've come to the right place.
                    </p>
                    <p>
                    At the Bird Club, we are passionate about birds and all things avian. We are a community of bird enthusiasts, from beginners to experienced birders, united by our love for these magnificent creatures. Whether you're an avid birder or simply have a curiosity about the fascinating world of birds, you've come to the right place.
                    </p>
                  </div>
                </div>


                <hr className="my-6 border-t border-slate-200" />

                {/* Things You Might Do */}
                <div>
                  <h2 className="text-xl leading-snug text-slate-800 font-bold mb-2">Bird made simple.</h2>
                  <div className="space-y-6">
                    <p>
                    Everything you need is in one place: members, records, photos, and more.
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Give back to the community via open source and blog posts</li>
                      <li>
                        Travel and meet great people- as part of our remote-first lifestyle, it's important that we come together as needed to work
                        together, meet each other in person and have fun together. Please keep that in mind when you apply.
                      </li>
                      <li>
                        Teach and be taught: Modus creates active teams that work in internal and external projects together, giving opportunities to
                        stay relevant with the latest technologies and learning from experts worldwide
                      </li>
                      <li>Interact directly with internal and external clients to represent Modus and its values</li>
                    </ul>
                  </div>
                </div>

                {/* Apply section */}
                <div className="mt-6">
                  <p className="font-medium text-slate-800 italic mb-6">Do you have what it takes?</p>
                  <div className="flex justify-between items-center">
                    {/* Apply button */}
                    {/* Share */}
                    <div className="flex items-center">
                      <div className="text-sm text-slate-500 italic mr-4">Share:</div>
                      <div className="flex items-center space-x-3">
                        <button className="text-slate-400 hover:text-indigo-500">
                          <span className="sr-only">Share on Twitter</span>
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 3.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8Z" />
                          </svg>
                        </button>
                        <button className="text-slate-400 hover:text-indigo-500">
                          <span className="sr-only">Share on Facebook</span>
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.023 16 6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023Z" />
                          </svg>
                        </button>
                        <button className="text-slate-400 hover:text-indigo-500">
                          <span className="sr-only">Share on Linkedin</span>
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 1.146C0 .514.53 0 1.182 0h13.635C15.471 0 16 .513 16 1.146v13.708c0 .633-.53 1.146-1.183 1.146H1.182C.53 16 0 15.487 0 14.854V1.146ZM4.862 13.39V6.187H2.468v7.203h2.394ZM3.666 5.203c.834 0 1.354-.553 1.354-1.244-.016-.707-.52-1.245-1.338-1.245-.82 0-1.355.538-1.355 1.245 0 .691.52 1.244 1.323 1.244h.015Zm2.522 8.187h2.394V9.368c0-.215.015-.43.078-.584.173-.43.567-.876 1.229-.876.866 0 1.213.66 1.213 1.629v3.853h2.394V9.26c0-2.213-1.181-3.242-2.756-3.242-1.292 0-1.86.722-2.174 1.213h.016V6.187H6.188c.03.676 0 7.203 0 7.203Z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-6 border-t border-slate-200" />
              </div>

              {/* Sidebar */}
              <div className="hidden lg:block space-y-4">

                {/* Company information (desktop) */}
                <div className="bg-white p-5 shadow-lg rounded-sm border border-slate-200 lg:w-72 xl:w-80">
                  <div className="text-center mb-6">
                    <div className="inline-flex mb-3">
                      <img className="w-16 h-16 rounded-full" src="https://www.bird.club/assets/avatars/thrush-0c3b012d5b61ac56781c674e26281202be20fb57ebe4ca0e8fb06f82214c6064.png" width="64" height="64" alt="Company 01" />
                    </div>
                    <div className="text-lg font-bold text-slate-800 mb-1">Bird club</div>
                    
                  </div>
                  <div className="space-y-2">
                  {!uid && (
                    <Link className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white" aria-controls="feedback-modal" to="/signup" >Become one of us -&gt;</Link>
                  )}
                    
                    {/* Send Feedback */}
                    <div className="m-1.5">
                      {/* Start */}
                      <ModalBasic id="feedback-modal" modalOpen={feedbackModalOpen} setModalOpen={setFeedbackModalOpen}  title="Become one of us">
                        {/* Modal content */}
                        <div className="px-5 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-slate-800 mb-3">Let us know why you want to be staff 🙌</div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium mb-1" htmlFor="feedback">Message <span className="text-rose-500">*</span></label>
                              <textarea id="feedback" className="form-textarea w-full px-2 py-1" rows="4" required></textarea>
                            </div>
                          </div>
                        </div>
                        {/* Modal footer */}
                        <div className="px-5 py-4 border-t border-slate-200">
                          <div className="flex flex-wrap justify-end space-x-2">
                            <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setFeedbackModalOpen(false); }}>Cancel</button>
                            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Send</button>
                          </div>
                        </div>
                      </ModalBasic>
                      {/* End */}
                    </div>
                    <button className="btn w-full border-slate-200 hover:border-slate-300 text-slate-600" onClick={e => handleOnClick(e)}>Our staffs</button>
                  </div>
                </div>

              </div>
              
            </div>

          </div>
        </main>

      </div>

    </div>
  );
}

export default JobPost;