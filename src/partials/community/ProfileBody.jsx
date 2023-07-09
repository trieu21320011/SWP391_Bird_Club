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
import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from "react";

const ProfileBody = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const childRef = useRef();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
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

  useImperativeHandle(ref, () => {
    return {
      onReloadNewsfeed: reloadNewsfeed,
    };
  });

  const reloadNewsfeed = (id) => {
    childRef.current.loadDataNewsfeed(id)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bird-club.azurewebsites.net/api/v1/members/" + props.profileId
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
  }, []);

  const tabs = [
    {
      title: <div>Newsfeed</div>,
      content: (
        <div className="flex flex-col xl:flex-row xl:space-x-16 pt-8">
          {/* Main content */}
          <div className="space-y-5 mb-8 xl:mb-0">
            {!props.profile ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              <FeedPosts
                ref={childRef}
                openEditModal={openEditModal}
                memberId={props.profile ? props.profile.id : 0}
              />
            )}
            {/* About Me */}
            <div>
              <h2 className="text-slate-800 font-semibold mb-2">About Me</h2>
              <div className="text-sm space-y-2">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </div>

            {/* Departments */}
            <div>
              <h2 className="text-slate-800 font-semibold mb-2">Departments</h2>
              {/* Cards */}
              <div className="grid xl:grid-cols-2 gap-4">
                {/* Card */}
                <div className="bg-white p-4 border border-slate-200 rounded-sm shadow-sm">
                  {/* Card header */}
                  <div className="grow flex items-center truncate mb-2">
                    <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-slate-700 rounded-full mr-2">
                      <img
                        className="ml-1"
                        src={Icon03}
                        width="14"
                        height="14"
                        alt="Icon 03"
                      />
                    </div>
                    <div className="truncate">
                      <span className="text-sm font-medium text-slate-800">
                        Acme Marketing
                      </span>
                    </div>
                  </div>
                  {/* Card content */}
                  <div className="text-sm mb-3">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore.
                  </div>
                  {/* Card footer */}
                  <div className="flex justify-between items-center">
                    {/* Avatars group */}
                    <div className="flex -space-x-3 -ml-0.5">
                      <img
                        className="rounded-full border-2 border-white box-content"
                        src={UserImage02}
                        width="24"
                        height="24"
                        alt="Avatar"
                      />
                      <img
                        className="rounded-full border-2 border-white box-content"
                        src={UserImage03}
                        width="24"
                        height="24"
                        alt="Avatar"
                      />
                      <img
                        className="rounded-full border-2 border-white box-content"
                        src={UserImage04}
                        width="24"
                        height="24"
                        alt="Avatar"
                      />
                      <img
                        className="rounded-full border-2 border-white box-content"
                        src={UserImage05}
                        width="24"
                        height="24"
                        alt="Avatar"
                      />
                    </div>
                    {/* Link */}
                    <div>
                      <a
                        className="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                        href="#0"
                      >
                        View -&gt;
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div className="bg-white p-4 border border-slate-200 rounded-sm shadow-sm">
                  {/* Card header */}
                  <div className="grow flex items-center truncate mb-2">
                    <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-slate-700 rounded-full mr-2">
                      <img
                        className="ml-1"
                        src={Icon02}
                        width="14"
                        height="14"
                        alt="Icon 02"
                      />
                    </div>
                    <div className="truncate">
                      <span className="text-sm font-medium text-slate-800">
                        Acme Product
                      </span>
                    </div>
                  </div>
                  {/* Card content */}
                  <div className="text-sm mb-3">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore.
                  </div>
                  {/* Card footer */}
                  <div className="flex justify-between items-center">
                    {/* Avatars group */}
                    <div className="flex -space-x-3 -ml-0.5">
                      <img
                        className="rounded-full border-2 border-white box-content"
                        src={UserImage06}
                        width="24"
                        height="24"
                        alt="Avatar"
                      />
                      <img
                        className="rounded-full border-2 border-white box-content"
                        src={UserImage03}
                        width="24"
                        height="24"
                        alt="Avatar"
                      />
                      <img
                        className="rounded-full border-2 border-white box-content"
                        src={UserImage01}
                        width="24"
                        height="24"
                        alt="Avatar"
                      />
                    </div>
                    {/* Link */}
                    <div>
                      <a
                        className="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                        href="#0"
                      >
                        View -&gt;
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Work History */}
            <div>
              <h2 className="text-slate-800 font-semibold mb-2">
                Work History
              </h2>
              <div className="bg-white p-4 border border-slate-200 rounded-sm shadow-sm">
                <ul className="space-y-3">
                  {/* Item */}
                  <li className="sm:flex sm:items-center sm:justify-between">
                    <div className="sm:grow flex items-center text-sm">
                      {/* Icon */}
                      <div className="w-8 h-8 rounded-full shrink-0 bg-amber-500 my-2 mr-3">
                        <svg
                          className="w-8 h-8 fill-current text-amber-50"
                          viewBox="0 0 32 32"
                        >
                          <path d="M21 14a.75.75 0 0 1-.75-.75 1.5 1.5 0 0 0-1.5-1.5.75.75 0 1 1 0-1.5 1.5 1.5 0 0 0 1.5-1.5.75.75 0 1 1 1.5 0 1.5 1.5 0 0 0 1.5 1.5.75.75 0 1 1 0 1.5 1.5 1.5 0 0 0-1.5 1.5.75.75 0 0 1-.75.75Zm-7 10a1 1 0 0 1-1-1 4 4 0 0 0-4-4 1 1 0 0 1 0-2 4 4 0 0 0 4-4 1 1 0 0 1 2 0 4 4 0 0 0 4 4 1 1 0 0 1 0 2 4 4 0 0 0-4 4 1 1 0 0 1-1 1Z" />
                        </svg>
                      </div>
                      {/* Position */}
                      <div>
                        <div className="font-medium text-slate-800">
                          Senior Product Designer
                        </div>
                        <div className="flex flex-nowrap items-center space-x-2 whitespace-nowrap">
                          <div>Remote</div>
                          <div className="text-slate-400">·</div>
                          <div>April, 2020 - Today</div>
                        </div>
                      </div>
                    </div>
                    {/* Tags */}
                    <div className="sm:ml-2 mt-2 sm:mt-0">
                      <ul className="flex flex-wrap sm:justify-end -m-1">
                        <li className="m-1">
                          <button className="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                            Marketing
                          </button>
                        </li>
                        <li className="m-1">
                          <button className="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                            +4
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>

                  {/* Item */}
                  <li className="sm:flex sm:items-center sm:justify-between">
                    <div className="sm:grow flex items-center text-sm">
                      {/* Icon */}
                      <div className="w-8 h-8 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
                        <svg
                          className="w-8 h-8 fill-current text-indigo-50"
                          viewBox="0 0 32 32"
                        >
                          <path d="M8.994 20.006a1 1 0 0 1-.707-1.707l4.5-4.5a1 1 0 0 1 1.414 0l3.293 3.293 4.793-4.793a1 1 0 1 1 1.414 1.414l-5.5 5.5a1 1 0 0 1-1.414 0l-3.293-3.293L9.7 19.713a1 1 0 0 1-.707.293Z" />
                        </svg>
                      </div>
                      {/* Position */}
                      <div>
                        <div className="font-medium text-slate-800">
                          Product Designer
                        </div>
                        <div className="flex flex-nowrap items-center space-x-2 whitespace-nowrap">
                          <div>HCM</div>
                          <div className="text-slate-400">·</div>
                          <div>April, 2018 - April 2020</div>
                        </div>
                      </div>
                    </div>
                    {/* Tags */}
                    <div className="sm:ml-2 mt-2 sm:mt-0">
                      <ul className="flex flex-wrap sm:justify-end -m-1">
                        <li className="m-1">
                          <button className="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                            Marketing
                          </button>
                        </li>
                        <li className="m-1">
                          <button className="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                            +4
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>

                  {/* Item */}
                  <li className="sm:flex sm:items-center sm:justify-between">
                    <div className="sm:grow flex items-center text-sm">
                      {/* Icon */}
                      <div className="w-8 h-8 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
                        <svg
                          className="w-8 h-8 fill-current text-indigo-50"
                          viewBox="0 0 32 32"
                        >
                          <path d="M8.994 20.006a1 1 0 0 1-.707-1.707l4.5-4.5a1 1 0 0 1 1.414 0l3.293 3.293 4.793-4.793a1 1 0 1 1 1.414 1.414l-5.5 5.5a1 1 0 0 1-1.414 0l-3.293-3.293L9.7 19.713a1 1 0 0 1-.707.293Z" />
                        </svg>
                      </div>
                      {/* Position */}
                      <div>
                        <div className="font-medium text-slate-800">
                          Product Designer
                        </div>
                        <div className="flex flex-nowrap items-center space-x-2 whitespace-nowrap">
                          <div>Milan, IT</div>
                          <div className="text-slate-400">·</div>
                          <div>April, 2018 - April 2020</div>
                        </div>
                      </div>
                    </div>
                    {/* Tags */}
                    <div className="sm:ml-2 mt-2 sm:mt-0">
                      <ul className="flex flex-wrap sm:justify-end -m-1">
                        <li className="m-1">
                          <button className="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                            Marketing
                          </button>
                        </li>
                        <li className="m-1">
                          <button className="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
                            +4
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
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
        <main class="pb-8 pt-8">
          <div class="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
            <div class="grid grid-cols-1 items-start lg:grid-cols-5 lg:gap-8">
              <div class="grid grid-cols-1 gap-4 lg:col-span-5">
                <div class="sm:flex sm:items-center px-4 sm:px-0">
                  <div class="sm:flex-auto">
                    <h1 class="text-xl font-semibold text-gray-900">
                      Bird Records
                    </h1>
                    <p class="mt-2 text-sm text-gray-700">
                      A list of all records submitted by members of VN Bird.
                    </p>
                  </div>
                </div>

                <turbo-frame id="filters">
                  <div data-controller="record-filters">
                   
                  </div>

                  <div class="flex flex-col sm:rounded-lg shadow">
                    <div>
                      <dl class="sm:rounded-t-lg grid grid-cols-1 bg-white overflow-hidden border-b border-gray-200 divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
                        <div class="px-4 py-5 sm:p-6">
                          <dt class="text-base font-normal text-gray-900">
                            Total Records
                          </dt>
                          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                            <div class="flex items-baseline text-2xl font-semibold text-teal-600">
                              6
                            </div>
                          </dd>
                        </div>

                        <div class="px-4 py-5 sm:p-6">
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
                          <dt class="text-base font-normal text-gray-900">
                            Recorders
                          </dt>
                          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                            <div class="flex items-baseline text-2xl font-semibold text-teal-600">
                              2
                            </div>
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div class="overflow-hidden ring-1 ring-black ring-opacity-5 sm:rounded-b-lg">
                      <div class="table min-w-full">
                        <div class="bg-gray-50 table-header-group">
                          <div class="table-row">
                            <div class="table-cell border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 pl-4 pr-3 sm:pl-6">
                              Date
                            </div>
                            <div class="table-cell border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3 relative">
                              <span class="sr-only">Photo</span>
                            </div>
                            <div class="table-cell border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3">
                              Species
                            </div>
                            <div class="border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3 hidden sm:table-cell">
                              Location
                            </div>
                            <div class="border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3 hidden lg:table-cell">
                              Member
                            </div>
                            <div class="table-cell border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 relative pl-3 pr-4 sm:pr-6">
                              <span class="sr-only">Edit</span>
                            </div>
                          </div>
                        </div>
                        <div class="table-header-group bg-white">
                          <turbo-frame
                            id="row_record_10444"
                            class="contents"
                            target="_top"
                          >
                            <div class="table-row">
                              <div class="table-cell border-b border-gray-200 text-sm w-full max-w-0 py-4 pl-4 pr-3 sm:w-auto sm:max-w-none sm:pl-6 text-gray-900">
                                Jun 22, 2023
                                <dl class="font-normal lg:hidden">
                                  <dt class="sr-only">Member</dt>
                                  <dd class="mt-1 truncate text-gray-700 lg:hidden">
                                    <a
                                      class="hover:text-gray-900"
                                      href="/clubs/vn-bird/members/806"
                                    >
                                      Thông Hoàng
                                    </a>
                                  </dd>
                                  <dt class="sr-only">Location</dt>
                                  <dd class="mt-1 truncate text-gray-500 sm:hidden">
                                    <a
                                      class="hover:text-gray-900"
                                      href="/clubs/vn-bird/locations/at-home"
                                    >
                                      At Home
                                    </a>
                                  </dd>
                                </dl>
                              </div>
                              <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                <div class="flex flex-row items-center space-x-2"></div>
                              </div>
                              <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                5 x Redhead
                              </div>
                              <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden lg:table-cell">
                                <a
                                  class="hover:text-gray-900"
                                  href="/clubs/vn-bird/locations/at-home"
                                >
                                  At Home
                                </a>
                              </div>
                              <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden sm:table-cell">
                                <a
                                  class="hover:text-gray-900"
                                  href="/clubs/vn-bird/members/806"
                                >
                                  Thông Hoàng
                                </a>
                              </div>
                            </div>
                          </turbo-frame>
                          <turbo-frame
                            id="row_record_10039"
                            class="contents"
                            target="_top"
                          >
                            <div class="table-row">
                              <div class="table-cell border-b border-gray-200 text-sm w-full max-w-0 py-4 pl-4 pr-3 sm:w-auto sm:max-w-none sm:pl-6 text-gray-900">
                                May 20, 2023
                                <dl class="font-normal lg:hidden">
                                  <dt class="sr-only">Member</dt>
                                  <dd class="mt-1 truncate text-gray-700 lg:hidden">
                                    <a
                                      class="hover:text-gray-900"
                                      href="/clubs/vn-bird/members/805"
                                    >
                                      Triệu Khắc
                                    </a>
                                  </dd>
                                  <dt class="sr-only">Location</dt>
                                  <dd class="mt-1 truncate text-gray-500 sm:hidden">
                                    <a
                                      class="hover:text-gray-900"
                                      href="/clubs/vn-bird/locations/at-home"
                                    >
                                      At Home
                                    </a>
                                  </dd>
                                </dl>
                              </div>
                              <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                <div class="flex flex-row items-center space-x-2"></div>
                              </div>
                              <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                132 x Black Grouse
                              </div>
                              <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden lg:table-cell">
                                <a
                                  class="hover:text-gray-900"
                                  href="/clubs/vn-bird/locations/at-home"
                                >
                                  At Home
                                </a>
                              </div>
                              <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden sm:table-cell">
                                <a
                                  class="hover:text-gray-900"
                                  href="/clubs/vn-bird/members/805"
                                >
                                  Triệu Khắc
                                </a>
                              </div>
                            </div>
                          </turbo-frame>
                          <turbo-frame
                            id="row_record_10038"
                            class="contents"
                            target="_top"
                          >
                            <div class="table-row">
                              <div class="table-cell border-b border-gray-200 text-sm w-full max-w-0 py-4 pl-4 pr-3 sm:w-auto sm:max-w-none sm:pl-6 text-gray-900">
                                May 19, 2023
                                <dl class="font-normal lg:hidden">
                                  <dt class="sr-only">Member</dt>
                                  <dd class="mt-1 truncate text-gray-700 lg:hidden">
                                    <a
                                      class="hover:text-gray-900"
                                      href="/clubs/vn-bird/members/805"
                                    >
                                      Triệu Khắc
                                    </a>
                                  </dd>
                                  <dt class="sr-only">Location</dt>
                                  <dd class="mt-1 truncate text-gray-500 sm:hidden">
                                    <a
                                      class="hover:text-gray-900"
                                      href="/clubs/vn-bird/locations/at-home"
                                    >
                                      At Home
                                    </a>
                                  </dd>
                                </dl>
                              </div>
                              <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                <div class="flex flex-row items-center space-x-2">
                                  <div class="text-teal-600 -mb-1">
                                    <a
                                      class="text-sm font-medium text-teal-600 hover:text-teal-900  focus:outline-none"
                                      href="/clubs/vn-bird/birding_sessions/2019"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        class=" w-4 h-4"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                        ></path>
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                        ></path>
                                      </svg>
                                    </a>{" "}
                                  </div>
                                </div>
                              </div>
                              <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                12 x Black Grouse
                              </div>
                              <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden lg:table-cell">
                                <a
                                  class="hover:text-gray-900"
                                  href="/clubs/vn-bird/locations/at-home"
                                >
                                  At Home
                                </a>
                              </div>
                              <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden sm:table-cell">
                                <a
                                  class="hover:text-gray-900"
                                  href="/clubs/vn-bird/members/805"
                                >
                                  Triệu Khắc
                                </a>
                              </div>
                            </div>
                          </turbo-frame>
                          <turbo-frame
                            id="row_record_9936"
                            class="contents"
                            target="_top"
                          >
                            <div class="table-row">
                              <div class="table-cell border-b border-gray-200 text-sm w-full max-w-0 py-4 pl-4 pr-3 sm:w-auto sm:max-w-none sm:pl-6 text-gray-900">
                                May 13, 2023
                                <dl class="font-normal lg:hidden">
                                  <dt class="sr-only">Member</dt>
                                  <dd class="mt-1 truncate text-gray-700 lg:hidden">
                                    <a
                                      class="hover:text-gray-900"
                                      href="/clubs/vn-bird/members/805"
                                    >
                                      Triệu Khắc
                                    </a>
                                  </dd>
                                  <dt class="sr-only">Location</dt>
                                  <dd class="mt-1 truncate text-gray-500 sm:hidden">
                                    <a
                                      class="hover:text-gray-900"
                                      href="/clubs/vn-bird/locations/at-home"
                                    >
                                      At Home
                                    </a>
                                  </dd>
                                </dl>
                              </div>
                              <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                <div class="flex flex-row items-center space-x-2"></div>
                              </div>
                              <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                13 x Western Capercaillie
                              </div>
                              <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden lg:table-cell">
                                <a
                                  class="hover:text-gray-900"
                                  href="/clubs/vn-bird/locations/at-home"
                                >
                                  At Home
                                </a>
                              </div>
                              <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden sm:table-cell">
                                <a
                                  class="hover:text-gray-900"
                                  href="/clubs/vn-bird/members/805"
                                >
                                  Triệu Khắc
                                </a>
                              </div>
                            </div>
                          </turbo-frame>
                          <turbo-frame
                            id="row_record_9935"
                            class="contents"
                            target="_top"
                          >
                            <div class="table-row">
                              <div class="table-cell border-b border-gray-200 text-sm w-full max-w-0 py-4 pl-4 pr-3 sm:w-auto sm:max-w-none sm:pl-6 text-gray-900">
                                May 13, 2023
                                <dl class="font-normal lg:hidden">
                                  <dt class="sr-only">Member</dt>
                                  <dd class="mt-1 truncate text-gray-700 lg:hidden">
                                    <a
                                      class="hover:text-gray-900"
                                      href="/clubs/vn-bird/members/806"
                                    >
                                      Thông Hoàng
                                    </a>
                                  </dd>
                                  <dt class="sr-only">Location</dt>
                                  <dd class="mt-1 truncate text-gray-500 sm:hidden">
                                    <a
                                      class="hover:text-gray-900"
                                      href="/clubs/vn-bird/locations/at-home"
                                    >
                                      At Home
                                    </a>
                                  </dd>
                                </dl>
                              </div>
                              <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                <div class="flex flex-row items-center space-x-2">
                                  <div class="text-teal-600 -mb-1">
                                    <a
                                      class="text-sm font-medium text-teal-600 hover:text-teal-900  focus:outline-none"
                                      href="/clubs/vn-bird/birding_sessions/1991"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        class=" w-4 h-4"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                        ></path>
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                        ></path>
                                      </svg>
                                    </a>{" "}
                                  </div>
                                </div>
                              </div>
                              <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                1 x Western Capercaillie
                              </div>
                              <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden lg:table-cell">
                                <a
                                  class="hover:text-gray-900"
                                  href="/clubs/vn-bird/locations/at-home"
                                >
                                  At Home
                                </a>
                              </div>
                              <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden sm:table-cell">
                                <a
                                  class="hover:text-gray-900"
                                  href="/clubs/vn-bird/members/806"
                                >
                                  Thông Hoàng
                                </a>
                              </div>
                            </div>
                          </turbo-frame>
                          <turbo-frame
                            id="row_record_9937"
                            class="contents"
                            target="_top"
                          >
                            <div class="table-row">
                              <div class="table-cell border-b border-gray-200 text-sm w-full max-w-0 py-4 pl-4 pr-3 sm:w-auto sm:max-w-none sm:pl-6 text-gray-900">
                                May 13, 2023
                                <dl class="font-normal lg:hidden">
                                  <dt class="sr-only">Member</dt>
                                  <dd class="mt-1 truncate text-gray-700 lg:hidden">
                                    <a
                                      class="hover:text-gray-900"
                                      href="/clubs/vn-bird/members/806"
                                    >
                                      Thông Hoàng
                                    </a>
                                  </dd>
                                  <dt class="sr-only">Location</dt>
                                  <dd class="mt-1 truncate text-gray-500 sm:hidden">
                                    <a
                                      class="hover:text-gray-900"
                                      href="/clubs/vn-bird/locations/out-and-about"
                                    >
                                      Out and About
                                    </a>
                                  </dd>
                                </dl>
                              </div>
                              <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                <div class="flex flex-row items-center space-x-2">
                                  <div class="text-teal-600 -mb-1">
                                    <a
                                      class="text-sm font-medium text-teal-600 hover:text-teal-900  focus:outline-none"
                                      href="/clubs/vn-bird/birding_sessions/1995"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        class=" w-4 h-4"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                        ></path>
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                        ></path>
                                      </svg>
                                    </a>{" "}
                                  </div>
                                  <div class="text-teal-600 -mb-1">
                                    <a
                                      class="text-sm font-medium text-teal-600 hover:text-teal-900  focus:outline-none"
                                      href="/clubs/vn-bird/birding_sessions/1995"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        class=" w-4 h-4"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                                        ></path>
                                      </svg>
                                    </a>{" "}
                                  </div>
                                </div>
                              </div>
                              <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                2 x Common Quail
                              </div>
                              <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden lg:table-cell">
                                <a
                                  class="hover:text-gray-900"
                                  href="/clubs/vn-bird/locations/out-and-about"
                                >
                                  Out and About
                                </a>
                              </div>
                              <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden sm:table-cell">
                                <a
                                  class="hover:text-gray-900"
                                  href="/clubs/vn-bird/members/806"
                                >
                                  Thông Hoàng
                                </a>
                              </div>
                            </div>
                          </turbo-frame>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div class="pt-6 flex items-center justify-between">
                  <nav class="pagy-nav pagination" aria-label="pager"><span class="page prev disabled">‹&nbsp;Prev</span> <span class="page next disabled">Next&nbsp;›</span></nav>
                </div> */}
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
            <div className="flex space-x-2 sm:mb-2">
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
            </div>
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
          <div className="text-sm mb-3">{props.profile ? props.profile.about : ""}</div>
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
})

export default ProfileBody;
