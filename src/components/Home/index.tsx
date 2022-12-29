import React, { useState } from 'react';

import './Home.scss';
import { makeId, toast } from '../../utils';
import { addDoc, collection } from '@firebase/firestore';

import { db } from '../../config/index';

function Home() {
  const [loading, setLoading] = useState(false);
  const [{ url, showModal, shortUrl }, setState] = useState({
    url: '',
    showModal: false,
    shortUrl: '',
  });

  const host = window.location.href;

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

    await addDoc(collection(db, 'urls'), {
      shortUrl,
      originUrl: url?.startsWith('http') ? url : `https://${url}`,
    });

    setState((_) => ({ ..._, showModal: true, shortUrl, url: '' }));

    setLoading(false);
  };

  const onCopyShortUrl = async () => {
    try {
      await navigator.clipboard.writeText(host + shortUrl);
      document.execCommand('Copy');
      toast.success('Link coppied to Clipboard');
    } catch (err) {
      toast.error('Failed to copy!');
    }
  };

  return (
    <div className='outter_container'>
      <h1>Short Url</h1>
      <div className='form_holder'>
        <form id='form__submnt' onSubmit={submitUrl}>
          <input
            type='text'
            name='url'
            value={url}
            onChange={(e) => {
              setState((_) => ({ ..._, url: e.target.value }));
            }}
            placeholder='Enter or Paste url here'
            required
            className='fancy-input'
          />
          <button className='fancy-button' type='submit'>
            Submit
          </button>
        </form>
      </div>
      {showModal && (
        <div id='myModal' className='modal'>
          <div className='modal-content'>
            <span
              className='close'
              onClick={() => setState((_) => ({ ..._, showModal: false }))}
            >
              &times;
            </span>
            <div>
              <div className='content'>
                <p className='cnt'>
                  <a
                    target='_blank'
                    className='fancy-link'
                    href={host + shortUrl}
                    rel='noreferrer'
                  >
                    {host + shortUrl}
                  </a>
                </p>
                <button className='fancy-button' onClick={onCopyShortUrl}>
                  <svg
                    width={24}
                    height={24}
                    xmlns='http://www.w3.org/2000/svg'
                    fillRule='evenodd'
                    clipRule='evenodd'
                  >
                    <path
                      fill='white'
                      d='M17 7h6v16h-16v-6h-6v-16h16v6zm5 1h-14v14h14v-14zm-6-1v-5h-14v14h5v-9h9z'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
