import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../../pages/baseUrl";

import MeetupsThumb01 from "../../images/meetups-thumb-01.jpg";
import MeetupsThumb02 from "../../images/meetups-thumb-02.jpg";
import MeetupsThumb03 from "../../images/meetups-thumb-03.jpg";
import MeetupsThumb04 from "../../images/meetups-thumb-04.jpg";
import MeetupsThumb05 from "../../images/meetups-thumb-05.jpg";
import MeetupsThumb06 from "../../images/meetups-thumb-06.jpg";
import MeetupsThumb07 from "../../images/meetups-thumb-07.jpg";
import MeetupsThumb08 from "../../images/meetups-thumb-08.jpg";
import UserImage01 from "../../images/avatar-01.jpg";
import UserImage02 from "../../images/avatar-02.jpg";
import UserImage03 from "../../images/avatar-03.jpg";
import UserImage04 from "../../images/avatar-04.jpg";
import UserImage05 from "../../images/avatar-05.jpg";
import UserImage06 from "../../images/avatar-06.jpg";
import NotFoundImage from "../../images/404-illustration.svg";
import moment from "moment";

function MeetupsPosts(props) {
  console.log(props.data);
  const event = props.data;
  return (
    <div>
      {event.length > 0 ? (
        <div className="grid xl:grid-cols-2 gap-6">
          {event.map((e) => {
            return (
              <article className="flex bg-white shadow-lg rounded-sm border border-slate-200 overflow-hidden">
                {/* Image */}
                <Link
                  className="relative block w-24 sm:w-56 xl:sidebar-expanded:w-40 2xl:sidebar-expanded:w-56 shrink-0"
                  to={"/activity/meetups-post?id=" + e.id}
                >
                  <img
                    className="absolute object-cover object-center w-full h-full"
                    src={e.background}
                    width="220"
                    height="236"
                    alt="Meetup 01"
                  />
                  {/* Like button */}
                  <button className="absolute top-0 right-0 mt-4 mr-4">
                    <div className="text-slate-100 bg-slate-900 bg-opacity-60 rounded-full">
                      <span className="sr-only">Like</span>
                      <svg className="h-8 w-8 fill-current" viewBox="0 0 32 32">
                        <path d="M22.682 11.318A4.485 4.485 0 0019.5 10a4.377 4.377 0 00-3.5 1.707A4.383 4.383 0 0012.5 10a4.5 4.5 0 00-3.182 7.682L16 24l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L16 21.247l-5.285-5A2.5 2.5 0 0112.5 12c1.437 0 2.312.681 3.5 2.625C17.187 12.681 18.062 12 19.5 12a2.5 2.5 0 011.785 4.251h-.003z" />
                      </svg>
                    </div>
                  </button>
                </Link>
                {/* Content */}
                <div className="grow p-5 flex flex-col">
                  <div className="grow flex flex-col justify-between">
                    <div>
                      <div className="text-sm font-semibold text-indigo-500 uppercase mb-2">
                        {moment(e.startTime).format("MMMM Do YYYY, h:mm:ss a")}
                        -&gt;{" "}
                        {moment(e.endTime).format("MMMM Do YYYY, h:mm:ss a")}
                      </div>
                      <Link
                        className="inline-flex mb-2"
                        to={"/activity/meetups-post?id=" + e.id}
                      >
                        <h3 className="text-lg font-bold text-slate-800">
                          {e.name}
                        </h3>
                      </Link>
                    </div>
                    <div className="flex items-center space-x-2">
                      <img
                        className="rounded-full border-2 border-white box-content avatar max-h-7"
                        src={e.owner.avatar}
                        width="28"
                        height="28"
                        alt="User 05"
                      />
                      <div className="text-sm">
                        <strong>Host :</strong> {e.owner.displayName}
                      </div>
                    </div>
                  </div>
                  {/* Footer */}
                  <div className="flex justify-between mt-3">
                    {/* Tag */}
                    <div className="text-xs inline-flex items-center font-medium bg-slate-100 text-slate-600 rounded-full text-center px-2.5 py-1">
                      <svg
                        className="w-4 h-3 fill-slate-400 mr-2"
                        viewBox="0 0 16 12"
                      >
                        <path d="m16 2-4 2.4V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.6l4 2.4V2ZM2 10V2h8v8H2Z" />
                      </svg>
                      <span>{e.activityType}</span>
                    </div>
                    
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div className="max-w-2xl m-auto mt-16">
            <div className="text-center px-4">
              <div className="inline-flex mb-8">
                <img
                  src={NotFoundImage}
                  width="176"
                  height="176"
                  alt="404 illustration"
                />
              </div>
              <div className="mb-6">
                No event left. Let's create one
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MeetupsPosts;
