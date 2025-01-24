import {useEffect, useState} from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { ReportAreaChart, ReportSection } from "../components/report.component";

export default function Report() {
    const [lastInstagramReport, setLastInstagramReport] = useState()
    const [beforeLastInstagramReport,setBeforeLastInstagramReport] = useState()
    const [lastTwitterReport, setLastTwitterReport] = useState()
    const [beforeLastTwitterReport,setBeforeLastTwitterReport] = useState()

    const fetchReport = async () => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');

        try {

            const response = await axios.get("http://localhost:5000/api/v1/report/fetch",{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'userId': id,
                }
            });

            if(response && response.data){
                console.log(response.data);
            }
        }catch(err) {
            console.log("error fetching report",err);
        }
    }

    useEffect(() => {
        const data = async () => {
            try {
                const token = localStorage.getItem('token');

                const res = await axios.get('http://localhost:5000/api/v1/report', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                setLastInstagramReport(res.data.report.lastInstagramReport)
                setLastTwitterReport(res.data.report.lastTwitterReport)
                setBeforeLastInstagramReport(res.data.report.beforeLastInstagramReport)
                setBeforeLastTwitterReport(res.data.report.beforeLastTwitterReport)
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        data().then();

    }, []);

    return(
        <div className="flex font-sans">
             <aside className="z-10">
                <NavBar />
            </aside>
            <div className="w-full m-5 flex-grow overflow-y-scroll h-screen">
                <div
                    className="flex flex-row bg-amber-400 p-2 text-white rounded-3xl hover:bg-amber-600 hover:pointer transition hover:duration-200 w-48">
                    <button
                        type="button"
                        className="w-full"
                        onClick={fetchReport}
                    >
                        Fetch New Report
                    </button>
                </div>
                <p className="text-2xl text-red-600 m-2 mt-5 text-center">Instagram Report</p>
                {
                    lastInstagramReport ?
                    <div className="flex justify-center items-center gap-5 w-full">
                        <ReportAreaChart Report={lastInstagramReport} prevReport={beforeLastInstagramReport ? beforeLastInstagramReport : 0} />
                        <ReportSection
                            lastReport={lastInstagramReport}
                            prevReport={beforeLastInstagramReport}
                        />
                    </div>
                        :
                    <div  className="flex justify-center items-center gap-5 w-full ">
                        <ReportAreaChart Report={0} prevReport={0} />
                            <ReportSection
                                lastReport={0}
                                prevReport={0}
                            />
                    </div>
                }

                <p className="text-2xl text-red-600  mt-16 text-center">Twitter Report</p>
                {
                    lastTwitterReport ?
                    <div className="flex justify-center items-center gap-5 w-full">
                        <ReportAreaChart Report={lastTwitterReport} prevReport={beforeLastTwitterReport} />
                        <ReportSection
                            lastReport={lastTwitterReport}
                            prevReport={beforeLastTwitterReport}
                        />
                    </div>
                        :
                    <div className="flex x justify-center items-center gap-5 w-full">
                        <ReportAreaChart Report={lastTwitterReport} prevReport={beforeLastTwitterReport} />
                        <ReportSection
                            lastReport={0}
                            prevReport={0}
                        />
                    </div>
                }
            </div>
        </div>
    )
}