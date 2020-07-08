const PAGES = {
    SignUp: { to: '/sign-up', label: 'Sign Up', logged: false },
    SignIn: { to: '/sign-in', label: 'Sign In', logged: false },
    ResetPassword: { to: '/reset-password', label: 'Reset Password', logged: false },
    Account: { to: '/account', label: 'Account', logged: true },
    Metrics: { to: '/metrics', label: 'Metrics', logged: true },
    QuantifyDay: { to: '/quantify-day', label: 'Quantify my Day', logged: true },
    Diary: { to: '/diary', label: 'Diary', logged: true },
    Stats: { to: '/stats', label: 'Stats', logged: true },
    Stimulator: { to: '/stimulator', label: 'Stimulator', logged: true },
    LifeCalendar: { to: '/life-calendar', label: 'LifeCalendar', logged: true },
};
export default PAGES;