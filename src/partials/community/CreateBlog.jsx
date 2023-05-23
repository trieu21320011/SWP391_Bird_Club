import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';


function CreateBlog() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main className="bg-white">

                    <div className="relative flex">

                        {/* Content */}
                        <div className="w-full ">

                            <div className="min-h-screen h-full flex flex-col after:flex-1">
                                <div className="px-4 py-8">
                                    <div className="max-w-md mx-auto">

                                        <h1 className="text-3xl text-slate-800 font-bold mb-6">Company information ✨</h1>
                                        {/* htmlForm */}
                                        <form>
                                            <div className="space-y-4 mb-8">
                                                {/* Company Name */}
                                                <div>
                                                    <label className="block text-sm font-medium mb-1" htmlFor="company-name">Company Name <span className="text-rose-500">*</span></label>
                                                    <input id="company-name" className="form-input w-full" type="text" />
                                                </div>
                                                {/* City and Postal Code */}
                                                <div className="flex space-x-4">
                                                    <div className="flex-1">
                                                        <label className="block text-sm font-medium mb-1" htmlFor="city">City <span className="text-rose-500">*</span></label>
                                                        <input id="city" className="form-input w-full" type="text" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <label className="block text-sm font-medium mb-1" htmlFor="postal-code">Postal Code <span className="text-rose-500">*</span></label>
                                                        <input id="postal-code" className="form-input w-full" type="text" />
                                                    </div>
                                                </div>
                                                {/* Street Address */}
                                                <div>
                                                    <label className="block text-sm font-medium mb-1" htmlFor="street">Street Address <span className="text-rose-500">*</span></label>
                                                    <input id="street" className="form-input w-full" type="text" />
                                                </div>
                                                {/* Country */}
                                                <div>
                                                    <label className="block text-sm font-medium mb-1" htmlFor="country">Country <span className="text-rose-500">*</span></label>
                                                    <select id="country" className="form-select w-full">
                                                        <option>USA</option>
                                                        <option>Italy</option>
                                                        <option>United Kingdom</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <Link className="text-sm underline hover:no-underline" to="/onboarding-02">&lt;- Back</Link>
                                                <Link className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto" to="/onboarding-04">Next Step -&gt;</Link>
                                            </div>
                                        </form>

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

export default CreateBlog;