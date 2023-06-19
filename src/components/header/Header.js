import React from 'react';
import './Header.css';
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom';

export function Header({ LoggedInUser }) {

  return (
    <>
      <div className="bg-black w-full h-12">
        <span className="text-white float-left font-extrabold text-2xl ml-7 sm:ml-12 mt-2 text-roboto">
          <Link to="/">PHISHr 🎣</Link>
        </span>

        <span className='text-gray-300 hover:text-white text-lg max-sm:hidden mr-14 mt-2 float-right'>
          <Link to="/profile">
            {LoggedInUser}
          </Link>
        </span>

        {LoggedInUser ?
          <span className="text-white float-right ml-5 sm:ml-14 mr-2 mt-3">
            <Link to="/profile" className="text-gray-300 hover:text-white">
              <FaUserCircle className='w-6 h-6 max-[450px]:w-7 max-[450px]:h-7' />
            </Link>
          </span>
          : null}

        {LoggedInUser == null ?
          <span className="text-white float-right ml-5 sm:ml-14 sm:mt-3 mt-4 sm:text-base text-sm text-roboto link-underline link-underline-black mr-6 sm:mr-14">
            <Link to="/login">LOGIN</Link>
          </span>
          : null}

        <span className="text-white float-right ml-5 sm:ml-14 sm:mt-3 mt-4 sm:text-base text-sm text-roboto link-underline link-underline-black">
          <a href="https://phishr-api.up.railway.app/docs" target="_blank" rel="noreferrer">
            API
          </a>
        </span>

        <span className="text-white float-right ml-5 sm:ml-14 sm:mt-3 mt-4 sm:text-base text-sm text-roboto link-underline link-underline-black">
          <Link to="/reported_urls">
            DATABASE
          </Link>
        </span>

        <span className="text-white float-right ml-5 sm:ml-14 sm:mt-3 mt-4 sm:text-base text-sm text-roboto link-underline link-underline-black">
          <Link to="/typesquat_url_generator">
            TYPOSQUATTING
          </Link>
        </span>

        <span className="text-white float-right ml-5 sm:ml-14 sm:mt-3 mt-4 sm:text-base text-sm text-roboto link-underline link-underline-black">
          <Link to="/report">
            REPORT URL
          </Link>
        </span>

        <span className="text-white float-right ml-5 sm:ml-14 sm:mt-3 mt-4 sm:text-base text-sm text-roboto link-underline link-underline-black max-sm:hidden">
          <Link to="/">HOME</Link>
        </span>
      </div>
    </>
  );
}
