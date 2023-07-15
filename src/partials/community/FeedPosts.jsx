import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import EditMenu from "../../components/DropdownEditMenu";

import UserImage02 from "../../images/user-40-02.jpg";
import ModalBlank from "../../components/ModalBlank";
import { Role } from "../../pages/enum/roleEnum";
import { Pagination } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { baseURL } from "../../pages/baseUrl";
import moment from "moment/moment";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const FeedPosts = forwardRef((props, ref) => {
  const handleClick = (id) => {
    props.openEditModal(id);
  };

  useImperativeHandle(ref, () => {
    return {
      getDat: getDataDefault,
      loadDataNewsfeed: onLoadNewsfeedCallBack,
    };
  });
  const [, updateState] = React.useState();
  const [blogId, setBlogId] = useState('')
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [newFeeds, setNewFeeds] = useState(null);
  const [totalPage, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [commentContent, setCommentContent] = useState("");
  const [dangerModalOpen, setDangerModalOpen] = useState(false)
  const [targetNewsfeedId, setTargetNewsfeedId] = useState("");
  const [infor, setInfor] = useState();
  const role = localStorage.getItem('role')
  const uidNum = parseFloat(localStorage.getItem("uid"))
  const onClickPage = (e, page) => {
    setPage(page);
    getData(page);
  };
  const getData = (page) => {
    const uid = localStorage.getItem("uid");
    let config = props.memberId
      ? {
        method: "get",
        maxBodyLength: Infinity,
        url:
          baseURL +
          "/newsfeeds/by-member/" + props.memberId,
      }
      : {
        method: "get",
        maxBodyLength: Infinity,
        url:
          baseURL +
          "/newsfeeds?limit=50&page=" +
          page +
          "&size=30" +
          (uid ? "&memberId=" + uid : ""),
      };

    axios
      .request(config)
      .then((response) => {
        var data = response.data.newsfeeds;
        var result = [];
        data.forEach((element) => {
          element = {
            ...element, // Spread the existing properties
            maxCommentsToShow: 2,
          };
          result.push(element);
        });
        setNewFeeds(result);
        setTotalCount(response.data.total);
        setTotalPages(Math.ceil(response.data.total / 30));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getDataDefault = (page) => {
    const uid = localStorage.getItem("uid");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        baseURL +
        "/newsfeeds?limit=50&page=1&size=10" +
        (uid ? "&memberId=" + uid : ""),
    };

    axios
      .request(config)
      .then((response) => {
        setNewFeeds(response.data.newsfeeds);
        setTotalCount(response.data.total);
        setTotalPages(Math.ceil(response.data.total / 10));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewMoreComment = (blogId) => {
    newFeeds.find((e) => e.id === blogId).maxCommentsToShow += 2;
    setNewFeeds(newFeeds);
    forceUpdate();
  };

  const viewLessComment = (blogId) => {
    newFeeds.find((e) => e.id === blogId).maxCommentsToShow -= 2;
    setNewFeeds(newFeeds);
    forceUpdate();
  };

  const onLoadNewsfeedCallBack = (id) => {
    const uid = localStorage.getItem("uid");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        baseURL +
        "/newsfeeds/by-member/" + id,
    }

    axios
      .request(config)
      .then((response) => {
        var data = response.data.newsfeeds;
        var result = [];
        data.forEach((element) => {
          element = {
            ...element, // Spread the existing properties
            maxCommentsToShow: 2,
          };
          result.push(element);
        });
        setNewFeeds(result);
        setTotalCount(response.data.total);
        setTotalPages(Math.ceil(response.data.total / 10));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const postComment = (newsFeedId, content) => {
    const uid = localStorage.getItem("uid");
    var data = JSON.stringify({
      newsfeedId: newsFeedId,
      ownerId: uid,
      content: content,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: baseURL + "/newsfeeds/" + newsFeedId + "/comment",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios.request(config).then((response) => {
      console.log(response);
      getData(page);
      forceUpdate();
      setTargetNewsfeedId("");
      setCommentContent("");
    });
  };

  const deleteBlog = (e) => {
    e.preventDefault();
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: baseURL + "/blogs/" + blogId,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.request(config).then((response) => {
      console.log(response);
      getData(page);
      forceUpdate();
      setDangerModalOpen(false)
      setTargetNewsfeedId("");
      setCommentContent("");
    });
  };

  const handleChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      postComment(targetNewsfeedId, commentContent);
    }
  };

  const likeNewsfeed = (newsfeedId) => {
    const uid = localStorage.getItem("uid");
    var data = JSON.stringify({
      newsFeedId: newsfeedId,
      memberId: uid,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: baseURL + "/newsfeeds/like",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios.request(config).then((response) => {
      console.log(response);
      getData(page);
      forceUpdate();
    });
  };

  const getInfo = () => {
    var temp = localStorage.getItem("infor");
    setInfor(JSON.parse(temp));
  };

  useEffect(() => {
    getInfo();
    getData(page);
  }, []);
  if (newFeeds === null)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  return (
    <>
      <ModalBlank id="danger-modal" modalOpen={dangerModalOpen} setModalOpen={setDangerModalOpen}>
        <div className="p-5 flex space-x-4">
          {/* Icon */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100">
            <svg className="w-4 h-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16">
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
            </svg>
          </div>
          {/* Content */}
          <div>
            {/* Modal header */}
            <div className="mb-2">
              <div className="text-lg font-semibold text-slate-800">Remove the blog ?</div>
            </div>
            {/* Modal content */}
            <div className="text-sm mb-10">
              <div className="space-y-2">
                <p>Are you sure you want to remove the blog.</p>
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex flex-wrap justify-end space-x-2">
              <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setDangerModalOpen(false); }}>Cancel</button>
              <button onClick={(e) => { e.stopPropagation(); deleteBlog(e); }} className="btn-sm bg-rose-500 hover:bg-rose-600 text-white">Yes, Remove it</button>
            </div>
          </div>
        </div>
      </ModalBlank>
      {/* Post 1 */}
      {newFeeds &&
        newFeeds.map((n, index) => {
          if (n.newsfeedType === 0) {
            return (
              <div className="bg-white shadow-md rounded border border-slate-200 p-5">
                {/* Header */}
                <header className="flex justify-between items-start space-x-3 mb-3">
                  {/* User */}
                  <div className="flex items-start space-x-3">
                    <img
                      className="rounded-full shrink-0 avatar"
                      src={n.owner.avatar}
                      style={{ objectFit: "cover" }}
                      width="40"
                      height="40"
                      alt="User 04"
                    />
                    <div>
                      <div className="leading-tight">
                        <a
                          className="text-sm font-semibold text-slate-800"
                          href="#0"
                        >
                          {n.owner.displayName}
                        </a>
                      </div>
                      <div className="text-xs text-slate-500">
                        {moment(new Date(n.publicationTime)).format(
                          "DD/MM/YYYY, h:mm:ss A"
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Menu button */}
                  {uidNum === n.owner.memberId && (
                    <EditMenu
                      align="right"
                      className="relative inline-flex shrink-0"
                    >
                      <li>
                        <button
                          className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClick(n.id);
                          }}
                        >
                          Edit
                        </button>
                      </li>
                      <li>
                        <div
                          className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDangerModalOpen(true);
                            setBlogId(n.id);
                          }}
                        >
                          Remove
                        </div>
                      </li>
                    </EditMenu>
                  )}

                </header>
                {/* Body */}
                <div className="text-sm text-slate-800 space-y-2 mb-5">
                  <p>
                    <strong>{n.blog.title}</strong> 📚
                  </p>
                </div>
                <div dangerouslySetInnerHTML={{ __html: n.blog.content }} />
                {/* Footer */}
                <footer className="flex items-center space-x-4">
                  {/* Like button */}
                  <button
                    onClick={() => likeNewsfeed(n.id)}
                    className="flex items-center text-slate-400 hover:text-indigo-500"
                  >
                    {n.blog.isLiked ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-heart-filled text-indigo-500 mr-1.5"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                          d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z"
                          stroke-width="0"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 shrink-0 fill-current mr-1.5"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14.682 2.318A4.485 4.485 0 0011.5 1 4.377 4.377 0 008 2.707 4.383 4.383 0 004.5 1a4.5 4.5 0 00-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 014.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 011.785 4.251h-.003z" />
                      </svg>
                    )}
                    <div className="text-sm text-slate-500">
                      {n.blog.likeCount ?? 0}
                    </div>
                  </button>
                  {/* Replies button */}
                  <button className="flex items-center text-slate-400 hover:text-indigo-500">
                    <svg
                      className="w-4 h-4 shrink-0 fill-current mr-1.5"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                    </svg>
                    <div className="text-sm text-slate-500">
                      {n.blog.comments.length}
                    </div>
                  </button>
                </footer>
                {/* Comments */}
                <div className="mt-5 pt-3 border-t border-slate-200">
                  <ul className="space-y-2 mb-3">
                    {/* Comment */}
                    {n.blog.comments
                      .slice(0, n.maxCommentsToShow)
                      .map((comment) => {
                        return (
                          <li className="p-3 bg-slate-50 rounded">
                            <div className="flex items-start space-x-3">
                              <img
                                className="rounded-full shrink-0 avatar max-h-8"
                                src={comment.owner.avatar}
                                width="32"
                                height="32"
                                alt="User 04"
                              />
                              <div>
                                <div className="text-xs text-slate-500">
                                  <a
                                    className="font-semibold text-slate-800"
                                    href="#0"
                                  >
                                    {comment.owner.displayName}
                                  </a>{" "}
                                  ·{" "}
                                  {moment(
                                    new Date(comment.publicationTime)
                                  ).format("DD/MM/YYYY, h:mm:ss A")}
                                </div>
                                <div className="text-sm">{comment.content}</div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                  {/* Comments footer */}
                  <div className="flex justify-between space-x-2">
                    <div className="text-sm text-slate-500">
                      <span className="font-medium text-slate-600">
                        {n.blog.comments.slice(0, n.maxCommentsToShow).length}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-slate-600">
                        {n.blog.comments.length}
                      </span>{" "}
                      comments
                    </div>
                    {n.blog.comments.slice(0, n.maxCommentsToShow).length === n.blog.comments.length ? (
                      <button
                        className="text-sm  font-medium text-indigo-500 hover:text-indigo-600"
                        onClick={() => viewLessComment(n.id)}
                      >
                        View Less Comments
                      </button>
                    ) : (
                      <button
                        className="text-sm  font-medium text-indigo-500 hover:text-indigo-600"
                        onClick={() => viewMoreComment(n.id)}
                      >
                        View More Comments
                      </button>
                    )}

                  </div>
                  {/* Comment form */}
                  {(role === Role.member || role === Role.admin || role === Role.manager || role === Role.staff) && (
                    <div className="flex items-center space-x-3 mt-3">
                      <img
                        className="rounded-full shrink-0 avatar max-h-8"
                        src={infor ? infor.avatar : UserImage02}
                        width="32"
                        height="32"
                        alt="User 02"
                      />
                      <div className="grow">
                        <label htmlFor="comment-form" className="sr-only">
                          Write a comment…
                        </label>
                        <input
                          id="comment-form"
                          className="form-input w-full bg-slate-100 border-transparent focus:bg-white focus:border-slate-300 placeholder-slate-500"
                          type="text"
                          placeholder="Write a comment…"
                          value={commentContent}
                          onChange={handleChange}
                          onFocus={() => setTargetNewsfeedId(n.id)}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          } else {
            if (n.record != null) {
              return (
                <div className="bg-white shadow-md rounded border border-slate-200 p-5">
                  {/* Header */}
                  <header className="flex justify-between items-start space-x-3 mb-3">
                    {/* User */}
                    <div className="flex items-start space-x-3">
                      <img
                        className="rounded-full shrink-0 avatar"
                        src={n.owner.avatar}
                        width="40"
                        height="40"
                        alt="User 08"
                      />
                      <div>
                        <div className="leading-tight">
                          <a
                            className="text-sm font-semibold text-slate-800"
                            href="#0"
                          >
                            {n.owner.displayName} đã thêm một chủng loại mới{" "}
                            <strong>{n.record.species} </strong>
                          </a>
                        </div>
                        <div className="text-xs text-slate-500">
                          {moment(new Date(n.publicationTime)).format(
                            "DD/MM/YYYY, h:mm:ss A"
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Menu button */}
                  </header>
                  {/* Body */}
                  <div className="text-sm text-slate-800 space-y-2 mb-5">
                    <p>
                      <strong>
                        {n.record.birdName} x {n.record.quantity}
                      </strong>{" "}
                      🧑‍🤝‍🧑
                    </p>
                    <div className="relative flex items-center justify-center !my-4">
                      <img
                        src={n.record.photo}
                        width="590"
                        height="332"
                        alt="Feed 01"
                      />
                    </div>
                  </div>
                  {/* Footer */}
                  <footer className="flex items-center space-x-4">
                    {/* Like button */}
                    <button
                      onClick={() => likeNewsfeed(n.id)}
                      className={
                        "flex items-center " +
                        `${n.record.isLiked
                          ? "text-indigo-500"
                          : "text-slate-400"
                        }`
                      }
                    >
                      {n.record.isLiked ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-heart-filled text-indigo-500 mr-1.5"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#2c3e50"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path
                            d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z"
                            stroke-width="0"
                            fill="currentColor"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 shrink-0 fill-current mr-1.5"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14.682 2.318A4.485 4.485 0 0011.5 1 4.377 4.377 0 008 2.707 4.383 4.383 0 004.5 1a4.5 4.5 0 00-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 014.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 011.785 4.251h-.003z" />
                        </svg>
                      )}
                      <div
                        className={
                          "text-sm " +
                          `${n.record.isLiked
                            ? "text-indigo-500"
                            : "text-slate-400"
                          }`
                        }
                      >
                        {n.record.likeCount ?? 0}
                      </div>
                    </button>
                  </footer>
                </div>
              );
            }
          }
        })}

      <Pagination
        count={totalPage}
        page={page}
        onChange={onClickPage}
        variant="outlined"
        color="primary"
      />
    </>
  );
});

export default FeedPosts;
