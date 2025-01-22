import NavBar from "../components/NavBar";
import ProfileForm from "../components/profile.component";


function Profile() {
    return (
        <div className="flex">
            <aside className=" mr-5 max-w-1/4">
                <NavBar/>
            </aside>

            <div className="flex-1 flex flex-row mt-10  justify-around items-start min-w-3/4">
                <div className="w-full max-w-xl mx-auto">
                    <ProfileForm/>
                </div>
            </div>
        </div>
    )
}

export default Profile;