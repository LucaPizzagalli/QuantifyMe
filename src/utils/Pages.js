import React from 'react';
import TodayIcon from '@material-ui/icons/Today';
// import FaceIcon from '@material-ui/icons/Face';
import EventNoteIcon from '@material-ui/icons/EventNote';
import TimerIcon from '@material-ui/icons/Timer';
// import PollOutlinedIcon from '@material-ui/icons/PollOutlined';
// import AssignmentIcon from '@material-ui/icons/Assignment';
import TimelineIcon from '@material-ui/icons/Timeline';
import SubjectIcon from '@material-ui/icons/Subject';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';

const PAGES = {
    SignUp: { to: '/sign-up', label: 'Sign Up', logged: false },
    SignIn: { to: '/sign-in', label: 'Sign In', logged: false },
    ResetPassword: { to: '/reset-password', label: 'Reset Password', logged: false },
    Dashboard: { to: '/dashboard', label: 'Dashboard', logged: true, icon: <DashboardOutlinedIcon /> },
    Metrics: { to: '/metrics', label: 'Metrics', logged: true, icon: <EditOutlinedIcon /> },
    QuantifyDay: { to: '/quantify-day', label: 'Quantify my Day', logged: true, icon: <EventNoteIcon /> },
    Diary: { to: '/diary', label: 'Diary', logged: true, icon: <SubjectIcon /> },
    Stats: { to: '/stats', label: 'Stats', logged: true, icon: <TimelineIcon /> },
    Stimulator: { to: '/stimulator', label: 'Stimulator', logged: true, icon: <TimerIcon /> },
    LifeCalendar: { to: '/life-calendar', label: 'Life Calendar', logged: true, icon: <TodayIcon /> },
    Settings: { to: '/settings', label: 'Settings', logged: true, icon: <SettingsOutlinedIcon /> },
};
export default PAGES;