import {NavBarItem, NavBarSection} from "./NavBarSection.component.js";

// the icons of the bar from lucide-react
import {BadgeAlert, BarChart3, Settings, UserCircle} from 'lucide-react';
import {NavLink} from "react-router-dom";
import {useState} from "react";

function NavBar() {
    const [activeTab, setActiveTab] = useState()

    return (
        <NavBarSection>
            <NavLink to="/home" onClick={() => setActiveTab('home')}>
                <NavBarItem icon={<BarChart3 size={20}/>} text="Dashboard" active={activeTab === "home"}/>
            </NavLink>
            <NavLink to="/report" onClick={() => setActiveTab('report')}>
                <NavBarItem icon={<BadgeAlert size={20}/>} text="Monthly Report" active={activeTab === "report"}/>
            </NavLink>
            <NavLink to="/profile" onClick={() => setActiveTab('profile')}>
                <NavBarItem icon={<UserCircle size={20}/>} text="Profile" active={activeTab === "profile"}/>
            </NavLink>
            <NavLink to="/settings" onClick={() => setActiveTab('settings')}>
                <NavBarItem icon={<Settings size={20}/>} text="Settings" active={activeTab === "settings"}/>
            </NavLink>
        </NavBarSection>
    )
}

export default NavBar;