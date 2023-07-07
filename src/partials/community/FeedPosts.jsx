import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Link } from 'react-router-dom';
import EditMenu from '../../components/DropdownEditMenu';

import UserImage02 from '../../images/user-40-02.jpg';
import UserImage03 from '../../images/user-40-03.jpg';
import UserImage04 from '../../images/user-40-04.jpg';
import UserImage06 from '../../images/user-40-06.jpg';
import UserImage08 from '../../images/user-40-08.jpg';
import CommenterImage04 from '../../images/user-32-04.jpg';
import CommenterImage05 from '../../images/user-32-05.jpg';
import { Pagination } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../pages/baseUrl';
import moment from 'moment/moment';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



const FeedPosts = forwardRef((props, ref) => {
  const handleClick = (id) => {
    props.openEditModal(id)
  }

  useImperativeHandle(ref, () => {
    return {
      getDat: getDataDefault,
    };
  })
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [newFeeds, setNewFeeds] = useState(null);
  const [totalPage, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const onClickPage = (e, page) => {
    setPage(page);
    getData(page);
  }
  const getData = (page) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/newsfeeds?limit=50&page=' + page + '&size=10',
    };

    axios.request(config)
      .then((response) => {
        var data = response.data.newsfeeds
        var result = []
        data.forEach(element => {
          element = {
            ...element, // Spread the existing properties
            maxCommentsToShow: 2
          };
          result.push(element)
        });
        setNewFeeds(result)
        setTotalCount(response.data.total)
        setTotalPages(Math.ceil(response.data.total / 10))
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const getDataDefault = (page) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/newsfeeds?limit=50&page=1&size=10',
    };

    axios.request(config)
      .then((response) => {
        setNewFeeds(response.data.newsfeeds)
        setTotalCount(response.data.total)
        setTotalPages(Math.ceil(response.data.total / 10))
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const viewMoreComment = (blogId) => {
    newFeeds.find(e => e.id === blogId).maxCommentsToShow += 2;
    setNewFeeds(newFeeds)
    forceUpdate()
  }
  useEffect(() => {
    getData(page)
  }, [])
  if (newFeeds === null) return (<Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>);
  return (
    <>
      {/* Post 1 */}
      {newFeeds && newFeeds.map((n, index) => {
        if (n.newsfeedType === 0) {
          return (
            <div className="bg-white shadow-md rounded border border-slate-200 p-5">
              {/* Header */}
              <header className="flex justify-between items-start space-x-3 mb-3">
                {/* User */}
                <div className="flex items-start space-x-3">
                  <img className="rounded-full shrink-0 avatar" src={n.owner.avatar} style={{ objectFit: 'cover' }} width="40" height="40" alt="User 04" />
                  <div>
                    <div className="leading-tight">
                      <a className="text-sm font-semibold text-slate-800" href="#0">
                        {n.owner.displayName}
                      </a>
                    </div>
                    <div className="text-xs text-slate-500">{moment(new Date(n.publicationTime)).format("DD/MM/YYYY, h:mm:ss A")}</div>
                  </div>
                </div>
                {/* Menu button */}
                <EditMenu align="right" className="relative inline-flex shrink-0">
                  <li>
                    <button className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" onClick={(e) => { e.stopPropagation(); handleClick(n.id); }}>
                      Edit
                    </button>
                  </li>
                  <li>
                    <Link className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">
                      Remove
                    </Link>
                  </li>
                </EditMenu>
              </header>
              {/* Body */}
              <div className="text-sm text-slate-800 space-y-2 mb-5">
                <p><strong>{n.blog.title}</strong>  📚</p>
              </div>
              <div dangerouslySetInnerHTML={{ __html: n.blog.content }} />
              {/* Footer */}
              <footer className="flex items-center space-x-4">
                {/* Like button */}
                <button className="flex items-center text-slate-400 hover:text-indigo-500">
                  <svg className="w-4 h-4 shrink-0 fill-current mr-1.5" viewBox="0 0 16 16">
                    <path d="M14.682 2.318A4.485 4.485 0 0011.5 1 4.377 4.377 0 008 2.707 4.383 4.383 0 004.5 1a4.5 4.5 0 00-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 014.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 011.785 4.251h-.003z" />
                  </svg>
                  <div className="text-sm text-slate-500">122</div>
                </button>
                {/* Replies button */}
                <button className="flex items-center text-slate-400 hover:text-indigo-500">
                  <svg className="w-4 h-4 shrink-0 fill-current mr-1.5" viewBox="0 0 16 16">
                    <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                  </svg>
                  <div className="text-sm text-slate-500">{ n.blog.comments.length }</div>
                </button>
              </footer>
              {/* Comments */}
              <div className="mt-5 pt-3 border-t border-slate-200">
                <ul className="space-y-2 mb-3">
                  {/* Comment */}
                  {
                    n.blog.comments.slice(0, n.maxCommentsToShow).map((comment) => {
                      return <li className="p-3 bg-slate-50 rounded">
                        <div className="flex items-start space-x-3">
                          <img className="rounded-full shrink-0" src={comment.owner.avatar} width="32" height="32" alt="User 04" />
                          <div>
                            <div className="text-xs text-slate-500">
                              <a className="font-semibold text-slate-800" href="#0">
                                {comment.owner.displayName}
                              </a>{' '}
                              · {moment(new Date(comment.publicationTime)).format("DD/MM/YYYY, h:mm:ss A")}
                            </div>
                            <div className="text-sm">
                              {comment.content}
                            </div>
                          </div>
                        </div>
                      </li>
                    })
                  }
                </ul>
                {/* Comments footer */}
                <div className="flex justify-between space-x-2">
                  <div className="text-sm text-slate-500">
                    <span className="font-medium text-slate-600">{n.blog.comments.slice(0, n.maxCommentsToShow).length}</span> of <span className="font-medium text-slate-600">{n.blog.comments.length}</span> comments
                  </div>
                  <button className="text-sm  font-medium text-indigo-500 hover:text-indigo-600" onClick={() => viewMoreComment(n.id)}>View More Comments</button>
                </div>
                {/* Comment form */}
                <div className="flex items-center space-x-3 mt-3">
                  <img className="rounded-full shrink-0" src={UserImage02} width="32" height="32" alt="User 02" />
                  <div className="grow">
                    <label htmlFor="comment-form" className="sr-only">
                      Write a comment…
                    </label>
                    <input
                      id="comment-form"
                      className="form-input w-full bg-slate-100 border-transparent focus:bg-white focus:border-slate-300 placeholder-slate-500"
                      type="text"
                      placeholder="Write a comment…"
                    />
                  </div>
                </div>
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
                    <img className="rounded-full shrink-0 avatar" src={n.owner.avatar} width="40" height="40" alt="User 08" />
                    <div>
                      <div className="leading-tight">
                        <a className="text-sm font-semibold text-slate-800" href="#0">
                          {n.owner.displayName} đã thêm một chủng loại mới <strong>{n.record.species} </strong>
                        </a>
                      </div>
                      <div className="text-xs text-slate-500">{moment(new Date(n.publicationTime)).format("DD/MM/YYYY, h:mm:ss A")}</div>
                    </div>
                  </div>
                  {/* Menu button */}
                  <EditMenu align="right" className="relative inline-flex shrink-0">
                    <li>
                      <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">
                        Option 1
                      </Link>
                    </li>
                    <li>
                      <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">
                        Option 2
                      </Link>
                    </li>
                    <li>
                      <Link className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">
                        Remove
                      </Link>
                    </li>
                  </EditMenu>
                </header>
                {/* Body */}
                <div className="text-sm text-slate-800 space-y-2 mb-5">
                  <p><strong>{n.record.birdName} x {n.record.quantity}</strong> 🧑‍🤝‍🧑</p>
                  <div className="relative flex items-center justify-center !my-4">
                    <img src={n.record.photo} width="590" height="332" alt="Feed 01" />
                  </div>
                </div>
                {/* Footer */}
                <footer className="flex items-center space-x-4">
                  {/* Like button */}
                  <button className="flex items-center text-indigo-400">
                    <svg className="w-4 h-4 shrink-0 fill-current mr-1.5" viewBox="0 0 16 16">
                      <path d="M14.682 2.318A4.485 4.485 0 0011.5 1 4.377 4.377 0 008 2.707 4.383 4.383 0 004.5 1a4.5 4.5 0 00-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 014.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 011.785 4.251h-.003z" />
                    </svg>
                    <div className="text-sm text-indigo-500">2.2K</div>
                  </button>
                  {/* Share button */}
                  <button className="flex items-center text-slate-400 hover:text-indigo-500">
                    <svg className="w-4 h-4 shrink-0 fill-current mr-1.5" viewBox="0 0 16 16">
                      <path d="M13 7h2v6a1 1 0 0 1-1 1H4v2l-4-3 4-3v2h9V7ZM3 9H1V3a1 1 0 0 1 1-1h10V0l4 3-4 3V4H3v5Z" />
                    </svg>
                    <div className="text-sm text-slate-500">4.3K</div>
                  </button>
                  {/* Replies button */}
                  <button className="flex items-center text-slate-400 hover:text-indigo-500">
                    <svg className="w-4 h-4 shrink-0 fill-current mr-1.5" viewBox="0 0 16 16">
                      <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                    </svg>
                    <div className="text-sm text-slate-500">92</div>
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
        variant="outlined" color="primary" />
    </>
  );
})

export default FeedPosts;
