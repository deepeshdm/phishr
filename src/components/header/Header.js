
import "./Header.css"
import { Link } from "react-router-dom"

export function Header(){

    return(
        <>
        <div className="bg-black w-full h-12"> 

        <span className="text-white float-left font-extrabold text-2xl ml-7 sm:ml-12 mt-2 text-roboto "> 
        <Link to="/"> PHISHr 🎣 </Link> </span>

        <span className="text-white float-right ml-5 sm:ml-14 sm:mt-3 mt-4 sm:text-base text-sm text-roboto link-underline link-underline-black mr-6 sm:mr-14"> 
        <a href="https://github.com/deepeshdm/Phishing-Attack-Domain-Detection" target="_blank" rel="noreferrer"> PROJECT </a> </span>

        <span className="text-white float-right ml-5 sm:ml-14 sm:mt-3 mt-4 sm:text-base text-sm text-roboto link-underline link-underline-black"> 
        <a href="https://phishr-api.up.railway.app/docs" target="_blank" rel="noreferrer"> API </a> </span>
        
        <span className="text-white float-right ml-5 sm:ml-14 sm:mt-3 mt-4 sm:text-base text-sm text-roboto link-underline link-underline-black max-sm:hidden">  
        <Link to="/"> HOME </Link>
        </span>

        </div>
        </>
    )

}

