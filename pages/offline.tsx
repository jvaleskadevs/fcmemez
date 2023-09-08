import type { NextPage } from 'next';

const Offline: NextPage = () => {
  return (
    <div className="flex flex-col items-center">
      <p>You are offline. Connect to the Internet and try again.</p>
    </div>
  );
}

export default Offline;
