import React, { useState, useEffect, useRef } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { baseURL } from '../pages/baseUrl';
import axios from 'axios';
import ModalBasic from '../components/ModalBasic';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ModalBlank from '../components/ModalBlank';


function Analytics(props) {

  const [records, setRecords] = useState([])
  const [browserecords, setBrowserecords] = useState(null)
  const [editrecords, setEditrecords] = useState(true)
  const [delrecords, setDelrecords] = useState([false])

  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
  const [species, setSpecies] = useState("")
  const [imgUrl, setImgUrl] = useState("")
  const [newspecies, setNewSpecies] = useState("")
  const [newimgUrl, setNewImgUrl] = useState("")
  const [birds, setBirds] = useState([])
  const [quantity, setQuantity] = useState(0)
  const [newquantity, setNewQuantity] = useState(0)
  const [uid, setUid] = useState('')


  const getRecords = () => {
    const uid = localStorage.getItem("uid")
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/records/by-member/' + uid,
    };

    axios.request(config)
      .then((response) => {
        setRecords(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleDecline = (e, id) => {
    e.preventDefault()
    setUid(id)
    setDelrecords(true)
  }

  const id = localStorage.getItem('uid')
  const handleCreate = (e) => {
    e.preventDefault()
    Swal.fire({
      title: 'Loading',
      html: 'This will close in a minutes',

      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
      },
    })
    var data = JSON.stringify({
      "ownerId": id,
      "birdId": species,
      "quantity": quantity,
      "photo": imgUrl
    });

    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseURL + '/records',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        Swal.close()
        Swal.fire(
          "Good job!",
          "You success create a record!",
          "success",
        );
        getRecords()
      })
      .catch(function (error) {
        console.log();
        Swal.close()
        Swal.fire("Oops", "Something went wrong!", "error");
        setFeedbackModalOpen(false)
        getRecords()
      });
  }

  const setEditRecord = (record) => {
    setBrowserecords(record)
    setNewImgUrl(record.photo)
    setNewQuantity(record.quantity)
    setNewSpecies(record.birdId)
  }


  const getEditrecords = () => {
    // setRecords(id)
    var data = JSON.stringify({
      "birdId": newspecies,
      "quantity": newquantity,
      "photo": newimgUrl
    });
    console.log(browserecords)
    // console.log(data)
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: baseURL + '/records/' + browserecords.newsfeedId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        getRecords()
      })
      .catch((error) => {
        console.log(error);
      });

  }



  const handleDelete = (e) => {
    e.preventDefault()
    var config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: baseURL + '/records/' + uid + '/delete-record',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        setDelrecords(false)
        Swal.fire(
          "Good job!",
          "Success reject!",
          "success",
        );
        getRecords()

      })
      .catch(function (error) {
        console.log();
        setDelrecords(false)
        getRecords()
        Swal.fire(
          "Good job!",
          "Some thing went wrong!",
          "error",
        );
      });
  }

  function getBirds() {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/birds',
    };

    axios.request(config)
      .then((response) => {
        setBirds(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getRecords()
    getBirds()

  }, [])

  const [sidebarOpen, setSidebarOpen] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý dữ liệu form tại đây (ví dụ: gửi đi, lưu trữ, ...)
    console.log('species', species);
    console.log('quantity', quantity);
    console.log('photo', photo);
  };



  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <ModalBasic id="feedback-modal" modalOpen={feedbackModalOpen} setModalOpen={setFeedbackModalOpen} title="Let's write a blog">
          {/* Modal content */}
          <div className="px-5 py-4">
            <div className="text-sm">
              <div className="font-medium text-slate-800 mb-3">Let us know what you think 🙌</div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">Species <span className="text-rose-500">*</span></label>
                <select onChange={(e) => setSpecies(e.target.value)} id="country" className="form-select w-full">
                  {birds && birds.map((n, index) => {
                    return (
                      <option value={n.id}>{n.name}</option>
                    )
                  })}
                </select>
              </div>
              <div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">Quantity <span className="text-rose-500">*</span></label>
                <input id="name" className="form-input w-full px-2 py-1" type="number" required onChange={e => setQuantity(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">Image URL <span className="text-rose-500">*</span></label>
                <input id="name" className="form-input w-full px-2 py-1" type="text" required onChange={e => setImgUrl(e.target.value)} />
              </div>
            </div>
          </div>
          {/* Modal footer */}
          <div className="px-5 py-4 border-t border-slate-200">
            <div className="flex flex-wrap justify-end space-x-2">
              <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setFeedbackModalOpen(false); }}>Cancel</button>
              <button onClick={e => handleCreate(e)} className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Create</button>
            </div>
          </div>
        </ModalBasic>

        <ModalBlank id="info-modal" modalOpen={delrecords} setModalOpen={setDelrecords}>
          <div className="p-5 flex space-x-4">
            {/* Icon */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-indigo-100">
              <svg className="w-4 h-4 shrink-0 fill-current text-indigo-500" viewBox="0 0 16 16">
                <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
              </svg>
            </div>
            {/* Content */}
            <div>
              {/* Modal header */}
              <div className="mb-2">
                <div className="text-lg font-semibold text-slate-800">Delete this records from the web ?</div>
              </div>
              {/* Modal content */}
              <div className="text-sm mb-10">
                <div className="space-y-2">
                  <p>Are you sure about this!!</p>
                </div>
              </div>
              {/* Modal footer */}
              <div className="flex flex-wrap justify-end space-x-2">
                <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setDelrecords(false); }}>Cancel</button>
                <button onClick={(e) => handleDelete(e)} className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Yes, I'm sure about this</button>
              </div>
            </div>
          </div>
        </ModalBlank>

        <main class="pb-8 pt-8">
          <div class="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8">

            <div class="grid grid-cols-1 items-start lg:grid-cols-5 lg:gap-8">
              <div class="grid grid-cols-1 gap-4 lg:col-span-5">

                <div class="sm:flex sm:items-center px-4 sm:px-0">
                  <div class="sm:flex-auto">
                    <h1 class="text-xl font-semibold text-gray-900">Bird Records</h1>
                    <p class="mt-2 text-sm text-gray-700">
                      A list of all your bird records.
                    </p>
                  </div>
                  <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white" onClick={(e) => { e.stopPropagation(); setFeedbackModalOpen(true); }}>
                      Add Records
                    </button>
                  </div>
                </div>



                <turbo-frame id="filters">
                  <div class="flex flex-col sm:rounded-lg shadow">
                    <div>
                      <dl class="sm:rounded-t-lg grid grid-cols-1 bg-white overflow-hidden border-b border-gray-200 divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
                        <div class="px-4 py-5 sm:p-6">
                          <dt class="text-base font-normal text-gray-900">Total Records</dt>
                          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                            <div class="flex items-baseline text-2xl font-semibold text-teal-600">
                              <h2 className="font-semibold text-slate-800"><span className="text-slate-400 font-medium">{records.length}</span></h2>
                            </div>
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div class="overflow-hidden ring-1 ring-black ring-opacity-5 sm:rounded-b-lg">
                      <div class="table min-w-full">
                        <div class="bg-gray-50 table-header-group">
                          <div class="table-row">
                            <div class="border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3 hidden sm:table-cell">
                              Name
                            </div>
                            <div class="border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3 hidden sm:table-cell">
                              Species
                            </div>
                            <div class="border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3 hidden lg:table-cell">
                              Quantity
                            </div>
                            <div class="border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3 hidden lg:table-cell">
                              Picture
                            </div>
                            <div class="border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3 hidden lg:table-cell">
                              Edit
                            </div>
                            <div class="border-b border-gray-300 py-3.5 text-left text-sm font-semibold text-gray-900 px-3 hidden lg:table-cell">
                              Delete
                            </div>
                          </div>
                        </div>

                        {
                          records.length > 0 ? records.map((record) => {
                            return (
                              <div class="table-header-group bg-white">
                                <turbo-frame id="row_record_10444" class="contents" target="_top">


                                  <div class="table-row">
                                    <div class="border-b border-gray-200 text-sm px-3 text-gray-900 hidden lg:table-cell">
                                      {record.birdName}
                                    </div>
                                    <div class="border-b border-gray-200 text-sm px-3 text-gray-900 hidden lg:table-cell">
                                      {record.species}
                                    </div>
                                    <div class="border-b border-gray-200 text-sm px-3 text-gray-900 hidden sm:table-cell">
                                      {record.quantity}
                                    </div>
                                    <div class="border-b border-gray-200 text-sm px-3 text-gray-900 hidden sm:table-cell">
                                      <img className='w-40 mt-4' src={record.photo} width="32" height="32" alt="User 08" />
                                    </div>
                                    <div class="table-cell border-b border-gray-200 text-sm text-gray-500 pl-3 pr-4  sm:pr-6">
                                      <div >
                                        <div class="relative inline-block">
                                          <a href='#popup2' id='openPopUp' className='btn w-20 bg-indigo-500 hover:bg-indigo-600 text-white m-1' onClick={() => setEditRecord(record)}>Edit</a>
                                        </div>
                                      </div>
                                         <div id='popup2' className='overlay z-60'>
                                            <div className='popup'>
                                              <a className='close' href='#'>&times;</a>
                                              <div class="bg-white shadow sm:rounded-lg">
                                                <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 sm:rounded-t-lg">
                                                  <div class="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                                                    <div class="ml-4 mt-2">
                                                      <h3 class="text-lg leading-6 font-medium text-gray-900">
                                                        Bird List
                                                      </h3>
                                                      <p class="mt-1 text-sm text-gray-500">
                                                        Add as many records as you like and attach any photos you've taken.
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="bg-white sm:rounded-b-lg sm:rounded-t-lg">
                                                  {
                                                      <div class="flex flex-col w-full">
                                                        <div className='popup-margin'>
                                                          <form onSubmit={getEditrecords}>
                                                            <br />
                                                            <label class="block text-sm font-medium text-gray-700" for="birding_session_location_id">
                                                              Species:
                                                              <select onChange={(e) => {
                                                                setNewSpecies(e.target.value)
                                                              }}
                                                                value={newspecies}
                                                                id="country" className="form-select w-full">
                                                                {birds && birds.map((n, index) => {
                                                                  return (
                                                                    <option value={n.id}>{n.name}</option>
                                                                  )
                                                                })}
                                                              </select>

                                                            </label>
                                                            <br />
                                                            <label class="block text-sm font-medium text-gray-700" for="birding_session_location_id">
                                                              Quantity:
                                                              <input class="w-full rounded-md border bg-white py-2 pl-3 pr-12 shadow-sm focus:outline-none focus:ring-1 sm:text-sm border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                                                                type="number"
                                                                value={newquantity}
                                                                onChange={(e) => setNewQuantity(e.target.value)}
                                                              />
                                                            </label>
                                                            <br />

                                                            <label class="block text-sm font-medium text-gray-700" for="birding_session_location_id">
                                                              Picture:
                                                              <br />
                                                              <input class="w-full rounded-md border bg-white py-2 pl-3 pr-12 shadow-sm focus:outline-none focus:ring-1 sm:text-sm border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                                                                type="text"
                                                                value={newimgUrl}
                                                                onChange={(e) => setNewImgUrl(e.target.value)}
                                                              />
                                                            </label>
                                                            <br />
                                                            <button type='submit' className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3" >Edit</button>
                                                          </form>
                                                        </div>

                                                      </div>
                                                  }
                                                </div>
                                              </div>

                                            </div>
                                          </div>
                                    </div>
                                    <div class="border-b border-gray-200 text-sm px-3 text-gray-900 hidden sm:table-cell">
                                    <button className="btn w-20 bg-red-500 hover:border-red-600 text-white" onClick={(e) => { e.stopPropagation(); handleDecline(e, records.newsfeedId); }}>Delete</button>
                                    </div>
                                  </div>


                                </turbo-frame>


                              </div>
                            )
                          }
                          ) : <div></div>
                        }
                      </div>
                    </div>

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

export default Analytics;