import {useEffect, useState} from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from "recharts";

export function ReportSection({lastReport, prevReport}) {

    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' }); // Full month name

    const [percentages, setPercentages] = useState({
        likesPercentage: 0,
        commentsPercentage: 0,
        viewsPercentage: 0,
        followersPercentage: 0,
        followingsPercentage: 0,
    })

    const calculatePercentageChange = (previousLikes, currentLikes) => {
        if (previousLikes === 0) return 0; // Avoid division by zero
        const result = ((currentLikes - previousLikes) / previousLikes) * 100;
        return result.toFixed(2);
    };

    useEffect(() => {
        setPercentages({
            likesPercentage: calculatePercentageChange(lastReport ? lastReport.totalLikes : 0, prevReport ? prevReport.totalLikes : 0),
            commentsPercentage: calculatePercentageChange(lastReport ? lastReport.totalComments : 0, prevReport ? prevReport.totalComments : 0),
            viewsPercentage: calculatePercentageChange(lastReport ? lastReport.totalViews : 0, prevReport ? prevReport.totalViews : 0),
            followersPercentage: calculatePercentageChange(lastReport ? lastReport.followers : 0, prevReport ? prevReport.followers : 0),
            followingsPercentage: calculatePercentageChange(lastReport ? lastReport.following : 0, prevReport ? prevReport.following : 0),
        })
    }, [lastReport]);

    return (
        <div
            className="flex flex-col justify-center items-center m-2 p-2 w-1/2 h-auto bg-gray-50 rounded-xl shadow-lg border border-gray-200">
            <p className="mb-10 text-3xl text-red-600 font-bold">
                {lastReport.platform} Report for {month}
            </p>
            <div className="grid grid-cols-2 gap-6 w-full h-fit mb-6">
                 <span className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-300">
                    <p className="text-gray-500 font-semibold">Followers</p>
                    <p className="text-lg text-gray-800">{lastReport.followers}</p>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                        <div className="bg-red-500 h-3 rounded-full"
                             style={{width: `${percentages.followersPercentage}%`}}></div>
                    </div>
                    <p className="text-red-600 text-sm">{percentages.followersPercentage}% from the last month</p>
                </span>

                <span className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-300">
                    <p className="text-gray-500 text-lg font-semibold">Following</p>
                    <p className="text-lg text-gray-800">{lastReport.following}</p>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                        <div className="bg-red-500 h-3 rounded-full" style={{width: `${percentages.followingsPercentage}%`}}></div>
                    </div>
                    <p className="text-red-600 text-sm">{percentages.followingsPercentage}% from the last month</p>
                </span>
            </div>

            <div className="grid grid-cols-3 gap-6 w-full ">
                <span className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-300">
                    <p className="text-gray-500 text-lg font-semibold">Total Likes</p>
                    <p className="text-lg text-gray-800">{lastReport.totalLikes}</p>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                        <div className="bg-red-500 h-3 rounded-full" style={{width: `${percentages.likesPercentage}%`}}></div>
                    </div>
                    <p className="text-red-600 text-sm">{percentages.likesPercentage}% from the last month</p>
                </span>

                <span className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-300">
                    <p className="text-gray-500 text-lg font-semibold">Total Comments</p>
                    <p className="text-lg text-gray-800">{lastReport.totalComments}</p>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                        <div className="bg-red-500 h-3 rounded-full" style={{width: `${percentages.commentsPercentage}%`}}></div>
                    </div>
                    <p className="text-red-600 text-sm">{percentages.commentsPercentage}% from the last month</p>
                </span>

                <span className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-300">
                    <p className="text-gray-500 text-lg font-semibold">Total Views</p>
                    <p className="text-lg text-gray-800">{lastReport.totalViews}</p>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                        <div className="bg-red-500 h-3 rounded-full" style={{width: `${percentages.viewsPercentage}%`}}></div>
                    </div>
                    <p className="text-red-600 text-sm">{percentages.viewsPercentage}% from the last month</p>
                </span>
            </div>
        </div>
    );
}






export function ReportAreaChart({ Report, prevReport }) {
    const [form, setForm] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    useEffect(() => {
        if (Report) {
            const formattedData = [
                {
                    metric: "Likes",
                    current: Report.totalLikes || 0,
                    last: prevReport?.totalLikes || 0,
                },
                {
                    metric: "Comments",
                    current: Report.totalComments || 0,
                    last: prevReport?.totalComments || 0,
                },
                {
                    metric: "Followers",
                    current: Report.followers || 0,
                    last: prevReport?.followers || 0,
                },
                {
                    metric: "Following",
                    current: Report.following || 0,
                    last: prevReport?.following || 0,
                },
            ];
            setForm(formattedData);
            setIsLoading(false); // Data is ready
        }
    }, [Report, prevReport]);

    if (isLoading) {
        return <div>Loading data...</div>; // Show loading message while waiting for data
    }

    return (
        <div className="w-1/2">
            <ResponsiveContainer height={300} width="100%">
                <AreaChart data={form}>
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                        type="monotone"
                        dataKey="current"
                        name="Current Report"
                        stroke="rgba(220, 38, 38)"
                        fill="rgba(220, 38, 38, 0.2)"
                    />
                    <Area
                        type="monotone"
                        dataKey="last"
                        name="Last Report"
                        stroke="rgba(59, 130, 246)"
                        fill="rgba(59, 130, 246, 0.2)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

