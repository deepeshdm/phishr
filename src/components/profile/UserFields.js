

const UserFields = ({ Firstname, Lastname, Email, Phone, OnChangeHandler }) => {

    return (
        <>
            <div>
                <label className="text-gray-900 text-sm">Name</label>
                <div className="flex items-center bg-gray-200 hover:bg-gray-300 rounded-md ">
                    <input
                        placeholder="Name"
                        defaultValue={Firstname}
                        type="text"
                        onChange={(e) => OnChangeHandler(e, "firstname")}
                        maxLength={64}
                        className="bg-transparent w-full py-4 text-gray-800 font-medium focus:outline-none pl-4"
                    />
                </div>
            </div>

            <div>
                <label className="text-gray-900 text-sm">Lastname</label>
                <div className="flex items-center bg-gray-200 hover:bg-gray-300 rounded-md ">
                    <input
                        placeholder="Lastname"
                        defaultValue={Lastname}
                        type="text"
                        onChange={(e) => OnChangeHandler(e, "lastname")}
                        maxLength={64}
                        className="bg-transparent w-full py-4 text-gray-800 font-medium focus:outline-none pl-4"
                    />
                </div>
            </div>

            <div>
                <label className="text-gray-900 text-sm ">Registered Email Address</label>
                <div className="flex items-center bg-gray-200 hover:bg-gray-300 rounded-md ">
                    <input
                        readOnly={true}
                        placeholder="Email Address"
                        defaultValue={Email}
                        type="email"
                        onChange={(e) => OnChangeHandler(e, "email")}
                        maxLength={64}
                        className="bg-transparent w-full py-4 text-gray-500 font-medium focus:outline-none pl-4"
                    />
                </div>
            </div>

            <div>
                <label className="text-gray-900 text-sm "> Phone Number (Max Length 12) </label>
                <div className="flex items-center bg-gray-200 hover:bg-gray-300 rounded-md ">
                    <input
                        placeholder="Phone Number"
                        defaultValue={Phone}
                        type="number"
                        onChange={(e) => OnChangeHandler(e, "phone")}
                        maxLength={12}
                        className="bg-transparent w-full py-4 text-gray-800 font-medium focus:outline-none pl-4"
                    />
                </div>
            </div>
        </>
    )
}


export default UserFields;