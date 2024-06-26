import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getAuthStatus, isUserTelegramConnected } from '../store/user-process/selectors';
import DoorSVG from './svg/door';
import LogoSVG from './svg/logo';
import { AuthStatuses } from '../consts';
import { logoutAction } from '../store/api-actions';
import { AppRoutes } from '../routes';
import WarningSVG from './svg/warning';
import useUserFullName from '../hooks/use-user-full-name';
import Loader from './loader';

export default function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const userTelegramConnected = useAppSelector(isUserTelegramConnected);
  const userFullName = useUserFullName();

  const handleLogoutClick = () => {
    if (authStatus === AuthStatuses.Auth) {
      dispatch(logoutAction());
    }
  };

  return (
    <header className="header">
      <div className="header__logo">
        <NavLink to={AppRoutes.Main.FullPath} className="header__logo-link">
          <LogoSVG />
        </NavLink>
      </div>
      <nav className="header__nav nav">
        <ul className="nav__items list-reset">
          <li className="nav__item">
            <NavLink to={AppRoutes.Coworkings.FullPath} className="nav__item-link link">Бронирование</NavLink>
          </li>
          <li className="nav__item">
            <NavLink to={AppRoutes.Calendar.FullPath} className="nav__item-link link">Календарь</NavLink>
          </li>
        </ul>
      </nav>
      <div className="main-controls">
        {/* <button className="main-controls__language-btn language-btn btn-reset">
          <PlanetSVG classNames="language-btn__icon" />
          <span className="language-btn__text">RU</span>
          <SelectArrowSVG classNames="language-btn__arrow" />
        </button> */}

        {authStatus === AuthStatuses.Auth
          ?
          <>
            {userTelegramConnected === false &&
              <WarningSVG classes="main-controls__warning-sign" />}
            <NavLink to={AppRoutes.User.FullPath} className="main-controls__user-acc-btn white-btn">
              {userFullName ?? <Loader alignCenter />}
            </NavLink>
            <button className="main-controls__logout-btn btn-reset" onClick={handleLogoutClick}>
              <DoorSVG />
            </button>
          </>
          :
          <>
            <NavLink to={AppRoutes.Register.FullPath} className="main-controls__register-btn hollow-btn">Регистрация</NavLink>
            <NavLink to={AppRoutes.Login.FullPath} className="main-controls__login-btn white-btn">Вход</NavLink>
          </>}
      </div>
    </header>
  );
}
