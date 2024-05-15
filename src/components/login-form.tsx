import { ChangeEvent, FormEventHandler, useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks';
import { loginAction } from '../store/api-actions';
import checkEmailValidity from '../shared/check-email-validity';
import useInput from '../hooks/use-input';
import FormInputGroup from './form-input-group';

export default function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [email, setEmail, , processEmailValidation] = useInput(checkEmailValidity);
  const [password, setPassword] = useState('');

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    dispatch(loginAction({
      email,
      password,
    }));
  };

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), [setEmail]);
  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), [setPassword]);

  useEffect(() => {
    setSubmitEnabled(processEmailValidation() && password.length > 0);
  }, [email, password, processEmailValidation]);

  return (
    <form className="login__form login-form cb-form" action="#" onSubmit={handleSubmit}>
      <div className="login-form__wrapper cb-form-wrapper">
        <div className="login-form__top cb-form-top">
          <h2 className="login-form__title cb-form-title title-reset">Вход</h2>
        </div>
        <div className="login-form__bottom cb-form-bottom">
          <FormInputGroup groupClasses='login-form__input-group' labelClasses='login-form__label' inputClasses='login-form__input'
            labelText='Почта' name='email' type='text' inputMode='email' autoComplete='email current-login current-email' required
            value={email} onChange={handleEmailChange}
          />
          <FormInputGroup groupClasses='login-form__input-group' labelClasses='login-form__label' inputClasses='login-form__input'
            labelText='Пароль' name='password' type='password' autoComplete='current-password' required
            value={password} onChange={handlePasswordChange}
          />
          <div className="login-form__btns">
            <button className="login-form__submit-btn cb-form-btn btn-reset" type='submit' disabled={!submitEnabled}>Войти</button>
            <button className="login-form__reset-password-btn cb-form-btn btn-reset">Восстановить пароль</button>
          </div>
        </div>
      </div>
    </form>
  );
}