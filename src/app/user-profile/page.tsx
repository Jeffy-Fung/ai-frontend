import React from "react";
import Image from 'next/image';

const UserProfile = () => {
  return (
    <div className="p-6 max-w-md mx-auto border border-gray-300 rounded-lg bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Profile details</h2>
      <div className="flex items-center mb-4">
        <Image
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt="Profile"
          width={48}
          height={48}
          className="rounded-full mr-4"
        />
        <h3 className="text-lg font-medium">Jaylon Dias</h3>
        <button className="ml-auto bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-500">
          Edit profile
        </button>
      </div>
      <div className="mb-4">
        <h4 className="text-md font-semibold">Email addresses</h4>
        <p>
          example@clerk.dev{" "}
          <span className="text-green-600 font-bold">Primary</span>
        </p>
        <p>example@personal.com</p>
        <p>email@work.io</p>
        <button className="mt-2 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-500">
          Add email address
        </button>
      </div>
      <div className="mb-4">
        <h4 className="text-md font-semibold">Phone number</h4>
        <p>
          +1 (555) 123-4567{" "}
          <span className="text-green-600 font-bold">Primary</span>
        </p>
        <button className="mt-2 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-500">
          Add phone number
        </button>
      </div>
      <div>
        <h4 className="text-md font-semibold">Connected accounts</h4>
        <p>Google • example@email.com</p>
        <button className="mt-2 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-500">
          Connect account
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
