import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { DataGrid } from '@mui/x-data-grid';
import { Timestamp } from 'firebase/firestore';
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import { getAllReportedUrls } from '../../db/db_utils';

function DatabaseDisplay() {
    // Check the cookies to see if already loggedIn
    const savedEmail = Cookies.get('email');
    const savedPassword = Cookies.get('password');
    const [reportedUrls, setReportedUrls] = useState([]);

    useEffect(async () => {
        try {
            const urls = await getAllReportedUrls();
            setReportedUrls(urls);
            console.log(urls);
        } catch (error) {
            console.log('Error fetching reported URLs:', error);
        }
    }, []);


    const columns = [
        { field: 'url', headerName: 'URL 🔽', width: 250 },
        { field: 'category', headerName: 'Category ', width: 100 },
        { field: 'reportedBy', headerName: 'Reported By 👤', width: 250 },
        { field: 'reportedOn', headerName: 'Reported On 🕛', width: 200 },
        { field: 'additional', headerName: 'Details', width: 520 },
    ];

    const rows = reportedUrls.map((url, index) => ({
        id: index + 1,
        url: url.Url,
        category: url.Category,
        reportedBy: url.ReportedBy,
        reportedOn: url.ReportedOn instanceof Timestamp ? url.ReportedOn.toDate().toLocaleString() : '',
        additional: url.Additional
    }));


    return (
        <>
            <Header LoggedInUser={savedEmail} />
            <div className="bg-white flex flex-col items-center">

                <div>
                    <h2 className="text-3xl text-slate-600 font-bold font-sans mt-12 text-center">
                        All Reported URLs ⚠️🚨
                    </h2>
                    <p className="mt-3 text-sm opacity-70 text-center mx-[24%]">
                        Below is the view of all the URLs reported by our users and also those which were classified as malicious by our classification system.
                        Help us maintain a secure environment by contributing to this database.
                    </p>
                </div>

            </div>


            <div className="mt-5 mx-[5%] mb-5">
                <DataGrid
                    columns={columns}
                    rows={rows}
                    pageSize={50}
                />
            </div>

            <Footer />
        </>
    );
}

export default DatabaseDisplay;


