import React from 'react';
import './index.css';
import moment from 'moment';


function Message({chat}) {

  function getDateFormat(dt) {
    const date = moment(dt).format('YYYY-MM-DD');
    const time = moment(dt).format('HH:mm')
    return date + ' - ' + time;
  }

  if (chat.status) {
  return chat.status === 'name-changed'
  ? (<div className="my-3"><span className="status-message rounded p-2">{chat.oldName} changed name to {chat.newName}</span></div>)
  : (<div className="my-3"><span className="status-message rounded p-2">{chat.nicName} - {chat.status} the room</span></div>)
  }

  return (
    <div className={`row my-3 p-3 message-chat rounded ${chat.nicName === localStorage.getItem('nicName') ? 'right-sided' : 'left-sided'}`}>
      <div className='text-success text-left fs-5'>{chat.nicName !== localStorage.getItem('nicName') && chat.nicName}</div>
      <div className="text-left fs-6">{chat.message}</div>
      <div className="time-date">{getDateFormat(chat.dateTime)}</div>
    </div>
  )
}

export default Message;