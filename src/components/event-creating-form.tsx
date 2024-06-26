import { useState, FormEventHandler, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { validateStringsLength } from '../shared/validate-strings-length';
import { postCoworkingEventAction } from '../store/api-actions';
import FormInputGroup from './form-input-group';
import { DateTime } from 'luxon';
import useInputChangeCallback from '../hooks/use-change-callback';
import { useAdminFetchingStatus } from '../hooks/use-admin-fetching-status';
import Loader from './loader';
import { FetchingStatuses } from '../consts';
import { resetAdminFetchingStatus } from '../store/admin-process/admin-process';

type EventCreatingFormProps = {
  coworkingId: string;

  onSubmit: () => void;
  onCancel: () => void;
};

export default function EventCreatingForm({ coworkingId, onSubmit: handleSubmit,
  onCancel: handleCancel }: EventCreatingFormProps): JSX.Element {
  const today = DateTime.local();
  const currentDate = today.toISODate();
  const nextMonthDate = today.plus({ month: 3 }).toISODate();

  const dispatch = useAppDispatch();
  const fetchingStatus = useAdminFetchingStatus('eventCreatingFetchingStatus');

  const [date, setDate] = useState<string>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = useInputChangeCallback(setName);
  const handleDescriptionChange = useInputChangeCallback(setDescription);

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const handleSubmitClick: FormEventHandler = (e) => {
    e.preventDefault();

    if (date) {
      dispatch(postCoworkingEventAction({
        coworkingId: coworkingId,
        event: {
          date: date,
          name,
          description
        }
      }));
    }

    handleSubmit();
  };

  const handleCancelClick: FormEventHandler = (e) => {
    e.preventDefault();

    handleCancel();
  };

  useEffect(() => {
    setSubmitEnabled(validateStringsLength([date, name]));
  }, [date, name]);

  useEffect(() => {
    dispatch(resetAdminFetchingStatus('eventCreatingFetchingStatus'));

    return () => {
      dispatch(resetAdminFetchingStatus('eventCreatingFetchingStatus'));
    };
  }, [dispatch]);

  return (
    <form className="event-form admin-form" action="#" onSubmit={handleSubmitClick}>
      <div className="event-form__wrapper admin-form-wrapper">
        <div className="event-form__top admin-form-top">
          <h2 className="event-form__title admin-form-title title-reset">Добавление мероприятия</h2>
        </div>
        <div className="event-form__bottom admin-form-bottom">
          <div className="event-form__date-input-group admin-form-input-group form-input-group--required">
            <label className="event-form__date-label admin-form-label" htmlFor="date">Дата</label>
            <input className="event-form__date-input admin-form-input" type="date" name="date" id="event-date"
              value={date} onChange={(e) => setDate(e.target.value)} min={currentDate} max={nextMonthDate}
            />
          </div>
          <FormInputGroup groupClasses='event-form__input-group' labelClasses='event-form__label' inputClasses='event-form__input'
            adminFormStyles labelText='Название' name='event-name' type='text' autoComplete='event-name' required
            value={name} onChange={handleNameChange}
          />
          <FormInputGroup groupClasses='event-form__input-group' labelClasses='event-form__label' inputClasses='event-form__input'
            adminFormStyles textarea labelText='Описание' name='description' type='text'
            value={description} onChange={handleDescriptionChange}
          />
          <div className="admin-form-btns">
            <button className="event-form__submit-btn admin-form-btn white-btn btn-reset" type='submit' disabled={!submitEnabled}>
              {fetchingStatus === FetchingStatuses.Pending
                ? <Loader alignCenter small />
                : 'Сохранить'}
            </button>
            <button className="event-form__cancel-btn admin-form-btn light-btn btn-reset" onClick={handleCancelClick}>
              Отменить
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
