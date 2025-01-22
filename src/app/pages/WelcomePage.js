import {Link} from 'react-router-dom';
import AreaChartComponent from '../components/AreaChart';


export default function WelcomePage() {
    return (
        <div className="font-sans flex items-center flex-col w-full h-full">
            <header className="w-full flex justify-between items-center bg-gray-100">
                <div className="w-1/4 flex items-center m-3">
                    <img className="w-9" src="/assets/icons/icons8-statistics-50.png" alt="main logo"/>
                    <h3 className="m-1 text-2xl font-bold text-red-600">BLGStat</h3>
                </div>

                <div className="m-3">
                    <Link className="text-center bg-red-600 px-5 py-2 text-white rounded-3xl" to="login">Login</Link>
                </div>
            </header>

            <main>
                <div className="m-5 w-3/4 flex justify-around items-center">
                    <div className="mt-5 w-1/2 flex items-center">
                        <AreaChartComponent/>
                    </div>
                    <div
                        className={`m-4 w-1/2`}
                    >
                        <h1 className="mb-6 text-6xl text-red-500">Welcome to the Growth World</h1>

                        <h3 className="mt-4 text-xl">
                            BLGStat allows you to manage, organize, and track the performance of your social media
                            accounts.
                            Register with us to keep your accounts well-organized and easily monitored.
                        </h3>
                        <div className="mt-5">

                            <Link className="text-center bg-red-600 px-4 py-2 text-white rounded-3xl
                        hover:bg-white hover:text-red-600 hover:border-red-600 transition duration-500"
                                  to="/signup">
                                Signup
                            </Link>

                            <Link className="m-1 text-center bg-red-600 px-4 py-2 text-white rounded-3xl
                      hover:bg-white hover:text-red-600 hover:border-red-600 transition duration-500"
                                  to="/login">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <footer className='fixed bottom-0 w-full h-50 flex justify-between items-center mt-4 bg-gray-100'>
                <div className='m-10'>
                    All Rights reserved to BLGStat company
                </div>
                <div className='flex flex-col m-10'>
                    <p>Follow us:</p>
                    <a href='facebook.com'>facebook</a>
                    <a href='instagram.com'>instagram</a>
                </div>
            </footer>
        </div>
    );
}
