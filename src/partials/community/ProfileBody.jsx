import ProfileBg from "../../images/profile-bg.jpg";
import UserAvatar from "../../images/user-128-01.jpg";
import Icon02 from "../../images/icon-02.svg";
import Icon03 from "../../images/icon-03.svg";
import UserImage01 from "../../images/avatar-01.jpg";
import UserImage02 from "../../images/avatar-02.jpg";
import UserImage03 from "../../images/avatar-03.jpg";
import UserImage04 from "../../images/avatar-04.jpg";
import UserImage05 from "../../images/avatar-05.jpg";
import UserImage06 from "../../images/avatar-06.jpg";
import FeedPosts from "../../partials/community/FeedPosts";
import TabPanel from "./TabPanel";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";
import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { baseURL } from "../../pages/baseUrl";

const ProfileBody = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const childRef2 = useRef();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [records, setRecords] = useState([]);

  const getRecords = (id) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/records/by-member/' + id,
    };

    axios.request(config)
      .then((response) => {
        setRecords(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const openEditModal = (id) => {
    setNewFeedsId(id);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: baseURL + "/newsfeeds/blogs/" + id,
    };

    axios
      .request(config)
      .then((response) => {
        setTitleEdit(response.data.title);
        setValueEdit(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
    setEditModalOpen(true);
  };
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      onReloadNewsfeed: reloadNewsfeed,
      onReloadRecords: getRecordsByMemberId,
    };
  });

  const reloadNewsfeed = (id) => {
    try {
      childRef2.current.loadDataNewsfeed(id);
    } catch (error) {
      console.log(error);
    }
  };

  const getRecordsByMemberId = (id) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: baseURL + "/records/by-member/" + id,
    };
    axios(config).then((response) => {
      console.log(response.data);
      setRecords(response.data);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bird-club.azurewebsites.net/api/v1/members/" +
            props.profileId
        ); // Replace with your API endpoint
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    
  }, []);

  const [SelectTab, SelectTabinfo] = useState("");

  useEffect(() => {
    SelectTabinfo();
    setTimeout(() => {
      var id = window.location.search.split('=')[1]
      getRecordsByMemberId(id)
    }, 100);
  }, []);

  useEffect(() => {
    getRecords()
  }, [])

  const tabs = [
    {
      title: <div>Newsfeed</div>,
      content: (
        <div className="flex flex-col xl:flex-row xl:space-x-16 pt-8 justify-between">
          {/* Main content */}
          <div className="space-y-5 mb-8 xl:mb-0 w-full">
            {!props.profile ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              <FeedPosts
                ref={childRef2}
                openEditModal={openEditModal}
                memberId={props.profile ? props.profile.id : 0}
              />
            )}
          </div>

          {/* Sidebar */}
          <aside className="xl:min-w-56 xl:w-56 space-y-3">
            <div className="text-sm">
              <h3 className="font-medium text-slate-800">Title</h3>
              <div>{props.profile ? props.profile.userType : ""}</div>
            </div>
            <div className="text-sm">
              <h3 className="font-medium text-slate-800">Location</h3>
              <div>{props.profile ? props.profile.address : ""}</div>
            </div>
            <div className="text-sm">
              <h3 className="font-medium text-slate-800">Email</h3>
              <div>{props.profile ? props.profile.email : ""}</div>
            </div>
            <div className="text-sm">
              <h3 className="font-medium text-slate-800">Birthdate</h3>
              <div>{props.profile ? props.profile.birthday : ""}</div>
            </div>
            <div className="text-sm">
              <h3 className="font-medium text-slate-800">Phone</h3>
              <div>{props.profile ? props.profile.phone : ""}</div>
            </div>
          </aside>
        </div>
      ),
    },
    {
      title: <div>Records</div>,
      content: (
        <main class="pb-8 pt-6">
          <div class="max-w-3xl mx-auto sm:px-0 lg:max-w-7xl lg:px-0">
            <div class="grid grid-cols-1 items-start lg:grid-cols-5 lg:gap-8">
              <div class="grid grid-cols-1 gap-4 lg:col-span-5">
                <div class="sm:flex sm:items-center px-4 sm:px-0">
                  <div class="sm:flex-auto">
                    <h1 class="text-xl font-semibold text-gray-900">
                      Bird Records
                    </h1>
                    <p class="mt-2 text-sm text-gray-700">
                      A list of all records submitted by{" "}
                      {props.profile ? props.profile.displayName : ""}.
                    </p>
                  </div>
                </div>

                <turbo-frame id="filters">
                  <div data-controller="record-filters"></div>

                  <div class="flex flex-col sm:rounded-lg shadow">
                    <div>
                      <dl class="sm:rounded-t-lg grid grid-cols-1 bg-white overflow-hidden border-b border-gray-200 divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
                        <div class="px-4 py-5 sm:p-6">
                          <dt class="text-base font-normal text-gray-900">Total Records</dt>
                          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                            <div class="flex items-baseline text-2xl font-semibold text-teal-600">
                              {records.length}
                            </div>
                          </dd>
                        </div>

                        {/* <div class="px-4 py-5 sm:p-6">
                          <dt class="text-base font-normal text-gray-900">
                            Unique Species
                          </dt>
                          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                            <div class="flex items-baseline text-2xl font-semibold text-teal-600">
                              4
                            </div>
                          </dd>
                        </div>

                        <div class="px-4 py-5 sm:p-6">
                          <dt class="text-base font-normal text-gray-900">Number of Species</dt>
                          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                            <div class="flex items-baseline text-2xl font-semibold text-teal-600">
                              2
                            </div>
                          </dd>
                        </div> */}
                      </dl>
                    </div>

                    <div class="overflow-hidden ring-1 ring-black ring-opacity-5 sm:rounded-b-lg">
                      <div class="table min-w-full">
                        <div class="bg-gray-50 table-header-group">
                          <div class="table-row">
                            <div class="table-cell border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 pl-4 pr-3 sm:pl-6">
                              Name
                            </div>
                            <div class="table-cell border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3 relative">
                              <span>Photo</span>
                            </div>
                            <div class="table-cell border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3">
                              Species
                            </div>
                            <div class="border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3 hidden sm:table-cell">
                              Quantity
                            </div>
                          </div>
                        </div>
                        <div class="table-header-group bg-white">
                          {records.map((record, index) => {
                            return (
                              <turbo-frame
                                id="row_record_10444"
                                class="contents"
                                target="_top"
                              >
                                <div class="table-row">
                                  <div class="table-cell border-b border-gray-200 text-sm w-full max-w-0 py-4 pl-4 pr-3 sm:w-auto sm:max-w-none sm:pl-6 text-gray-900">
                                    {record.birdName}
                                  </div>
                                  <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                    <img className="max-h-14 mt-4" src={record.photo} />
                                  </div>
                                  <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                    {record.species}
                                  </div>
                                  <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden lg:table-cell">
                                    <a
                                      class="hover:text-gray-900"
                                      href="/clubs/vn-bird/locations/at-home"
                                    >
                                      {record.quantity}
                                    </a>
                                  </div>
                                </div>
                              </turbo-frame>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </turbo-frame>
              </div>
            </div>
          </div>
        </main>
      ),
    },
  ];

  return (
    <div
      className={`grow flex flex-col md:translate-x-0 transition-transform duration-300 ease-in-out ${
        props.profileSidebarOpen ? "translate-x-1/3" : "translate-x-0"
      }`}
    >
      {/* Profile background */}
      <div className="relative h-56 bg-slate-200">
        <img
          className="object-cover h-full w-full"
          src={ProfileBg}
          width="979"
          height="220"
          alt="Profile background"
        />
        {/* Close button */}
        <button
          className="md:hidden absolute top-4 left-4 sm:left-6 text-white opacity-80 hover:opacity-100"
          onClick={() => props.setProfileSidebarOpen(!props.profileSidebarOpen)}
          aria-controls="profile-sidebar"
          aria-expanded={props.profileSidebarOpen}
        >
          <span className="sr-only">Close sidebar</span>
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="relative px-4 sm:px-6 pb-8">
        {/* Pre-header */}
        <div className="-mt-16 mb-6 sm:mb-3">
          <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-end">
            {/* Avatar */}
            <div className="inline-flex -ml-1 -mt-1 mb-4 sm:mb-0">
              <img
                className="rounded-full border-4 border-white h-32 w-32"
                src={props.profile ? props.profile.avatar : UserAvatar}
                width="128"
                height="128"
                alt="Avatar"
              />
            </div>

            {/* Actions */}
            {/* <div className="flex space-x-2 sm:mb-2">
              <button className="p-1.5 shrink-0 rounded border border-slate-200 hover:border-slate-300 shadow-sm">
                <svg
                  className="w-4 h-1 fill-current text-slate-400"
                  viewBox="0 0 16 4"
                >
                  <circle cx="8" cy="2" r="2" />
                  <circle cx="2" cy="2" r="2" />
                  <circle cx="14" cy="2" r="2" />
                </svg>
              </button>
              <button className="p-1.5 shrink-0 rounded border border-slate-200 hover:border-slate-300 shadow-sm">
                <svg
                  className="w-4 h-4 fill-current text-indigo-500"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7Zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8Z" />
                </svg>
              </button>
              <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
                <svg
                  className="fill-current shrink-0"
                  width="11"
                  height="8"
                  viewBox="0 0 11 8"
                >
                  <path d="m.457 4.516.969-.99 2.516 2.481L9.266.702l.985.99-6.309 6.284z" />
                </svg>
                <span className="ml-2">Following</span>
              </button>
            </div> */}
          </div>
        </div>

        {/* Header */}
        <header className="text-center sm:text-left mb-6">
          {/* Name */}
          <div className="inline-flex items-start mb-2">
            <h1 className="text-2xl text-slate-800 font-bold">
              {props.profile ? props.profile.displayName : ""}
            </h1>
            <svg
              className="w-4 h-4 fill-current shrink-0 text-amber-500 ml-2"
              viewBox="0 0 16 16"
            >
              <path d="M13 6a.75.75 0 0 1-.75-.75 1.5 1.5 0 0 0-1.5-1.5.75.75 0 1 1 0-1.5 1.5 1.5 0 0 0 1.5-1.5.75.75 0 1 1 1.5 0 1.5 1.5 0 0 0 1.5 1.5.75.75 0 1 1 0 1.5 1.5 1.5 0 0 0-1.5 1.5A.75.75 0 0 1 13 6ZM6 16a1 1 0 0 1-1-1 4 4 0 0 0-4-4 1 1 0 0 1 0-2 4 4 0 0 0 4-4 1 1 0 1 1 2 0 4 4 0 0 0 4 4 1 1 0 0 1 0 2 4 4 0 0 0-4 4 1 1 0 0 1-1 1Z" />
            </svg>
          </div>
          {/* Bio */}
          <div className="text-sm mb-3">
            {props.profile ? props.profile.about : ""}
          </div>
          {/* Meta */}
          <div className="flex flex-wrap justify-center sm:justify-start space-x-4">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 fill-current shrink-0 text-slate-400"
                viewBox="0 0 16 16"
              >
                <path d="M8 8.992a2 2 0 1 1-.002-3.998A2 2 0 0 1 8 8.992Zm-.7 6.694c-.1-.1-4.2-3.696-4.2-3.796C1.7 10.69 1 8.892 1 6.994 1 3.097 4.1 0 8 0s7 3.097 7 6.994c0 1.898-.7 3.697-2.1 4.996-.1.1-4.1 3.696-4.2 3.796-.4.3-1 .3-1.4-.1Zm-2.7-4.995L8 13.688l3.4-2.997c1-1 1.6-2.198 1.6-3.597 0-2.798-2.2-4.996-5-4.996S3 4.196 3 6.994c0 1.399.6 2.698 1.6 3.697 0-.1 0-.1 0 0Z" />
              </svg>
              <span className="text-sm font-medium whitespace-nowrap text-slate-500 ml-2">
                {props.profile ? props.profile.address : ""}
              </span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 fill-current shrink-0 text-slate-400"
                viewBox="0 0 16 16"
              >
                <path d="M11 0c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5 0 1.3-.5 2.6-1.4 3.5l-1.2 1.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l1.1-1.2c.6-.5.9-1.3.9-2.1s-.3-1.6-.9-2.2C12 1.7 10 1.7 8.9 2.8L7.7 4c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.1C8.4.5 9.7 0 11 0ZM8.3 12c.4-.4 1-.5 1.4-.1.4.4.4 1 0 1.4l-1.2 1.2C7.6 15.5 6.3 16 5 16c-1.3 0-2.6-.5-3.5-1.5C.5 13.6 0 12.3 0 11c0-1.3.5-2.6 1.5-3.5l1.1-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L2.9 8.9c-.6.5-.9 1.3-.9 2.1s.3 1.6.9 2.2c1.1 1.1 3.1 1.1 4.2 0L8.3 12Zm1.1-6.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4.2-4.2Z" />
              </svg>
              <a
                className="text-sm font-medium whitespace-nowrap text-indigo-500 hover:text-indigo-600 ml-2"
                href="#0"
              >
                {props.profile ? props.profile.email : ""}
              </a>
            </div>
          </div>
        </header>

        <TabPanel tabs={tabs} />
      </div>
    </div>
  );
});

export default ProfileBody;
