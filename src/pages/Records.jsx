import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

function Records() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main class="pb-8 pt-8">
                    <div class="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8">

                        <div class="grid grid-cols-1 items-start lg:grid-cols-5 lg:gap-8">
                            <div class="grid grid-cols-1 gap-4 lg:col-span-5">

                                <div class="sm:flex sm:items-center px-4 sm:px-0">
                                    <div class="sm:flex-auto">
                                        <h1 class="text-xl font-semibold text-gray-900">Club Records</h1>
                                        <p class="mt-2 text-sm text-gray-700">
                                            A list of all records submitted by members of VN Bird.
                                        </p>
                                    </div>
                                    <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                        <a class="px-4 py-2 text-sm text-white shadow-sm border-transparent bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 inline-flex items-center border font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2" href="/clubs/vn-bird/birding_sessions/new">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="-ml-1 mr-3 w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                                            </svg>

                                            Add Records
                                        </a>
                                    </div>
                                </div>

                                <turbo-frame id="filters">
                                    <div data-controller="record-filters">

                                        <section aria-labelledby="filter-heading" class="relative z-10 grid items-center">
                                            <h2 id="filter-heading" class="sr-only">Filters</h2>
                                            <div class="relative col-start-1 row-start-1 py-4">
                                                <div class="max-w-7xl mx-auto flex space-x-6 divide-x divide-gray-200 text-sm px-4">
                                                    <div>
                                                        <button data-record-filters-target="toggle" data-action="record-filters#toggle" type="button" class="group text-gray-700 font-medium flex items-center" aria-controls="disclosure-1" aria-expanded="false">

                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="flex-none mr-2 text-gray-400 group-hover:text-gray-500 w-5 h-5">
                                                                <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd"></path>
                                                            </svg>

                                                            Filter
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <form class="hidden" data-record-filters-target="form" data-turbo-action="advance" action="/clubs/vn-bird/records" accept-charset="UTF-8" method="get">
                                                <input data-record-filters-target="open" autocomplete="off" type="hidden" name="open" id="open" />
                                                <div class="border-t border-gray-200 py-10" id="disclosure-1">
                                                    <div class="max-w-7xl mx-auto  gap-x-4 px-4 text-sm md:gap-x-6">
                                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-y-10 lg:grid-cols-3 md:gap-x-6 w-full">
                                                            <div class="space-y-4">
                                                                <div>
                                                                    <legend class="block font-medium">Reported After</legend>
                                                                    <div class="mt-1">
                                                                        <input data-action="change->record-filters#submit" class="min-w-42 block shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" placeholder="dd/mm/yyyy" type="date" name="reported_after" id="reported_after" />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <legend class="block font-medium">Reported Before</legend>
                                                                    <div class="mt-1">
                                                                        <input data-action="change->record-filters#submit" class="min-w-42 block shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" placeholder="dd/mm/yyyy" type="date" name="reported_before" id="reported_before" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="space-y-4">
                                                                <div>
                                                                    <legend class="block font-medium">Family</legend>
                                                                    <div class="mt-1">
                                                                        <select data-action="change->record-filters#submit" class="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none sm:text-sm rounded-md focus:ring-teal-500 focus:border-teal-500" name="family" id="family"><option value="" label=" "></option>
                                                                            <option value="Pheasants &amp; Allies">Pheasants &amp; Allies</option></select>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <legend class="block font-medium">Species</legend>
                                                                    <div class="mt-1">
                                                                        <select data-action="change->record-filters#submit" class="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none sm:text-sm rounded-md focus:ring-teal-500 focus:border-teal-500" name="bird_id" id="bird_id"><option value="" label=" "></option>
                                                                            <option value="1">Western Capercaillie</option>
                                                                            <option value="2">Black Grouse</option>
                                                                            <option value="7">Common Quail</option></select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="space-y-4">
                                                                <div>
                                                                    <legend class="block font-medium">Location</legend>
                                                                    <div class="mt-1">
                                                                        <select data-action="change->record-filters#submit" class="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none sm:text-sm rounded-md focus:ring-teal-500 focus:border-teal-500" name="location_id" id="location_id"><option value="" label=" "></option>
                                                                            <option value="1248">At Home</option>
                                                                            <option value="1247">Out and About</option></select>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <legend class="block font-medium">Member</legend>
                                                                    <div class="mt-1">
                                                                        <select data-action="change->record-filters#submit" class="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none sm:text-sm rounded-md focus:ring-teal-500 focus:border-teal-500" name="member_id" id="member_id"><option value="" label=" "></option>
                                                                            <option value="806">Thông Hoàng</option>
                                                                            <option value="805">Triệu Khắc</option></select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>  </section>
                                    </div>

                                    <div class="flex flex-col sm:rounded-lg shadow">
                                        <div>
                                            <dl class="sm:rounded-t-lg grid grid-cols-1 bg-white overflow-hidden border-b border-gray-200 divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
                                                <div class="px-4 py-5 sm:p-6">
                                                    <dt class="text-base font-normal text-gray-900">Total Records</dt>
                                                    <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                                                        <div class="flex items-baseline text-2xl font-semibold text-teal-600">
                                                            5
                                                        </div>
                                                    </dd>
                                                </div>

                                                <div class="px-4 py-5 sm:p-6">
                                                    <dt class="text-base font-normal text-gray-900">Unique Species</dt>
                                                    <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                                                        <div class="flex items-baseline text-2xl font-semibold text-teal-600">
                                                            3
                                                        </div>
                                                    </dd>
                                                </div>

                                                <div class="px-4 py-5 sm:p-6">
                                                    <dt class="text-base font-normal text-gray-900">Recorders</dt>
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
                                                    <turbo-frame id="row_record_10039" class="contents" target="_top">
                                                        <div class="table-row">
                                                            <div class="table-cell border-b border-gray-200 text-sm w-full max-w-0 py-4 pl-4 pr-3 sm:w-auto sm:max-w-none sm:pl-6 text-gray-900">
                                                                May 20, 2023
                                                                <dl class="font-normal lg:hidden">
                                                                    <dt class="sr-only">Member</dt>
                                                                    <dd class="mt-1 truncate text-gray-700 lg:hidden">
                                                                        <a class="hover:text-gray-900" href="/clubs/vn-bird/members/805">Triệu Khắc</a>
                                                                    </dd>
                                                                    <dt class="sr-only">Location</dt>
                                                                    <dd class="mt-1 truncate text-gray-500 sm:hidden">
                                                                        <a class="hover:text-gray-900" href="/clubs/vn-bird/locations/at-home">At Home</a>
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                                                <div class="flex flex-row items-center space-x-2">
                                                                </div>
                                                            </div>
                                                            <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                                                132 x Black Grouse
                                                            </div>
                                                            <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden lg:table-cell">
                                                                <a class="hover:text-gray-900" href="/clubs/vn-bird/locations/at-home">At Home</a>
                                                            </div>
                                                            <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden sm:table-cell">
                                                                <a class="hover:text-gray-900" href="/clubs/vn-bird/members/805">Triệu Khắc</a>
                                                            </div>
                                                            <div class="table-cell border-b border-gray-200 text-sm text-gray-500 pl-3 pr-4 text-right sm:pr-6">
                                                                <div class="justify-end">
                                                                    <div class="relative inline-block">
                                                                        <div data-controller="dropdown">
                                                                            <div data-dropdown-target="button" data-action="click->dropdown#toggleMenu click@window->dropdown#hideMenu">

                                                                                <button type="button" class="rounded-full text-gray-400 hover:text-gray-600" id="menu-0-button" aria-expanded="false" aria-haspopup="true">
                                                                                    <span class="sr-only">Open options</span>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="-mb-1 w-5 h-5">
                                                                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                                                                    </svg>

                                                                                </button>

                                                                            </div>
                                                                            <div class="hidden z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1" data-dropdown-target="menu" data-transition-enter="transition ease-out duration-100" data-transition-enter-start="transform opacity-0 scale-95" data-transition-enter-end="transform opacity-100 scale-100" data-transition-leave="transition ease-in duration-75" data-transition-leave-start="transform opacity-100 scale-100" data-transition-leave-end="transform opacity-0 scale-95">
                                                                                <div class="py-1" role="none">
                                                                                    <a data-turbo-frame="modal" class="hover:bg-gray-100 group flex items-center hover:text-gray-900 text-gray-700 block px-4 py-2 text-sm" href="/clubs/vn-bird/records/10039/edit"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="mr-3 text-gray-400 group-hover:text-gray-500 w-5 h-5">
                                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                                                                    </svg>
                                                                                        Edit</a>
                                                                                    <a data-turbo-method="delete" data-turbo-confirm="Are you sure?" class="hover:bg-gray-100 group flex items-center hover:text-gray-900 text-gray-700 block px-4 py-2 text-sm" href="/clubs/vn-bird/records/10039"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="mr-3 text-gray-400 group-hover:text-gray-500 w-5 h-5">
                                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                                                    </svg>
                                                                                        Delete</a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </turbo-frame>
                                                    <turbo-frame id="row_record_10038" class="contents" target="_top">
                                                        <div class="table-row">
                                                            <div class="table-cell border-b border-gray-200 text-sm w-full max-w-0 py-4 pl-4 pr-3 sm:w-auto sm:max-w-none sm:pl-6 text-gray-900">
                                                                May 19, 2023
                                                                <dl class="font-normal lg:hidden">
                                                                    <dt class="sr-only">Member</dt>
                                                                    <dd class="mt-1 truncate text-gray-700 lg:hidden">
                                                                        <a class="hover:text-gray-900" href="/clubs/vn-bird/members/805">Triệu Khắc</a>
                                                                    </dd>
                                                                    <dt class="sr-only">Location</dt>
                                                                    <dd class="mt-1 truncate text-gray-500 sm:hidden">
                                                                        <a class="hover:text-gray-900" href="/clubs/vn-bird/locations/at-home">At Home</a>
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                                                <div class="flex flex-row items-center space-x-2">
                                                                    <div class="text-teal-600 -mb-1">
                                                                        <a class="text-sm font-medium text-teal-600 hover:text-teal-900  focus:outline-none" href="/clubs/vn-bird/birding_sessions/2019">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class=" w-4 h-4">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                                            </svg>

                                                                        </a>          </div>
                                                                </div>
                                                            </div>
                                                            <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                                                12 x Black Grouse
                                                            </div>
                                                            <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden lg:table-cell">
                                                                <a class="hover:text-gray-900" href="/clubs/vn-bird/locations/at-home">At Home</a>
                                                            </div>
                                                            <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden sm:table-cell">
                                                                <a class="hover:text-gray-900" href="/clubs/vn-bird/members/805">Triệu Khắc</a>
                                                            </div>
                                                            <div class="table-cell border-b border-gray-200 text-sm text-gray-500 pl-3 pr-4 text-right sm:pr-6">
                                                                <div class="justify-end">
                                                                    <div class="relative inline-block">
                                                                        <div data-controller="dropdown">
                                                                            <div data-dropdown-target="button" data-action="click->dropdown#toggleMenu click@window->dropdown#hideMenu">

                                                                                <button type="button" class="rounded-full text-gray-400 hover:text-gray-600" id="menu-0-button" aria-expanded="false" aria-haspopup="true">
                                                                                    <span class="sr-only">Open options</span>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="-mb-1 w-5 h-5">
                                                                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                                                                    </svg>

                                                                                </button>

                                                                            </div>
                                                                            <div class="hidden z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1" data-dropdown-target="menu" data-transition-enter="transition ease-out duration-100" data-transition-enter-start="transform opacity-0 scale-95" data-transition-enter-end="transform opacity-100 scale-100" data-transition-leave="transition ease-in duration-75" data-transition-leave-start="transform opacity-100 scale-100" data-transition-leave-end="transform opacity-0 scale-95">
                                                                                <div class="py-1" role="none">
                                                                                    <a data-turbo-frame="modal" class="hover:bg-gray-100 group flex items-center hover:text-gray-900 text-gray-700 block px-4 py-2 text-sm" href="/clubs/vn-bird/records/10038/edit"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="mr-3 text-gray-400 group-hover:text-gray-500 w-5 h-5">
                                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                                                                    </svg>
                                                                                        Edit</a>
                                                                                    <a data-turbo-method="delete" data-turbo-confirm="Are you sure?" class="hover:bg-gray-100 group flex items-center hover:text-gray-900 text-gray-700 block px-4 py-2 text-sm" href="/clubs/vn-bird/records/10038"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="mr-3 text-gray-400 group-hover:text-gray-500 w-5 h-5">
                                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                                                    </svg>
                                                                                        Delete</a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </turbo-frame>
                                                    <turbo-frame id="row_record_9936" class="contents" target="_top">
                                                        <div class="table-row">
                                                            <div class="table-cell border-b border-gray-200 text-sm w-full max-w-0 py-4 pl-4 pr-3 sm:w-auto sm:max-w-none sm:pl-6 text-gray-900">
                                                                May 13, 2023
                                                                <dl class="font-normal lg:hidden">
                                                                    <dt class="sr-only">Member</dt>
                                                                    <dd class="mt-1 truncate text-gray-700 lg:hidden">
                                                                        <a class="hover:text-gray-900" href="/clubs/vn-bird/members/805">Triệu Khắc</a>
                                                                    </dd>
                                                                    <dt class="sr-only">Location</dt>
                                                                    <dd class="mt-1 truncate text-gray-500 sm:hidden">
                                                                        <a class="hover:text-gray-900" href="/clubs/vn-bird/locations/at-home">At Home</a>
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                                                <div class="flex flex-row items-center space-x-2">
                                                                </div>
                                                            </div>
                                                            <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                                                13 x Western Capercaillie
                                                            </div>
                                                            <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden lg:table-cell">
                                                                <a class="hover:text-gray-900" href="/clubs/vn-bird/locations/at-home">At Home</a>
                                                            </div>
                                                            <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden sm:table-cell">
                                                                <a class="hover:text-gray-900" href="/clubs/vn-bird/members/805">Triệu Khắc</a>
                                                            </div>
                                                            <div class="table-cell border-b border-gray-200 text-sm text-gray-500 pl-3 pr-4 text-right sm:pr-6">
                                                                <div class="justify-end">
                                                                    <div class="relative inline-block">
                                                                        <div data-controller="dropdown">
                                                                            <div data-dropdown-target="button" data-action="click->dropdown#toggleMenu click@window->dropdown#hideMenu">

                                                                                <button type="button" class="rounded-full text-gray-400 hover:text-gray-600" id="menu-0-button" aria-expanded="false" aria-haspopup="true">
                                                                                    <span class="sr-only">Open options</span>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="-mb-1 w-5 h-5">
                                                                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                                                                    </svg>

                                                                                </button>

                                                                            </div>
                                                                            <div class="hidden z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1" data-dropdown-target="menu" data-transition-enter="transition ease-out duration-100" data-transition-enter-start="transform opacity-0 scale-95" data-transition-enter-end="transform opacity-100 scale-100" data-transition-leave="transition ease-in duration-75" data-transition-leave-start="transform opacity-100 scale-100" data-transition-leave-end="transform opacity-0 scale-95">
                                                                                <div class="py-1" role="none">
                                                                                    <a data-turbo-frame="modal" class="hover:bg-gray-100 group flex items-center hover:text-gray-900 text-gray-700 block px-4 py-2 text-sm" href="/clubs/vn-bird/records/9936/edit"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="mr-3 text-gray-400 group-hover:text-gray-500 w-5 h-5">
                                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                                                                    </svg>
                                                                                        Edit</a>
                                                                                    <a data-turbo-method="delete" data-turbo-confirm="Are you sure?" class="hover:bg-gray-100 group flex items-center hover:text-gray-900 text-gray-700 block px-4 py-2 text-sm" href="/clubs/vn-bird/records/9936"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="mr-3 text-gray-400 group-hover:text-gray-500 w-5 h-5">
                                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                                                    </svg>
                                                                                        Delete</a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </turbo-frame>
                                                    <turbo-frame id="row_record_9935" class="contents" target="_top">
                                                        <div class="table-row">
                                                            <div class="table-cell border-b border-gray-200 text-sm w-full max-w-0 py-4 pl-4 pr-3 sm:w-auto sm:max-w-none sm:pl-6 text-gray-900">
                                                                May 13, 2023
                                                                <dl class="font-normal lg:hidden">
                                                                    <dt class="sr-only">Member</dt>
                                                                    <dd class="mt-1 truncate text-gray-700 lg:hidden">
                                                                        <a class="hover:text-gray-900" href="/clubs/vn-bird/members/806">Thông Hoàng</a>
                                                                    </dd>
                                                                    <dt class="sr-only">Location</dt>
                                                                    <dd class="mt-1 truncate text-gray-500 sm:hidden">
                                                                        <a class="hover:text-gray-900" href="/clubs/vn-bird/locations/at-home">At Home</a>
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                                                <div class="flex flex-row items-center space-x-2">
                                                                    <div class="text-teal-600 -mb-1">
                                                                        <a class="text-sm font-medium text-teal-600 hover:text-teal-900  focus:outline-none" href="/clubs/vn-bird/birding_sessions/1991">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class=" w-4 h-4">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                                            </svg>

                                                                        </a>          </div>
                                                                </div>
                                                            </div>
                                                            <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                                                1 x Western Capercaillie
                                                            </div>
                                                            <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden lg:table-cell">
                                                                <a class="hover:text-gray-900" href="/clubs/vn-bird/locations/at-home">At Home</a>
                                                            </div>
                                                            <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden sm:table-cell">
                                                                <a class="hover:text-gray-900" href="/clubs/vn-bird/members/806">Thông Hoàng</a>
                                                            </div>
                                                            <div class="table-cell border-b border-gray-200 text-sm text-gray-500 pl-3 pr-4 text-right sm:pr-6">
                                                                <div class="justify-end">
                                                                    <div class="relative inline-block">
                                                                        <div data-controller="dropdown">
                                                                            <div data-dropdown-target="button" data-action="click->dropdown#toggleMenu click@window->dropdown#hideMenu">

                                                                                <button type="button" class="rounded-full text-gray-400 hover:text-gray-600" id="menu-0-button" aria-expanded="false" aria-haspopup="true">
                                                                                    <span class="sr-only">Open options</span>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="-mb-1 w-5 h-5">
                                                                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                                                                    </svg>

                                                                                </button>

                                                                            </div>
                                                                            <div class="hidden z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1" data-dropdown-target="menu" data-transition-enter="transition ease-out duration-100" data-transition-enter-start="transform opacity-0 scale-95" data-transition-enter-end="transform opacity-100 scale-100" data-transition-leave="transition ease-in duration-75" data-transition-leave-start="transform opacity-100 scale-100" data-transition-leave-end="transform opacity-0 scale-95">
                                                                                <div class="py-1" role="none">
                                                                                    <a data-turbo-frame="modal" class="hover:bg-gray-100 group flex items-center hover:text-gray-900 text-gray-700 block px-4 py-2 text-sm" href="/clubs/vn-bird/records/9935/edit"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="mr-3 text-gray-400 group-hover:text-gray-500 w-5 h-5">
                                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                                                                    </svg>
                                                                                        Edit</a>
                                                                                    <a data-turbo-method="delete" data-turbo-confirm="Are you sure?" class="hover:bg-gray-100 group flex items-center hover:text-gray-900 text-gray-700 block px-4 py-2 text-sm" href="/clubs/vn-bird/records/9935"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="mr-3 text-gray-400 group-hover:text-gray-500 w-5 h-5">
                                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                                                    </svg>
                                                                                        Delete</a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </turbo-frame>
                                                    <turbo-frame id="row_record_9937" class="contents" target="_top">
                                                        <div class="table-row">
                                                            <div class="table-cell border-b border-gray-200 text-sm w-full max-w-0 py-4 pl-4 pr-3 sm:w-auto sm:max-w-none sm:pl-6 text-gray-900">
                                                                May 13, 2023
                                                                <dl class="font-normal lg:hidden">
                                                                    <dt class="sr-only">Member</dt>
                                                                    <dd class="mt-1 truncate text-gray-700 lg:hidden">
                                                                        <a class="hover:text-gray-900" href="/clubs/vn-bird/members/806">Thông Hoàng</a>
                                                                    </dd>
                                                                    <dt class="sr-only">Location</dt>
                                                                    <dd class="mt-1 truncate text-gray-500 sm:hidden">
                                                                        <a class="hover:text-gray-900" href="/clubs/vn-bird/locations/out-and-about">Out and About</a>
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                                                <div class="flex flex-row items-center space-x-2">
                                                                    <div class="text-teal-600 -mb-1">
                                                                        <a class="text-sm font-medium text-teal-600 hover:text-teal-900  focus:outline-none" href="/clubs/vn-bird/birding_sessions/1995">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class=" w-4 h-4">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                                            </svg>

                                                                        </a>          </div>
                                                                    <div class="text-teal-600 -mb-1">
                                                                        <a class="text-sm font-medium text-teal-600 hover:text-teal-900  focus:outline-none" href="/clubs/vn-bird/birding_sessions/1995">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class=" w-4 h-4">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                                                                            </svg>

                                                                        </a>          </div>
                                                                </div>
                                                            </div>
                                                            <div class="table-cell border-b border-gray-200 text-sm px-3 text-gray-500">
                                                                2 x Common Quail
                                                            </div>
                                                            <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden lg:table-cell">
                                                                <a class="hover:text-gray-900" href="/clubs/vn-bird/locations/out-and-about">Out and About</a>
                                                            </div>
                                                            <div class="border-b border-gray-200 text-sm px-3 text-gray-500 hidden sm:table-cell">
                                                                <a class="hover:text-gray-900" href="/clubs/vn-bird/members/806">Thông Hoàng</a>
                                                            </div>
                                                            <div class="table-cell border-b border-gray-200 text-sm text-gray-500 pl-3 pr-4 text-right sm:pr-6">
                                                                <div class="justify-end">
                                                                    <div class="relative inline-block">
                                                                        <div data-controller="dropdown">
                                                                            <div data-dropdown-target="button" data-action="click->dropdown#toggleMenu click@window->dropdown#hideMenu">

                                                                                <button type="button" class="rounded-full text-gray-400 hover:text-gray-600" id="menu-0-button" aria-expanded="false" aria-haspopup="true">
                                                                                    <span class="sr-only">Open options</span>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="-mb-1 w-5 h-5">
                                                                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                                                                    </svg>

                                                                                </button>

                                                                            </div>
                                                                            <div class="hidden z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1" data-dropdown-target="menu" data-transition-enter="transition ease-out duration-100" data-transition-enter-start="transform opacity-0 scale-95" data-transition-enter-end="transform opacity-100 scale-100" data-transition-leave="transition ease-in duration-75" data-transition-leave-start="transform opacity-100 scale-100" data-transition-leave-end="transform opacity-0 scale-95">
                                                                                <div class="py-1" role="none">
                                                                                    <a data-turbo-frame="modal" class="hover:bg-gray-100 group flex items-center hover:text-gray-900 text-gray-700 block px-4 py-2 text-sm" href="/clubs/vn-bird/records/9937/edit"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="mr-3 text-gray-400 group-hover:text-gray-500 w-5 h-5">
                                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                                                                    </svg>
                                                                                        Edit</a>
                                                                                    <a data-turbo-method="delete" data-turbo-confirm="Are you sure?" class="hover:bg-gray-100 group flex items-center hover:text-gray-900 text-gray-700 block px-4 py-2 text-sm" href="/clubs/vn-bird/records/9937"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="mr-3 text-gray-400 group-hover:text-gray-500 w-5 h-5">
                                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                                                    </svg>
                                                                                        Delete</a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </turbo-frame>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="pt-6 flex items-center justify-between">
                                        <nav class="pagy-nav pagination" aria-label="pager"><span class="page prev disabled">‹&nbsp;Prev</span> <span class="page next disabled">Next&nbsp;›</span></nav>
                                    </div>
                                </turbo-frame>

                            </div>
                        </div>

                    </div>
                </main>

            </div>

        </div>
    );
}

export default Records;

