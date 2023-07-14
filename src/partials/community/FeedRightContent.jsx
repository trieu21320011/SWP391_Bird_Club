import React, { useState, useRef } from "react";
import { useEffect } from "react";
import GroupAvatar01 from "../../images/group-avatar-01.png";
import GroupAvatar02 from "../../images/group-avatar-02.png";
import GroupAvatar03 from "../../images/group-avatar-03.png";
import GroupAvatar04 from "../../images/group-avatar-04.png";
import UserImage01 from "../../images/user-32-01.jpg";
import UserImage02 from "../../images/user-32-02.jpg";
import ModalBasic from "../../components/ModalBasic";
import UserImage04 from "../../images/user-32-04.jpg";
import UserImage05 from "../../images/user-32-05.jpg";
import Swal from "sweetalert2";
import { baseURL } from "../../pages/baseUrl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';

function FeedRightContent(props) {
  const navigate = useNavigate();
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [species, setSpecies] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [birds, setBirds] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [members, setMembers] = useState([]);
  const [maxViewMember, setMaxViewMember] = useState(5);
  const handleNavigate = () => {
    navigate("/activity/create-blog");
  };
  const id = localStorage.getItem("uid");
  const handleCreate = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Loading",
      html: "This will close in a minutes",

      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
      },
    });
    var data = JSON.stringify({
      ownerId: id,
      birdId: species,
      quantity: quantity,
      photo: imgUrl,
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: baseURL + "/records",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        Swal.close();
        Swal.fire("Good job!", "You success create a record!", "success");
        props.loadData();
      })
      .catch(function (error) {
        console.log();
        Swal.close();
        Swal.fire("Oops", "Something went wrong!", "error");
        setFeedbackModalOpen(false);
        props.loadData();
      });
  };

  const getMember = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: baseURL + "/members",
    };

    axios
      .request(config)
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const expandViewMember = () => {
    setMaxViewMember(members.length);
  };

  useEffect(() => {
    getMember();
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: baseURL + "/birds",
    };

    axios
      .request(config)
      .then((response) => {
        setBirds(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="w-full hidden xl:block xl:w-72">
      <ModalBasic
        id="feedback-modal"
        modalOpen={feedbackModalOpen}
        setModalOpen={setFeedbackModalOpen}
        title="Let's write a blog"
      >
        {/* Modal content */}
        <div className="px-5 py-4">
          <div className="text-sm">
            <div className="font-medium text-slate-800 mb-3">
              Let us know what you think 🙌
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Species <span className="text-rose-500">*</span>
              </label>
              <select
                onChange={(e) => setSpecies(e.target.value)}
                id="country"
                className="form-select w-full"
              >
                {birds &&
                  birds.map((n, index) => {
                    return <option value={n.id}>{n.name}</option>;
                  })}
              </select>
            </div>
            <div></div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Quantity <span className="text-rose-500">*</span>
              </label>
              <input
                id="name"
                className="form-input w-full px-2 py-1"
                type="number"
                required
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Image URL <span className="text-rose-500">*</span>
              </label>
              <input
                id="name"
                className="form-input w-full px-2 py-1"
                type="text"
                required
                onChange={(e) => setImgUrl(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="px-5 py-4 border-t border-slate-200">
          <div className="flex flex-wrap justify-end space-x-2">
            <button
              className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
              onClick={(e) => {
                e.stopPropagation();
                setFeedbackModalOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              onClick={(e) => handleCreate(e)}
              className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              Create
            </button>
          </div>
        </div>
      </ModalBasic>
      <div className="lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar">
        <div className="md:py-8">
          {/* Search form */}
          {/* <div className="mb-6">
            <form className="relative">
              <label htmlFor="feed-search-desktop" className="sr-only">
                Search
              </label>
              <input
                id="feed-search-desktop"
                className="form-input w-full pl-9 focus:border-slate-300"
                type="search"
                placeholder="Search…"
              />
              <button
                className="absolute inset-0 right-auto group"
                type="submit"
                aria-label="Search"
              >
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
          </div> */}

          {/* Blocks */}
          <div className="space-y-4">
            {/* Block 2 */}
            <div className="mb-6">
              <button
                className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setFeedbackModalOpen(true);
                }}
              >
                Add Record
              </button>
            </div>
            <div className="bg-slate-50 p-4 rounded border border-slate-200">
              <div className="text-xs font-semibold text-slate-400 uppercase mb-4">
                Who to follow
              </div>
              <ul className="space-y-3">
                {members
                .filter(m => m.membershipStatus === true)
                .slice(0, maxViewMember)
                .map((member, index) => {
                  return (
                    <li>
                      <div className="flex items-center justify-between">
                        <div className="grow flex items-center">
                          <div className="relative mr-3">
                            <img
                              className="w-8 h-8 rounded-full"
                              src={member.avatar ?? UserImage02}
                              width="32"
                              height="32"
                              alt="User 02"
                            />
                          </div>
                          <div className="truncate">
                            <span className="text-sm font-medium text-slate-800">
                              {member.displayName}
                            </span>
                          </div>
                        </div>
                        <Link to={"/job/profile?id="+ member.id }>
                          <button className="text-xs inline-flex font-medium bg-indigo-100 text-indigo-600 rounded-full text-center px-2.5 py-1">
                            Visit
                          </button>
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
              
              <div className="mt-4">
                {maxViewMember === members.length ? (
                  <button
                    onClick={() => {
                      setMaxViewMember(5)
                    }}
                    className="btn-sm w-full bg-white border-slate-200 hover:border-slate-300 text-indigo-500 shadow-none"
                  >
                    View Less
                  </button>
                ) : (
                  <button
                    onClick={expandViewMember}
                    className="btn-sm w-full bg-white border-slate-200 hover:border-slate-300 text-indigo-500 shadow-none"
                  >
                    View All
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedRightContent;
