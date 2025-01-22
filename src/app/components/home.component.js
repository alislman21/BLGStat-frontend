import 
{
Heart,
MessageSquare,
Eye,
Forward,
Repeat2,
Bookmark,
MessageSquareQuote 
} from 'lucide-react';


export function Post({post}) {
  

    return (
        <div className="m-3 p-2 w-1/2 h-fit rounded-lg shadow-2xl bg-white border ">
            <span className="w-full">
                <p className="text-gray-700 text-2xl mb-4">Last Update</p>
            </span>
            <div className="flex relative justify-around items-center gap-2">
                <div className="w-1/2 flex flex-col items-center">
                    { post && post?.postId && <img className="h-1/2 w-fit rounded-2xl border-2 border-red-400 p-2 object-cover"
                         src={`http://localhost:5000/profile_pics/${post.platformAccountId}-${post.postId}.jpg`} alt="Post"/>}
                    <div className="flex gap-6 justify-center text-black-600 mt-4">
                        <span className="flex flex-col items-center hover:text-red-600 transition">
                            <Heart className="w-6 h-6"/>
                            <p className="text-sm mt-1">
                                {post?.likes ?? 0}
                                </p>
                        </span>
                        <span className="flex flex-col items-center hover:text-red-600 transition">
                            <MessageSquare className="w-6 h-6"/>
                            <p className="text-sm mt-1">
                                {post?.comments ?? 0}
                            </p>
                        </span>
                        <span className="flex flex-col items-center hover:text-red-600 transition">
                            <Forward className="w-6 h-6"/>
                            <p className="text-sm mt-1">
                                {post?.shares ?? 0}
                            </p>
                        </span>
                        <span className="flex flex-col items-center hover:text-red-600 transition">
                            <Eye className="w-6 h-6"/>
                            <p className="text-sm mt-1">
                                {post?.views ?? 0}
                            </p>
                        </span>
                    </div>
                </div>
                <div className="w-1/2 bg-gray-100 h-40 rounded-2xl m-2 p-2 overflow-hidden top-4">
                    <p className="text-gray-900 text-base leading-relaxed">
                        {post?.content ?? ''}
                    </p>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export function Tweet({ tweet }) {
    return (
        <div className="m-3 p-2 w-3/4 h-fit rounded-lg shadow-2xl bg-white border ">
            <span className="w-full">
                <p className="text-gray-700 text-2xl mb-4">Last Update</p>
            </span>
            <div>
                    <p className="text-gray-900 text-base leading-relaxed bg-slate-100 p-4 rounded-lg">
                        {tweet?.text ?? ''}
                    </p>
                    <div className="flex gap-6 justify-center text-black-600 mt-4">
                        <span className="flex flex-col items-center hover:text-red-600 transition">
                            <Heart className="w-6 h-6"/>
                            <p className="text-sm mt-1">
                                {tweet?.likes ?? 0}
                            </p>
                        </span>
                        <span className="flex flex-col items-center hover:text-red-600 transition">
                            <MessageSquare className="w-6 h-6"/>
                            <p className="text-sm mt-1">
                                {tweet?.replies ?? 0}
                            </p>
                        </span>
                        <span className="flex flex-col items-center hover:text-red-600 transition">
                            <Repeat2 className="w-6 h-6"/>
                            <p className="text-sm mt-1">
                                {tweet?.retweets ?? 0}
                            </p>
                        </span>
                        <span className="flex flex-col items-center hover:text-red-600 transition">
                            <Bookmark className="w-6 h-6"/>
                            <p className="text-sm mt-1">
                                {tweet?.bookmarks ?? 0}
                            </p>
                        </span>
                        <span className="flex flex-col items-center hover:text-red-600 transition">
                            <MessageSquareQuote className="w-6 h-6"/>
                            <p className="text-sm mt-1">
                                {tweet?.quotes ?? 0}
                            </p>
                        </span>
                        <span className="flex flex-col items-center hover:text-red-600 transition">
                            <Eye className="w-6 h-6"/>
                            <p className="text-sm mt-1">
                                {tweet?.imppressions ?? 0}
                            </p>
                        </span>
                        
                    
                    </div>
            </div>
        </div>
    )
}


export function UserInfo({id, account}) {


    return (
        <div className="m-6 p-4 w-1/2 rounded-lg shadow-2xl bg-white border">
            <div className="flex flex-col items-center gap-1">
                <img className="h-24 w-24 rounded-full object-cover mb-4 border-4 border-gray-200 shadow-lg"
                     src={`http://localhost:5000/profile_pics/${account.profile}`} alt="Profile"/>

                <span className="w-full flex flex-col items-center bg-red-500 p-2 rounded-xl">
                    <p className="text-white text-2xl">{account.fullname}</p>
                </span>

                <span className="w-full">
                    <p className=" text-lg font-semibold text-red-500">following:</p>
                    <p className="text-white text-xl  bg-red-500 p-2 rounded-xl w-full text-center">{account.followings}</p>
                </span>
                <span className="w-full">
                    <p className=" text-lg font-semibold text-red-500">followers:</p>
                    <p className="text-white text-xl  bg-red-500 p-2 rounded-xl w-full text-center">{account.followers}</p>
                </span>

                <span className="w-full flex flex-col items-center border-2 border-red-400 p-2 rounded-xl">
                    <p className="text-gray-400 text-lg font-semibold">Bio</p>
                    <p className="text-gray-700 text-xl">{account.bio}</p>
                </span>
            </div>
        </div>
    );
}


