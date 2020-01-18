import React, { useEffect, useState } from 'react';

import { Button1 } from './components/Button';

const fetch1 = () =>
  fetch('http://localhost:5000/my-app2-bcfdb/asia-northeast1/helloWorld');

const useAPI1 = () => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      fetch1().then(r => {
        // eslint-disable-next-line no-console
        console.log(r);
      });
    }
    setClicked(false);
  }, [clicked]);

  return { setClicked };
};

const App: React.FC = () => {
  const { setClicked } = useAPI1();

  return (
    <div className="App">
      <Button1 onClkck={() => setClicked(true)} />
    </div>
  );
};

export default App;
