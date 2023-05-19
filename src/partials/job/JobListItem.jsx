import React from 'react';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';
import Toast from '../../components/Toast';
import { useState } from 'react';
import Swal from 'sweetalert2';

function JobListItem(props) {
  const setSuccess = () => {
  Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Approve cho request này',
      showConfirmButton: false,
      timer: 1100
    })
  }
  return (
    <div
      className={`shadow-lg rounded-sm border px-5 py-4 ${props.type === 'Featured' ? 'bg-amber-50 border-amber-300' : 'bg-white border-slate-200'}`}
    >
      <div className="md:flex justify-between items-center space-y-4 md:space-y-0 space-x-2">
        {/* Left side */}
        <div className="flex items-start space-x-3 md:space-x-4">
          <div className="w-9 h-9 shrink-0 mt-1">
            <img className="w-9 h-9 rounded-full" src={props.image} width="36" height="36" alt={props.company} />
          </div>
          <div>
            <Link className="inline-flex font-semibold text-slate-800" to={props.link}>
              {props.role}
            </Link>
            <div className="text-sm">{props.details}</div>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center space-x-4 pl-10 md:pl-0">
          <div className="text-sm text-slate-500 italic whitespace-nowrap">{props.date}</div>
          <div className="flex flex-wrap items-center -m-1.5">
            <div className="m-1.5">
              {/* Start */}
              <button className="btn border-slate-200 hover:border-slate-300">
                <VisibilityIcon/>
              </button>
              {/* End */}
            </div>
            <div className="m-1.5">
              {/* Start */}
              <button className="btn border-slate-200 hover:border-slate-300" onClick={(e) => { setSuccess(true); }}>
                <svg className="w-4 h-4 fill-current text-indigo-500 shrink-0" viewBox="0 0 16 16">
                  <path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" />
                </svg>
              </button>
              {/* End */}
            </div>
            <div className="m-1.5">
              {/* Start */}
              <button className="btn border-slate-200 hover:border-slate-300">
                <CancelIcon color='error'/>
              </button>
              {/* End */}
            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
}

export default JobListItem;