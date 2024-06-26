import { PlaceTypeOptions, WeekdaysShort } from '../consts';
import getRoundedTime from '../shared/get-rounded-time';
import ImageCarousel from './image-carousel';
import { CoworkingDto } from '../types/coworking/coworking-dto';
import { useAppSelector } from '../hooks';
import { isUserAdmin } from '../store/user-process/selectors';
import { AppRoutes } from '../routes';
import { Link } from 'react-router-dom';
import TipSVG from './svg/tip';
import { getTimestampTime } from '../shared/get-timestamp-time';

type CoworkingCardProps = CoworkingDto;

export default function CoworkingCard({ avatar, title, description, address, seats, working_schedules: schedules,
  images, technical_capabilities: technicalCapabilities }: CoworkingCardProps): JSX.Element {
  const isAdmin = useAppSelector(isUserAdmin);

  const [openingTime, endingTime] = schedules?.length
    ? [getRoundedTime(schedules[0].start_time), getRoundedTime(schedules[0].end_time)]
    : ['', ''];

  const seatsTotalInfo = seats?.reduce((result, seatDto) => {
    result[seatDto.place_type] = (result[seatDto.place_type] ?? 0) + seatDto.seats_count;
    return result;
  }, {} as { [key: string]: number });

  return (
    <div className="booking__info">
      <div className="booking__left-info">
        <ImageCarousel wrapperClasses='booking__info-carousel'
          imageAlt={title} mainImage={avatar}
          images={images?.map((imageData) => imageData.image_filename) ?? []}
        />
        <h2 className="booking__info-header title-reset">{title}</h2>
        <div className="booking__info-opening">
          <span className="booking__opening-title">Режим работы</span>
          <span className="booking__opening-text">
            {openingTime && endingTime
              ? `с ${openingTime} до ${endingTime}`
              : 'Не указано'}
          </span>
          {!!schedules?.length &&
            <div className='booking__schedule'>
              <TipSVG />
              <div className='booking__schedule-details'>
                {schedules?.map((data) => (
                  <div className='booking__schedule-details-daytime' key={data.week_day}>
                    <span className="booking__schedule-details-day">
                      {WeekdaysShort[data.week_day]}
                    </span>
                    <span className="booking__schedule-details-time">
                      {getTimestampTime(data.start_time, data.end_time)}
                    </span>
                  </div>
                ))}
              </div>
            </div>}
        </div>
      </div>
      <div className="booking__right-info">
        <div className="booking__info-group">
          <h3 className="booking__info-title title-reset">Описание:</h3>
          <p className="booking__info-text paragraph-reset">
            {description}
          </p>
        </div>
        <div className="booking__info-group">
          <h3 className="booking__info-title title-reset">Адрес:</h3>
          <address className="booking__info-text">{address}</address>
        </div>
        <div className="booking__info-group">
          <h3 className="booking__info-title title-reset">Количество мест:</h3>
          {seats?.length && seatsTotalInfo
            ?
            Object.entries(seatsTotalInfo).map(([seatType, seatCount]) => (
              <span className="booking__info-text" key={seatType}>
                {PlaceTypeOptions.find((option) => option.value === seatType)?.title}: {seatCount}
              </span>
            ))
            : <span className='booking__empty-info-text'>Не указано</span>}
        </div>
        <div className="booking__info-group">
          <h3 className="booking__info-title title-reset">Технические возможности:</h3>
          {technicalCapabilities?.length
            ?
            <ul className="booking__info-list list-reset">
              {technicalCapabilities.map((capabilityData) => (
                <li className="booking__info-point" key={capabilityData.capability}>{capabilityData.capability}</li>
              ))}
            </ul>
            : <span className='booking__empty-info-text'>Не указано</span>}
        </div>
      </div>
      {isAdmin &&
        <Link to={AppRoutes.CoworkingEditing.RelativePath} className="booking__info-edit-btn light-btn">
          Редактировать
        </Link>}
      {/* <ul className="booking__image-list list-reset">
        {images.map((imageData) => (
          <li className="booking__image-item" key={imageData.image_filename}>
            <img className="booking__image" src={getImageURL(imageData.image_filename)} alt={imageData.image_filename} />
          </li>
        ))}
      </ul> */}
    </div>
  );
}
