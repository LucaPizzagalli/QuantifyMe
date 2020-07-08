import React from 'react';
import TodayIcon from '@material-ui/icons/Today';
import FaceIcon from '@material-ui/icons/Face';
import EventNoteIcon from '@material-ui/icons/EventNote';
import TimerIcon from '@material-ui/icons/Timer';
// import PollOutlinedIcon from '@material-ui/icons/PollOutlined';
// import AssignmentIcon from '@material-ui/icons/Assignment';
import TimelineIcon from '@material-ui/icons/Timeline';
import SubjectIcon from '@material-ui/icons/Subject';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const PAGES = {
    SignUp: { to: '/sign-up', label: 'Sign Up', logged: false },
    SignIn: { to: '/sign-in', label: 'Sign In', logged: false },
    ResetPassword: { to: '/reset-password', label: 'Reset Password', logged: false },
    Account: { to: '/account', label: 'Account', logged: true, icon: <FaceIcon /> },
    Metrics: { to: '/metrics', label: 'Metrics', logged: true, icon: <EditOutlinedIcon /> },
    QuantifyDay: { to: '/quantify-day', label: 'Quantify my Day', logged: true, icon: <EventNoteIcon /> },
    Diary: { to: '/diary', label: 'Diary', logged: true, icon: <SubjectIcon /> },
    Stats: { to: '/stats', label: 'Stats', logged: true, icon: <TimelineIcon /> },
    Stimulator: { to: '/stimulator', label: 'Stimulator', logged: true, icon: <TimerIcon /> },
    LifeCalendar: { to: '/life-calendar', label: 'LifeCalendar', logged: true, icon: <TodayIcon /> },
};
export default PAGES;