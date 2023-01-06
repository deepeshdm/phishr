
import "./UrlFeatures.css"

export function UrlFeatures(){

    return(
        <>
       <div className="flex flex-row absolute bottom-14 gap-x-10 ml-36 text-roboto">

       <div className=" bg-white w-96 px-8 py-4 rounded-md opacity-95">
            <p className="font-bold text-gray-800 text-xl text-center"> Length Features </p>
            <p className="text-center text-gray-800 text-sm mt-2"> The length of the URL, hostname, path, and top-level domain could potentially be indicators of malicious activity. 
                For example, a URL with a very long hostname or path could be more suspicious than a shorter one.
            </p>
        </div>

        <div className=" bg-white w-96 px-8 py-4 rounded-md opacity-95">
            <p className="font-bold text-gray-800 text-xl text-center"> Count Features </p>
            <p className="text-center text-sm mt-2 text-gray-800">
            The number of letters, digits, special characters, and directories in a URL could also be useful indicators. For example, 
            a URL with a high number of special characters might be more suspicious than one with fewer special characters. Eg- www.example.com/page@#$%^&*().html
            </p>
        </div>

        <div className=" bg-white w-96 px-8 py-4 rounded-md opacity-95">
            <p className="font-bold text-gray-800 text-xl text-center"> Binary Features </p>
            <p className="text-center text-sm mt-2 text-gray-800"> 
            Whether the URL uses an IP address or URL shortening could be useful indicators as well. For example, a URL that uses an 
        IP address rather than a hostname could be more suspicious,  as could a URL that uses URL shortening. Eg- http://127.0.0.1/path/to/page.html
            </p>
        </div>

       </div>
        </>
    )

}
