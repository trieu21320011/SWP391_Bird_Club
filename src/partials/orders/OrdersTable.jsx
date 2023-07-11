import React, { useState, useEffect } from 'react';
import Orders from './OrdersTableItem';

import Image01 from '../../images/icon-01.svg';
import Image02 from '../../images/icon-02.svg';
import Image03 from '../../images/icon-03.svg';
import axios from 'axios';
import { baseURL } from '../../pages/baseUrl';
import NotFoundImage from '../../images/404-illustration.svg';

function OrdersTable({
  selectedItems
}) {

  const uid = localStorage.getItem("uid")
  const orders = [
    {
      id: '0',
      image: Image01,
      order: '#123567',
      date: '22/01/2021',
      customer: 'Patricia Semklo',
      total: '$129.00',
      status: 'Đang diễn ra',
      items: '1',
      location: '🇨🇳 Shanghai, CN',
      type: 'Subscription',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: '1',
      image: Image01,
      order: '#779912',
      date: '22/01/2021',
      customer: 'Dominik Lamakani',
      total: '$89.00',
      status: 'Đã kết thúc',
      items: '2',
      location: '🇲🇽 Mexico City, MX',
      type: 'Subscription',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: '2',
      image: Image02,
      order: '#889924',
      date: '22/01/2021',
      customer: 'Ivan Mesaros',
      total: '$89.00',
      status: 'Đã kết thúc',
      items: '2',
      location: '🇮🇹 Milan, IT',
      type: 'One-time',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: '3',
      image: Image01,
      order: '#897726',
      date: '22/01/2021',
      customer: 'Maria Martinez',
      total: '$59.00',
      status: 'Chưa bắt đầu',
      items: '1',
      location: '🇮🇹 Bologna, IT',
      type: 'One-time',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: '4',
      image: Image03,
      order: '#123567',
      date: '22/01/2021',
      customer: 'Vicky Jung',
      total: '$39.00',
      status: 'Đang diễn ra',
      items: '1',
      location: '🇬🇧 London, UK',
      type: 'Subscription',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: '5',
      image: Image01,
      order: '#896644',
      date: '21/01/2021',
      customer: 'Tisho Yanchev',
      total: '$59.00',
      status: 'Đã kết thúc',
      items: '1',
      location: '🇫🇷 Paris, FR',
      type: 'One-time',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: '6',
      image: Image03,
      order: '#136988',
      date: '21/01/2021',
      customer: 'James Cameron',
      total: '$89.00',
      status: 'Đã kết thúc',
      items: '1',
      location: '🇫🇷 Marseille, FR',
      type: 'Subscription',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: '7',
      image: Image03,
      order: '#442206',
      date: '21/01/2021',
      customer: 'Haruki Masuno',
      total: '$129.00',
      status: 'Đã kết thúc',
      items: '2',
      location: '🇺🇸 New York, USA',
      type: 'Subscription',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: '8',
      image: Image02,
      order: '#764321',
      date: '21/01/2021',
      customer: 'Joe Huang',
      total: '$89.00',
      status: 'Chưa bắt đầu',
      items: '2',
      location: '🇨🇳 Shanghai, CN',
      type: 'One-time',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: '9',
      image: Image01,
      order: '#908764',
      date: '21/01/2021',
      customer: 'Carolyn McNeail',
      total: '$59.00',
      status: 'Đã hủy',
      items: '1',
      location: '🇬🇧 Sheffield, UK',
      type: 'Subscription',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  ];
  const [event, setEvents] = useState([])
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);
  const getData = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseURL + '/activities/by-owner?ownerId=' + uid,
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data);
        setEvents(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    setList(orders);
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map(li => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  useEffect(() => {
    selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  if (event === null) return null;
  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">All Event <span className="text-slate-400 font-medium">{event.length}</span></h2>
      </header>
      <div>

        {/* Table */}
        <div className="overflow-x-auto">
          {
            event.length > 0 ? (
              <table className="table-auto w-full divide-y divide-slate-200">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-500 bg-slate-50 border-t border-slate-200">
                  <tr>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Start date</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">End date</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Type</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold">Peding Request</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Location</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Approve pending quest</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <span className="sr-only">Menu</span>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
            
                {event.map(e => {
                  return (
                <Orders
                  id={e.id}
                  image={e.background}
                  order={e.name}
                  date={e.startTime}
                  edate={e.endTime}
                  status={e.status}
                  noRequest={e.requestCount}
                  location={e.location}
                  type={e.activityType}
                  description={e.description}
                  handleClick={handleClick}
                />
                )
                })
              }
              </table>
            ) : (

              <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                <div className="max-w-2xl m-auto mt-16">

                  <div className="text-center px-4">
                    <div className="inline-flex mb-8">
                      <img src={NotFoundImage} width="176" height="176" alt="404 illustration" />
                    </div>
                    <div className="mb-6">No event left. Let's create one</div>
                  </div>

                </div>

              </div>

            )

          }

        </div>
      </div>
    </div>
  );
}

export default OrdersTable;
