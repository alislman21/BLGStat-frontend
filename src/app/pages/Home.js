import NavBar from "../components/NavBar";
import {Post, Tweet, UserInfo} from "../components/home.component.js";
import BarChartComponent from "../components/BarChart.jsx";
import {useEffect, useState} from "react";
import axios from "axios";


function Home() {
    // some data to show the work of the Barchart 
    const data = [
        {
            name: 'Likes',
            Object1: 1222,
            Object2: 222,
        },
        {
            name: 'Comments',
            Object1: 300,
            Object2: 360,
        },
        {
            name: 'Views',
            Object1: 1000,
            Object2: 2000,
        },
    ];

    const [instagramProfile, setInstagramProfile] = useState({
        fullname: '',
        bio: '',
        profile: '',
        followings: 0,
        followers: 0
    })
    const [twitterProfile, setTwitterProfile] = useState({
        profile: '',
        bio: '',
        followings: 0,
        followers: 0
    })
    const [instagramStatistics, setInstagramStatistics] = useState()
    const [twitterStatistics, setTwitterStatistics] = useState()
    const [lastPost, setLastPost] = useState()
    const [lastTweet, setLastTweet] = useState()

    // Get current month and year
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' }); // Full month name
    const year = currentDate.getFullYear();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                const res = await axios.get('http://localhost:5000/api/v1/dashboard/fetch', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const dashboard = res.data.dashboard
                console.log(dashboard);
            
                setInstagramProfile({
                    fullname: dashboard.latestInstagramInfo.full_name,
                    bio: dashboard.latestInstagramInfo.bio,
                    profile: dashboard.latestInstagramInfo.profile_picture,
                    followings: dashboard.latestInstagramInfo.followings,
                    followers: dashboard.latestInstagramInfo.followers
                })

               
                setTwitterProfile({
                    fullname: dashboard.latestTwitterInfo.full_name,
                    bio: dashboard.latestTwitterInfo.bio,
                    profile: dashboard.latestTwitterInfo.profile_picture,
                    followings: dashboard.latestTwitterInfo.followings,
                    followers: dashboard.latestTwitterInfo.followers
                })
               
               
                setInstagramStatistics([
                    {
                        name: 'Likes',
                        Object1: dashboard.instagramStatistics.likes.lastPost,
                        Object2: dashboard.instagramStatistics.likes.previousPost,
                    },
                    {
                        name: 'Comments',
                        Object1: dashboard.instagramStatistics.comments.lastPost,
                        Object2: dashboard.instagramStatistics.comments.previousPost,
                    },
                    {
                        name: 'Views',
                        Object1: dashboard.instagramStatistics.views.lastPost,
                        Object2: dashboard.instagramStatistics.views.previousPost,
                    },
                ])
          
               
                setTwitterStatistics([
                    {
                        name: 'Likes',
                        Object1: dashboard.twitterStatistics.likes.lastTweet,
                        Object2: dashboard.twitterStatistics.likes.previousTweet,
                    },
                    {
                        name: 'Comments',
                        Object1: dashboard.twitterStatistics.replies.lastTweet,
                        Object2: dashboard.twitterStatistics.replies.previousTweet,
                    },
                    {
                        name: 'Retweets',
                        Object1: dashboard.twitterStatistics.retweets.lastTweet,
                        Object2: dashboard.twitterStatistics.retweets.previousTweet,
                    },
                    {
                        name: 'Bookmarks',
                        Object1: dashboard.twitterStatistics.bookmarks.lastTweet,
                        Object2: dashboard.twitterStatistics.bookmarks.previousTweet,
                    },
                    {
                        name: 'Quotes',
                        Object1: dashboard.twitterStatistics.quotes.lastTweet,
                        Object2: dashboard.twitterStatistics.quotes.previousTweet,
                    },
                    {
                        name: 'Views',
                        Object1: dashboard.twitterStatistics.impressions.lastTweet,
                        Object2: dashboard.twitterStatistics.impressions.previousTweet,
                    }
                ])
                console.log(dashboard.lastTweet);
                
                setLastPost(dashboard.lastPost)
                setLastTweet(dashboard.lastTweet)
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchData().then();
    }, []);

    return (
        <div className="flex font-sans ">
            <aside className="z-10">
                <NavBar/>
            </aside>

            <div className="ml-3 flex-grow overflow-y-scroll h-screen">
                <div className="w-full  min-h-fit">
                    <p className="text-red-600 text-2xl p-2 m-1 mt-5 bg-gray-100 rounded-md">Instagram Section</p>

                    <div className="w-full min-h-fit flex justify-stretch">
                        <Post
                            id='instagram'
                            post={lastPost}
                        />
                        <UserInfo
                            id='instagram'
                            account={instagramProfile}
                        />
                    </div>

                    <p className="text-red-600 text-2xl p-2 m-1 mt-5 bg-gray-100 rounded-md">Twitter Section</p>
                    <div className="w-full min-h-fit flex justify-stretch">
                        <Tweet 
                         tweet={lastTweet}
                        />

                        <UserInfo
                            id='twitter'
                            account={twitterProfile}
                        />
                    </div>


                    <div className="w-full flex items-center justify-center gap-4 mt-8 ml-4">
                        <div className="p-4 rounded-3xl shadow-2xl w-1/2">
                            <p className="text-2xl p-1 text-slate-400">
                                Instagram Post Statistics for {month} {year}
                            </p>
                            <BarChartComponent data={instagramStatistics}/>
                        </div>
                        <div className="p-4 rounded-3xl shadow-2xl w-1/2">
                            <p className="text-2xl p-1 text-slate-400">
                                Twitter Post Statistics for {month} {year}
                            </p>
                            <BarChartComponent data={twitterStatistics}/>
                        </div>


                    </div>


                </div>
            </div>

        </div>
    );
}

export default Home;
