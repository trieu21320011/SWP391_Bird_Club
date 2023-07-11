import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import axios from "axios";
import { baseURL } from "../../pages/baseUrl";
import Avatar from "../../images/user-40-02.jpg";
import UserImage07 from "../../images/user-32-07.jpg";
import ModalBlank from "../../components/ModalBlank";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import ModalBasic from "../../components/ModalBasic";
import moment2 from "moment/moment";
import { Role } from "../../pages/enum/roleEnum";
import Rating from '@mui/material/Rating';

function MeetupsPost() {
  var eventId = window.location.search.split("=")[1];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [feedBackModal, setfeedBackModal] = useState(false);
  const [eventDetail, setEventsDetail] = useState(null);
  const [eventDetailAttend, setEventsDetailAttend] = useState([]);
  const [status, setStatus] = useState({});
  const uid = localStorage.getItem("uid");
  const role = localStorage.getItem("role");
  const infor = JSON.parse(localStorage.getItem("infor"));
  const [commentContent, setCommentContent] = useState();
  const [relatedEvent, setReletedEvent] = useState();
  const [rate, setRate] = useState(2)
  const [comment, setComment] = useState('')
  // const eventId = props.location.search.split("=")[1];
  const handleJoin = (e) => {
    e.preventDefault();
    var data = JSON.stringify({
      memberId: parseInt(uid, 10),
      activityId: parseInt(eventId, 10),
    });
    console.log(data);
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: baseURL + "/activities/attendance-requests",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        setInfoModalOpen(false);
        Swal.fire("Good job!", "Sending a request!", "success");
        getStatusMember();
      })
      .catch(function (error) {
        console.log();
        setInfoModalOpen(false);
      });
  };

  const handleFeedBack = (e) => {
    e.preventDefault();
    var data = JSON.stringify({

      ownerId: parseInt(uid, 10),
      activityId: parseInt(eventId, 10),
      rating: parseInt(rate, 10),
      content: comment
    });
    console.log(data);
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: baseURL + "/feedbacks",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        setfeedBackModal(false);
        Swal.fire("Good job!", "Success send your feedback!", "success");
        getStatusMember();
      })
      .catch(function (error) {
        console.log();
        setfeedBackModal(false);
      });

  }
  const getAttendantList = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: baseURL + "/activities/" + eventId + "/listattendance",
    };

    axios
      .request(config)
      .then((response) => {
        setEventsDetailAttend(response.data);
        console.log(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getStatusMember();
    getAttendantList();
    getEvent();
  }, []);

  const getEvent = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: baseURL + "/activities/" + eventId,
    };

    axios
      .request(config)
      .then((response) => {
        setEventsDetail(response.data);
        return response.data;
      })
      .then((event) => {
        getRelatedEvent(event);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getStatusMember = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        baseURL +
        "/activities/" +
        eventId +
        "/user-attendance-status?memberId=" +
        uid,
    };

    axios
      .request(config)
      .then((response) => {
        setStatus(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postComment = (id, content) => {
    const uid = localStorage.getItem("uid");
    var data = JSON.stringify({
      ownerId: uid,
      content: content,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: baseURL + "/activities/" + id + "/comment",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios.request(config).then((response) => {
      getEvent();
      setCommentContent("");
    });
  };

  const handleChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      postComment(eventDetail.id, commentContent);
    }
  };

  const getRelatedEvent = (eventDetail) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: baseURL + "/activities",
    };

    axios
      .request(config)
      .then((response) => {
        var events = response.data;
        var releted = events.filter(
          (event) =>
            event.activityType == eventDetail.activityType &&
            event.id != eventDetail.id
        )[0];
        setReletedEvent(releted);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {eventDetail ? (
          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
              {/* Page content */}
              <div className="max-w-5xl mx-auto flex flex-col lg:flex-row lg:space-x-8 xl:space-x-16">
                {/* Content */}
                <div>
                  <div className="text-sm font-semibold text-indigo-500 uppercase mb-2">
                    {moment(eventDetail.startTime).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                    -&gt;{" "}
                    {moment(eventDetail.endTime).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </div>
                  <header className="mb-4">
                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-2">
                      {eventDetail.name}
                    </h1>
                  </header>

                  {/* Meta */}
                  <div className="space-y-3 sm:flex sm:items-center sm:justify-between sm:space-y-0 mb-6">
                    {/* Author */}
                    <div className="flex items-center sm:mr-4">
                      <a className="block mr-2 shrink-0" href="#0">
                        <img
                          className="rounded-full w-8 h-8"
                          src={eventDetail.owner.avatar}
                          width="32"
                          height="32"
                          alt="User 04"
                        />
                      </a>
                      <div className="text-sm whitespace-nowrap">
                        Hosted by{" "}
                        <Link
                          to={"/job/profile?id=" + eventDetail.owner.memberId}
                        >
                          <a className="font-semibold text-slate-800">
                            {eventDetail.owner.displayName}
                          </a>
                        </Link>
                      </div>
                    </div>
                    {/* Right side */}
                    <div className="flex flex-wrap items-center sm:justify-end space-x-2">
                      {/* Tags */}
                      <div className="text-xs inline-flex items-center font-medium bg-white text-slate-600 rounded-full text-center px-2.5 py-1">
                        <svg
                          className="w-4 h-3 fill-slate-400 mr-2"
                          viewBox="0 0 16 12"
                        >
                          <path d="m16 2-4 2.4V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.6l4 2.4V2ZM2 10V2h8v8H2Z" />
                        </svg>
                        <span>{eventDetail.activityType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <figure className="mb-6">
                    <img
                      className="w-full rounded-sm"
                      src={eventDetail.background}
                      width="640"
                      height="360"
                      alt="Meetup"
                    />
                  </figure>

                  {/* Post content */}
                  <div>
                    <h2 className="text-xl leading-snug text-slate-800 font-bold mb-2">
                      Meetup Details
                    </h2>

                    <p
                      dangerouslySetInnerHTML={{
                        __html: eventDetail.description,
                      }}
                    />
                  </div>
                  <hr className="my-6 border-t border-slate-200" />

                  {/* Photos */}
                  {/* <div>
                  <h2 className="text-xl leading-snug text-slate-800 font-bold mb-2">Photos (3)</h2>
                  <div className="grid grid-cols-3 gap-4 my-6">
                    <a className="block" href="#0">
                      <img className="w-full rounded-sm" src={MeetupPhoto01} width="203" height="152" alt="Meetup photo 01" />
                    </a>
                    <a className="block" href="#0">
                      <img className="w-full rounded-sm" src={MeetupPhoto02} width="203" height="152" alt="Meetup photo 02" />
                    </a>
                    <a className="block" href="#0">
                      <img className="w-full rounded-sm" src={MeetupPhoto03} width="203" height="152" alt="Meetup photo 03" />
                    </a>
                  </div>
                </div> */}

                  {/* Comments */}
                  <div>
                    <h2 className="text-xl leading-snug text-slate-800 font-bold mb-2">
                      Comments ({eventDetail.comments.length})
                    </h2>
                    <ul className="space-y-5 my-6">
                      {/* Comment */}
                      {eventDetail.comments.map((comment, index) => {
                        return (
                          <li className="flex items-center">
                            <a className="block mr-3 shrink-0" href="#0">
                              <img
                                className="rounded-full w-8 h-8"
                                src={comment.owner.avatar ?? UserImage07}
                                width="32"
                                height="32"
                                alt="User 07"
                              />
                            </a>
                            <div className="grow">
                              <div className="flex space-x-2">
                                <div className="text-sm font-semibold text-slate-800 mb-1">
                                  {comment.owner.displayName}
                                </div>
                                <div className="text-sm font-light text-slate-800 mb-1">
                                  {moment2(
                                    new Date(comment.publicationTime)
                                  ).format("DD/MM/YYYY, h:mm:ss A")}
                                </div>
                              </div>
                              <div className="italic">{comment.content}</div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  {role != Role.guest && (
                    <div className="flex items-center space-x-3 mb-5">
                      <img
                        className="rounded-full shrink-0 avatar"
                        src={infor ? infor.avatar : Avatar}
                        width="40"
                        height="40"
                        alt="User 02"
                      />
                      <div className="grow">
                        <label htmlFor="status-input" className="sr-only">
                          Post a comment, {infor ? infor.displayName : ""}?
                        </label>
                        <input
                          id="status-input"
                          className="form-input w-full bg-white border-transparent focus:bg-white focus:border-slate-300 placeholder-slate-500"
                          type="text"
                          placeholder={
                            "Post a comment, " +
                            (infor ? infor.displayName : "") +
                            "?"
                          }
                          value={commentContent}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                    </div>
                  )}
                  <hr className="my-6 border-t border-slate-200" />

                  {/* Similar Meetups */}
                  {relatedEvent ? (
                    <div>
                      <h2 className="text-xl leading-snug text-slate-800 font-bold mb-2">
                        Similar Activities
                      </h2>
                      <div className="space-y-8 sm:space-y-5 my-6 lg:mb-0">
                        {/* Related item */}
                        <article className="flex bg-white shadow-lg rounded-sm border border-slate-200 overflow-hidden">
                          {/* Image */}
                          <Link
                            className="relative block w-24 sm:w-56 xl:sidebar-expanded:w-40 2xl:sidebar-expanded:w-56 shrink-0"
                            to={"/activity/meetups-post?id=" + relatedEvent.id}
                          >
                            <img
                              className="absolute object-cover object-center w-full h-full"
                              src={relatedEvent.background}
                              width="220"
                              height="236"
                              alt="Meetup 01"
                            />
                            {/* Like button */}
                            <button className="absolute top-0 right-0 mt-4 mr-4">
                              <div className="text-slate-100 bg-slate-900 bg-opacity-60 rounded-full">
                                <span className="sr-only">Like</span>
                                <svg
                                  className="h-8 w-8 fill-current"
                                  viewBox="0 0 32 32"
                                >
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
                                  {moment(relatedEvent.startTime).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                  )}
                                  -&gt;{" "}
                                  {moment(relatedEvent.endTime).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                  )}
                                </div>
                                <Link
                                  className="inline-flex mb-2"
                                  to={
                                    "/activity/meetups-post?id=" +
                                    relatedEvent.id
                                  }
                                >
                                  <h3 className="text-lg font-bold text-slate-800">
                                    {relatedEvent.name}
                                  </h3>
                                </Link>
                              </div>
                              <div className="flex items-center space-x-2">
                                <img
                                  className="rounded-full border-2 border-white box-content avatar max-h-7"
                                  src={relatedEvent.owner.avatar}
                                  width="28"
                                  height="28"
                                  alt="User 05"
                                />
                                <div className="text-sm">
                                  <strong>Host :</strong>{" "}
                                  {relatedEvent.owner.displayName}
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
                                <span>{relatedEvent.activityType}</span>
                              </div>
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                  {/* 1st block */}
                  <div className="bg-white p-5 shadow-lg rounded-sm border border-slate-200 lg:w-72 xl:w-80">
                    <div className="space-y-2">
                      {status.message === "NOT_ATTEND" && (
                        <button
                          className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                          aria-controls="info-modal"
                          onClick={(e) => {
                            e.stopPropagation();
                            setInfoModalOpen(true);
                          }}
                        >
                          <span className="ml-1">Join event</span>
                        </button>
                      )}
                      {status.message === "PENDING" && (
                        <button
                          disabled={true}
                          className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                          aria-controls="info-modal"
                          onClick={(e) => {
                            e.stopPropagation();
                            setInfoModalOpen(true);
                          }}
                        >
                          <span className="ml-1">Pending request</span>
                        </button>
                      )}
                      {status.message === "ACCEPTED" && (
                        <div>
                          <button
                            disabled
                            className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                            aria-controls="info-modal"
                            onClick={(e) => {
                              e.stopPropagation();
                              setInfoModalOpen(true);
                            }}
                          >
                            <svg
                              className="w-4 h-4 fill-current shrink-0"
                              viewBox="0 0 16 16"
                            >
                              <path d="m2.457 8.516.969-.99 2.516 2.481 5.324-5.304.985.989-6.309 6.284z" />
                            </svg>
                            <span className="ml-1">Accepted</span>
                          </button>
                          {!status.isFeedback && (
                            <button
                              className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white my-3"
                              aria-controls="info-modal"
                              onClick={(e) => {
                                e.stopPropagation();
                                setfeedBackModal(true);
                              }}
                            >
                              <span className="ml-1">Feedback</span>
                            </button>
                          )}
                        </div>
                      )}
                      {status.message === "CLOSED" && (
                        <button
                          disabled
                          className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                          aria-controls="info-modal"
                          onClick={(e) => {
                            e.stopPropagation();
                            setInfoModalOpen(true);
                          }}
                        >
                          <svg
                            className="w-4 h-4 fill-current shrink-0"
                            viewBox="0 0 16 16"
                          >
                            <path d="m2.457 8.516.969-.99 2.516 2.481 5.324-5.304.985.989-6.309 6.284z" />
                          </svg>
                          <span className="ml-1">Close for attending</span>
                        </button>
                      )}
                      {status.message === "NOT_FOUND" && (
                        <button
                          disabled
                          className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                          aria-controls="info-modal"
                          onClick={(e) => {
                            e.stopPropagation();
                            setInfoModalOpen(true);
                          }}
                        >
                          <svg
                            className="w-4 h-4 fill-current shrink-0"
                            viewBox="0 0 16 16"
                          >
                            <path d="m2.457 8.516.969-.99 2.516 2.481 5.324-5.304.985.989-6.309 6.284z" />
                          </svg>
                          <span className="ml-1">Attending</span>
                        </button>
                      )}

                      {/* Start */}
                      <ModalBlank
                        id="info-modal"
                        modalOpen={infoModalOpen}
                        setModalOpen={setInfoModalOpen}
                      >
                        <div className="p-5 flex space-x-4">
                          {/* Icon */}
                          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-indigo-100">
                            <svg
                              className="w-4 h-4 shrink-0 fill-current text-indigo-500"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
                            </svg>
                          </div>
                          {/* Content */}
                          <div>
                            {/* Modal header */}
                            <div className="mb-2">
                              <div className="text-lg font-semibold text-slate-800">
                                Want to join the event ?
                              </div>
                            </div>
                            {/* Modal content */}
                            <div className="text-sm mb-10">
                              <div className="space-y-2">
                                <p>We would love to have you in the event !!</p>
                              </div>
                            </div>
                            {/* Modal footer */}
                            <div className="flex flex-wrap justify-end space-x-2">
                              <button
                                className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setInfoModalOpen(false);
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                onClick={(e) => handleJoin(e)}
                                className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                              >
                                Yes, I will join
                              </button>
                            </div>
                          </div>
                        </div>
                      </ModalBlank>
                      <ModalBasic id="feedback-modal" modalOpen={feedBackModal} setModalOpen={setfeedBackModal} title="Send Feedback">
                        {/* Modal content */}
                        <div className="px-5 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-slate-800 mb-3">Let us know what you think 🙌</div>
                          </div>
                          <div className="space-y-3">
                            <Rating name="size-large" defaultValue={rate} onChange={(e) => setRate(e.target.value)} size="large" />
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium mb-1" htmlFor="feedback">Message <span className="text-rose-500">*</span></label>
                              <textarea id="feedback" className="form-textarea w-full px-2 py-1" rows="4" required onChange={(e) => setComment(e.target.value)}></textarea>
                            </div>
                          </div>
                        </div>
                        {/* Modal footer */}
                        <div className="px-5 py-4 border-t border-slate-200">
                          <div className="flex flex-wrap justify-end space-x-2">
                            <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setfeedBackModal(false); }}>Cancel</button>
                            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" onClick={(e) => handleFeedBack(e)}>Send</button>
                          </div>
                        </div>
                      </ModalBasic>
                      {/* End */}
                      {/* <button className="btn w-full border-slate-200 hover:border-slate-300 text-slate-600">
                      <svg className="w-4 h-4 fill-rose-500 shrink-0" viewBox="0 0 16 16">
                        <path d="M14.682 2.318A4.485 4.485 0 0 0 11.5 1 4.377 4.377 0 0 0 8 2.707 4.383 4.383 0 0 0 4.5 1a4.5 4.5 0 0 0-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 0 0 0-6.364Zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 0 1 4.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 0 1 1.785 4.251h-.003Z" />
                      </svg>
                      <span className="ml-2">Favorite</span>
                    </button> */}
                    </div>
                  </div>

                  {/* 2nd block */}
                  <div className="bg-white p-5 shadow-lg rounded-sm border border-slate-200 lg:w-72 xl:w-80">
                    <div className="flex justify-between space-x-1 mb-5">
                      <div className="text-sm text-slate-800 font-semibold">
                        Attendees ({eventDetailAttend.length})
                      </div>
                      <a
                        className="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                        href="#0"
                      >
                        View All
                      </a>
                    </div>
                    <ul className="space-y-3">
                      {eventDetailAttend.map((a) => {
                        return (
                          <li>
                            <div className="flex justify-between">
                              <div className="grow flex items-center">
                                <div className="relative mr-3">
                                  <img
                                    className="w-8 h-8 rounded-full"
                                    src={a.avatar}
                                    width="32"
                                    height="32"
                                    alt="User 08"
                                  />
                                </div>
                                <div className="truncate">
                                  <span className="text-sm font-medium text-slate-800">
                                    {a.displayName}
                                  </span>
                                </div>
                              </div>
                              <button className="text-slate-400 hover:text-slate-500 rounded-full">
                                <span className="sr-only">Menu</span>
                                <svg
                                  className="w-8 h-8 fill-current"
                                  viewBox="0 0 32 32"
                                >
                                  <circle cx="16" cy="16" r="2" />
                                  <circle cx="10" cy="16" r="2" />
                                  <circle cx="22" cy="16" r="2" />
                                </svg>
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* 3rd block */}
                  {/* <div className="bg-white p-5 shadow-lg rounded-sm border border-slate-200 lg:w-72 xl:w-80">
                  <div className="flex justify-between space-x-1 mb-5">
                    <div className="text-sm text-slate-800 font-semibold">Invite Friends</div>
                    <a className="text-sm font-medium text-indigo-500 hover:text-indigo-600" href="#0">
                      View All
                    </a>
                  </div>
                  <ul className="space-y-3">
                    <li>
                      <div className="flex items-center justify-between">
                        <div className="grow flex items-center">
                          <div className="relative mr-3">
                            <img className="w-8 h-8 rounded-full" src={UserImage02} width="32" height="32" alt="User 02" />
                          </div>
                          <div className="truncate">
                            <span className="text-sm font-medium text-slate-800">Haruki Masuno</span>
                          </div>
                        </div>
                        <button className="text-xs inline-flex font-medium bg-indigo-100 text-indigo-600 rounded-full text-center px-2.5 py-1">
                          Invite
                        </button>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center justify-between">
                        <div className="grow flex items-center">
                          <div className="relative mr-3">
                            <img className="w-8 h-8 rounded-full" src={UserImage04} width="32" height="32" alt="User 04" />
                          </div>
                          <div className="truncate">
                            <span className="text-sm font-medium text-slate-800">Joe Huang</span>
                          </div>
                        </div>
                        <button className="text-xs inline-flex font-medium bg-indigo-100 text-indigo-600 rounded-full text-center px-2.5 py-1">
                          Invite
                        </button>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center justify-between">
                        <div className="grow flex items-center">
                          <div className="relative mr-3">
                            <img className="w-8 h-8 rounded-full" src={UserImage06} width="32" height="32" alt="User 06" />
                          </div>
                          <div className="truncate">
                            <span className="text-sm font-medium text-slate-800">Carolyn McNeail</span>
                          </div>
                        </div>
                        <button className="text-xs inline-flex font-medium bg-indigo-100 text-indigo-600 rounded-full text-center px-2.5 py-1">
                          Invite
                        </button>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center justify-between">
                        <div className="grow flex items-center">
                          <div className="relative mr-3">
                            <img className="w-8 h-8 rounded-full" src={UserImage08} width="32" height="32" alt="User 08" />
                          </div>
                          <div className="truncate">
                            <span className="text-sm font-medium text-slate-800">Lisa Sitwala</span>
                          </div>
                        </div>
                        <button className="text-xs inline-flex font-medium bg-indigo-100 text-indigo-600 rounded-full text-center px-2.5 py-1">
                          Invite
                        </button>
                      </div>
                    </li>
                  </ul>
                </div> */}
                </div>
              </div>
            </div>
          </main>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default MeetupsPost;
