import {ChevronFirst, ChevronLast} from 'lucide-react';
import {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const SidebarContext = createContext();

export function NavBarSection({children}) {
    const [expanded, setExpanded] = useState(true);
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                const res = await axios.get('http://localhost:5000/api/v1/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const user = res.data.data.user
                setUser(user)
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchData().then();
    }, []);

    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-gray-200 border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <div className='flex'>
                        <img
                            src="/assets/icons/icons8-statistics-50.png"
                            alt=""
                            className={`overflow-hidden transition-all ${
                                expanded ? 'w-9' : 'w-0'
                            }`}
                        />
                        <h3
                            className={`overflow-hidden transition-all ${
                                expanded ? 'm-1 mr-5 text-xl font-bold text-red-600' : 'hidden'
                            } `}
                        >
                            BLGStat
                        </h3>
                    </div>

                    <button className={`p-1.5 rounded-lg bg-white ${
                        expanded ? 'bg-inherit' : 'rounded-lg bg-slate-200'
                    }`}
                            onClick={() => setExpanded((prev) => !prev)}
                    >
                        {expanded ? <ChevronFirst/> : <ChevronLast/>}
                    </button>
                </div>
                <SidebarContext.Provider value={{expanded}}>
                    <ul className="flex-1 px-3 space-y-2">
                        {children}
                    </ul>
                </SidebarContext.Provider>

                <div className='border-t flex p-3 justify-between items-center'>
                    <h4 className={`overflow-hidden transition-all ${
                        expanded ? 'font-semibold text-red-600 text-2xl' : 'hidden'}`}>{user?.username}</h4>
                    <Link 
                        to='/logout'
                        className='bg-red-600 text-white p-1 rounded-lg'
                    >
                        Logout
                    </Link>
                </div>
            </nav>
        </aside>
    )
}


export function NavBarItem({icon, text, active}) {
    const {expanded} = useContext(SidebarContext);
    return (
        <li className={`
            relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer
            transition-color group
            ${
            active ? 'bg-red-500 text-white ' : '  hover:bg-red-300  transition duration-300'
        }
             `}
        >
            {icon}
            <span className={`overflow-hidden transition-all ${
                expanded ? ' w-52 ml-3' : 'hidden'}`}
            >
                {text}
            </span>
            {!expanded && (
                <di
                    className={`
                    absolute left-full rounded-md px-2 py-1 ml-6
                    bg-red-200 text-red-600 text-sm
                    invisible opacity-20 -translate-x-3 transition-all
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                        `}
                >
                    {text}
                </di>
            )}
        </li>
    )
}
