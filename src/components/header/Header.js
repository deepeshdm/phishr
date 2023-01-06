
import "./Header.css"
import { Link } from "react-router-dom"

export function Header(){

    return(
        <>
        <div className="bg-black w-full h-12"> 
        <span className="text-white float-left font-extrabold text-2xl ml-14 mt-2 text-roboto"> <Link to="/"> PHISHr 🎣 </Link> </span>
        <span className="text-white float-right ml-14 mt-3 mr-32 text-md text-roboto link-underline link-underline-black"> 
        <a href="https://github.com/deepeshdm/Phishing-Attack-Domain-Detection" target="_blank" rel="noreferrer"> PROJECT </a> </span>
        <span className="text-white float-right ml-14 mt-3 text-md text-roboto link-underline link-underline-black"> 
        <a href="https://phishr-api.up.railway.app/docs" target="_blank" rel="noreferrer"> API </a> </span>
        <span className="text-white float-right ml-14 mt-3 text-md text-roboto link-underline link-underline-black">  
        <Link to="/"> HOME </Link>
        </span>
        </div>
        </>
    )

}


