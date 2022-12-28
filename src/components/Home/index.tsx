import React, { useState } from 'react';

import './Home.scss';
import copy from '../../assets/image/copy-svgrepo-com.svg';
import { makeId } from '../../utils';
import { addDoc, collection } from '@firebase/firestore';

import { db } from '../../config/index';

function Home() {
  const [loading, setLoading] = useState(false);
  const [{ url, showModal, shortUrl }, setState] = useState({
    url: '',
    showModal: false,
    shortUrl: '',
  });

  const submitUrl = async (e: { preventDefault: () => void }) => {
    if (loading) return;

    setLoading(true);
    e.preventDefault();
    const expression =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    if (!url.match(regex)) {
      alert('Not url valid');
      setLoading(false);
      return;
    }

    const shortUrl = makeId(5);

    await addDoc(collection(db, 'urls'), { shortUrl, originUrl: url });

    setState((_) => ({ ..._, showModal: true, shortUrl, url: '' }));

    setLoading(false);
  };

  const disableModal = async () => {
    try {
      await navigator.clipboard.writeText(host + shortUrl);
      document.execCommand('Copy');
      alert('Link coppied to Clipboard');
    } catch (err) {
      alert('Failed to copy!');
    }
  };
  const host = window.location.href;

  return (
    <div className='outter_container'>
      <div className='form_holder'>
        <form id='form__submnt' onSubmit={submitUrl}>
          <input
            type='text'
            name='url'
            id='url_'
            className='url_'
            value={url}
            onChange={(e) => {
              setState((_) => ({ ..._, url: e.target.value }));
            }}
            placeholder='Enter or Paste url here'
            required
          />
          <input type='submit' id='sub_go' className='sub_go' value='GO' />
        </form>
      </div>
      {showModal ? (
        <div className='modal_wrapper'>
          <div className='modal_bx'>
            <div className='top__'>
              <button
                onClick={() => setState((_) => ({ ..._, showModal: false }))}
                className='cancel'
              >
                X
              </button>
            </div>
            <div className='content'>
              <p className='cnt'>
                <a target='_blank' href={host + shortUrl} rel='noreferrer'>
                  {host + shortUrl}
                </a>
              </p>
              <button
                className='copy_btn'
                onClick={() => {
                  disableModal();
                }}
              >
                <img src={copy} alt='' className='copy_icn' />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Home;
