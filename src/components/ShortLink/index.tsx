import { collection, getDocs } from '@firebase/firestore';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { db } from '../../config';

function Link() {
  const { shorturl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const noteSnapshot = await getDocs(collection(db, 'urls'));
      const notesList = noteSnapshot.docs.map((doc) => doc.data());
      const shortUrlObj = notesList?.find((it) => it.shortUrl === shorturl);

      if (shortUrlObj?.originUrl) {
        window.location.replace(shortUrlObj?.originUrl);
      } else {
        navigate('/');
      }
    })();
  }, []);

  return (
    <div>
      <h2>Redirecting...</h2>
    </div>
  );
}

export default Link;
