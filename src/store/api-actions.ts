/* eslint-disable camelcase */
import { EmptyObject, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { ApiMethods, ApiRoutes, FetchingStatuses } from '../consts';
import { redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';
import { AppRoutes } from '../routes';
import { clearUserData } from './user-process/user-process';
import { JsonRpcResponce as JsonRpcResponse } from '../types/json-rpc/json-rpc-response';
import { RegisterData } from '../types/register/register-data';
import { LoginData } from '../types/login/login-data';
import { LoginResponseData } from '../types/login/login-response-data';
import { ThunkExtraArgument } from '../types/thunk-extra-argument';
import { createJsonRpcRequest } from '../shared/create-json-rpc-request';
import { RegisterRequestParams } from '../types/register/register-request-params';
import { RefreshRequestParams } from '../types/refresh-session/refresh-request-params';
import { LoginRequestParams } from '../types/login/login-request-params';
import { CoworkingDto } from '../types/coworking/coworking-dto';
import { CoworkingByTimestampRequestParams } from '../types/coworking/coworking-by-timestamp-request-params';
import { CoworkingBySearchRequestParams } from '../types/coworking/coworking-by-search-request-params';
import { CoworkingRequestParams } from '../types/coworking/coworking-request-params';
import { UserDto } from '../types/user/user-dto';
import { UpdateUserRequestParams } from '../types/user/update-user-request-params';
import { BookedCoworkingDto } from '../types/booking/booked-coworking-dto';
import { BookingRequestParams } from '../types/booking/booking-request-params';
import { ChangePasswordRequestParams } from '../types/change-password/change-password-request-params';
import { ChangePasswordResponseData } from '../types/change-password/change-password-response-data';
import { ChangePasswordData } from '../types/change-password/change-password-data';
import { CoworkingShortDto } from '../types/coworking/coworking-short-dto';
import { UpdateUserData } from '../types/user/update-user-data';
import { BookingData } from '../types/booking/booking-data';
import { CancelBookingRequestParams } from '../types/booking/cancel-booking-request-params';
import { RequestPasswordRecoveryData } from '../types/recovery-password/request-password-recovery-data';
import { RequestRecoveryPasswordRequestParams } from '../types/recovery-password/request-password-recovery-request-params';
import { PasswordRecoveryData } from '../types/recovery-password/password-recovery-data';
import { PasswordRecoveryRequestParams } from '../types/recovery-password/password-recovery-request-params';
import { TimestampDto } from '../types/api-shared/timestamp-dto';
import { CoworkingsSearchDto } from '../types/api-shared/search-dto';
import { CreateCoworkingDto } from '../types/admin/create-coworking-dto';
import { CreateCoworkingRequestParams } from '../types/admin/create-coworking-request-params';
import { CreateCapabilityRequestParams } from '../types/admin/create-capability-request-params';
import { CreateCapabilityData } from '../types/admin/create-capability-data';
import { CoworkingCapabilityDto } from '../types/api-shared/coworking-capability-dto';
import { CreateEventData } from '../types/admin/create-event-data';
import { CreateEventRequestParams } from '../types/admin/create-event-request-params';
import { EventDto } from '../types/api-shared/event-dto';
import { CreateScheduleData } from '../types/admin/create-schedule-data';
import { CreateScheduleRequestParams } from '../types/admin/create-schedule-request-params';
import { ScheduleDto } from '../types/api-shared/schedule-dto';
import { SeatDto } from '../types/api-shared/seat-dto';
import { CreateSeatsData } from '../types/admin/create-seats-data';
import { CreateSeatsRequestParams } from '../types/admin/create-seats-request-params';
import { UploadAvatarData } from '../types/admin/upload-avatar-data';
import { UploadImageData } from '../types/admin/upload-image-data';
import { UploadedImageData } from '../types/admin/uploaded-image-data';
import { setImageFetchingStatus } from './admin-process/admin-process';


export const fetchUserAction = createAsyncThunk<UserDto, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'user/fetchUser',
  async (_, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<UserDto>>(ApiRoutes.FetchUser, createJsonRpcRequest<EmptyObject>(
      ApiMethods.FetchUser,
      {}
    ));

    return data.result;
  },
);

export const postUserDataAction = createAsyncThunk<UserDto, UpdateUserData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'user/postUserData',
  async (updateUserData, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<UserDto>>(ApiRoutes.UpdateUser, createJsonRpcRequest<UpdateUserRequestParams>(
      ApiMethods.UpdateUser,
      {
        values_set: {
          first_name: updateUserData.firstName,
          last_name: updateUserData.lastName,
          patronymic: updateUserData.patronymic,
        }
      }
    ));

    return data.result;
  },
);


export const registerAction = createAsyncThunk<void, RegisterData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'auth/register',
  async (registerData, { dispatch, extra: { api } }) => {
    await api.post<JsonRpcResponse<UserDto>>(ApiRoutes.Register, createJsonRpcRequest<RegisterRequestParams>(
      ApiMethods.Register,
      {
        data: {
          last_name: registerData.lastName,
          first_name: registerData.firstName,
          patronymic: registerData.patronymic,
          email: registerData.email,
          password: registerData.password,
        }
      }
    ));

    dispatch(redirectToRoute(AppRoutes.Login.FullPath));
  },
);

export const loginAction = createAsyncThunk<void, LoginData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'auth/login',
  async (loginData, { dispatch, extra: { fpService, api } }) => {
    const fingerprintId = await fpService.getFingerprintId();

    const { data } = await api.post<JsonRpcResponse<LoginResponseData>>(ApiRoutes.Login, createJsonRpcRequest<LoginRequestParams>(
      ApiMethods.Login,
      {
        data: {
          ...loginData,
          fingerprint: fingerprintId,
        }
      }
    ), { withCredentials: true });

    saveToken(data.result.access_token);
    dispatch(fetchUserAction());
    dispatch(redirectToRoute(AppRoutes.Main.FullPath)); // определить, куда перенаправлять
  },
);

export const refreshSessionAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'auth/refreshSession',
  async (_, { dispatch, extra: { fpService, api } }) => {
    const fingerprintId = await fpService.getFingerprintId();

    const { data } = await api.post<JsonRpcResponse<LoginResponseData>>(ApiRoutes.RefreshSession, createJsonRpcRequest<RefreshRequestParams>(
      ApiMethods.RefreshSession,
      {
        fingerprint: fingerprintId,
      }
    ), { withCredentials: true });

    saveToken(data.result.access_token);
    dispatch(fetchUserAction());
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'auth/logout',
  async (_, { dispatch, extra: { fpService, api } }) => {
    const fingerprintId = await fpService.getFingerprintId();

    await api.post<JsonRpcResponse<LoginResponseData>>(ApiRoutes.Logout, createJsonRpcRequest<RefreshRequestParams>(
      ApiMethods.Logout,
      {
        fingerprint: fingerprintId,
      }
    ), { withCredentials: true });

    dropToken();
    dispatch(clearUserData());

    // определить, нужно ли перенаправлять пользователя
  },
);

export const postPasswordChangeAction = createAsyncThunk<void, ChangePasswordData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'user/postPasswordChange',
  async (changePasswordData, { dispatch, extra: { fpService, api } }) => {
    const fingerprintId = await fpService.getFingerprintId();

    const { data } = await api.post<JsonRpcResponse<ChangePasswordResponseData>>(ApiRoutes.ChangePassword,
      createJsonRpcRequest<ChangePasswordRequestParams>(
        ApiMethods.ChangePassword,
        {
          data: {
            password: changePasswordData.password,
            password_repeat: changePasswordData.repeatedPassword,
            fingerprint: fingerprintId,
          }
        }
      ), { withCredentials: true });

    if (data.result.login_required) {
      dropToken();
      dispatch(clearUserData());
      dispatch(redirectToRoute(AppRoutes.Login.FullPath));
    }
  },
);


export const postAvatarAction = createAsyncThunk<string, File, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'image/postAvatar',
  async (avatar, { extra: { api } }) => {
    const formData = new FormData();
    formData.append('image', avatar);
    const { data } = await api.post<string>(ApiRoutes.UploadAvatar, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return data;
  },
);


export const fetchCoworkingsByTimestampAction = createAsyncThunk<CoworkingShortDto[], TimestampDto, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'coworking/fetchCoworkingsByTimestamp',
  async (timestampData, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<CoworkingShortDto[]>>(ApiRoutes.FetchCoworkingsByTimestamp,
      createJsonRpcRequest<CoworkingByTimestampRequestParams>(
        ApiMethods.FetchCoworkingsByTimestamp,
        {
          interval: {
            from: timestampData.from,
            to: timestampData.to,
          }
        }
      ));

    return data.result;
  },
);

export const fetchCoworkingsBySearchAction = createAsyncThunk<CoworkingShortDto[], CoworkingsSearchDto, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'coworking/fetchCoworkingsBySearch',
  async (searchData, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<CoworkingShortDto[]>>(ApiRoutes.FetchCoworkingsBySearch,
      createJsonRpcRequest<CoworkingBySearchRequestParams>(
        ApiMethods.FetchCoworkingsBySearch,
        {
          search: {
            title: searchData.title,
            institute: searchData.institute
          },
        }
      ));

    return data.result;
  },
);

export const fetchCoworkingAction = createAsyncThunk<CoworkingDto, string, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'coworking/fetchCoworking',
  async (coworkingId, { extra: { api } }) => {
    // return coworkingDataMock;

    const { data } = await api.post<JsonRpcResponse<CoworkingDto>>(ApiRoutes.FetchCoworking, createJsonRpcRequest<CoworkingRequestParams>(
      ApiMethods.FetchCoworking,
      {
        coworking_id: coworkingId
      }
    ));

    return data.result;
  },
);


export const fetchBookedCoworkingsAction = createAsyncThunk<BookedCoworkingDto[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'booking/fethBookedCoworkings',
  async (_, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<BookedCoworkingDto[]>>(ApiRoutes.FetchBookedCoworkings, createJsonRpcRequest<EmptyObject>(
      ApiMethods.FetchBookedCoworkings,
      {}
    ));

    return data.result;
  },
);

export const postBookedCoworkingAction = createAsyncThunk<BookedCoworkingDto | undefined, BookingData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'booking/postBookedCoworking',
  async (bookData, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<BookedCoworkingDto>>(ApiRoutes.BookCoworking, createJsonRpcRequest<BookingRequestParams>(
      ApiMethods.BookCoworking,
      {
        reservation: {
          coworking_id: bookData.coworkingId,
          place_type: bookData.placeType,
          session_start: bookData.from,
          session_end: bookData.to,
        }
      }
    ));

    return data.result;
  },
);

export const deleteBookingAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'booking/deleteBooking',
  async (bookingId, { dispatch, extra: { api } }) => {
    await api.post<JsonRpcResponse<null>>(ApiRoutes.CancelBooking, createJsonRpcRequest<CancelBookingRequestParams>(
      ApiMethods.CancelBooking,
      {
        reservation_id: bookingId,
      }
    ));

    dispatch(fetchBookedCoworkingsAction());
  },
);


export const requestPasswordRecoveryAction = createAsyncThunk<void, RequestPasswordRecoveryData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'userSettings/requestPasswordRecoveryLink',
  async (requestPasswordRecoveryData, { extra: { fpService, api } }) => {
    const fingerprintId = await fpService.getFingerprintId();

    await api.post<JsonRpcResponse<null>>(ApiRoutes.RequestPasswordRecovery,
      createJsonRpcRequest<RequestRecoveryPasswordRequestParams>(
        ApiMethods.RequestPasswordRecovery,
        {
          email: requestPasswordRecoveryData.email,
          fingerprint: fingerprintId,
        }
      ));
  },
);

export const postPasswordRecoveryAction = createAsyncThunk<void, PasswordRecoveryData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'userSettings/postPasswordRecovery',
  async (passwordResetData, { dispatch, extra: { fpService, api } }) => {
    const fingerprintId = await fpService.getFingerprintId();

    await api.post<JsonRpcResponse<null>>(ApiRoutes.PasswordRecovery,
      createJsonRpcRequest<PasswordRecoveryRequestParams>(
        ApiMethods.PasswordRecovery,
        {
          data: {
            password: passwordResetData.password,
            password_repeat: passwordResetData.repeatedPassword,
            fingerprint: fingerprintId,
            token: passwordResetData.token,
            email: passwordResetData.email,
          }
        }
      ));

    dropToken();
    dispatch(clearUserData());
    dispatch(redirectToRoute(AppRoutes.Login.FullPath));
  },
);


export const postCoworkingAvatarAction = createAsyncThunk<UploadedImageData, UploadAvatarData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'image/postCoworkingAvatar',
  async (avatarData, { extra: { api } }) => {
    const formData = new FormData();
    formData.append('image', avatarData.avatar);
    const { data } = await api.post<string>(`${ApiRoutes.UploadCoworkingAvatar}?coworking_id=${avatarData.coworkingId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return {
      coworkingId: avatarData.coworkingId,
      imageName: data
    };
  },
);

export const postCoworkingImageAction = createAsyncThunk<UploadedImageData, UploadImageData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'image/postCoworkingImage',
  async (imageData, { dispatch, extra: { api } }) => {
    const formData = new FormData();
    formData.append('image', imageData.image);

    dispatch(setImageFetchingStatus([imageData.image.name, FetchingStatuses.Pending]));

    const { data } = await api.post<string>(`${ApiRoutes.UploadCoworkingImage}?coworking_id=${imageData.coworkingId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return {
      coworkingId: imageData.coworkingId,
      imageName: data
    };
  },
);


export const postCoworkingAction = createAsyncThunk<CoworkingShortDto, CreateCoworkingDto, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'admin/postCoworking',
  async (createData, { dispatch, extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<CoworkingShortDto>>(ApiRoutes.CreateCoworking,
      createJsonRpcRequest<CreateCoworkingRequestParams>(
        ApiMethods.CreateCoworking,
        {
          coworking: {
            title: createData.title,
            institute: createData.institute,
            description: createData.description,
            address: createData.address
          }
        }
      ));

    if (createData.avatar) {
      dispatch(postCoworkingAvatarAction({
        coworkingId: data.result.id,
        avatar: createData.avatar
      }));
    }
    if (createData.images) {
      createData.images.forEach((image) => {
        dispatch(postCoworkingImageAction({
          coworkingId: data.result.id,
          image: image
        }));
      });
    }

    return data.result;
  },
);

export const postCoworkingCapabilityAction = createAsyncThunk<CoworkingCapabilityDto[], CreateCapabilityData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'admin/postCoworkingCapability',
  async (createData, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<CoworkingCapabilityDto[]>>(ApiRoutes.CreateCoworkingCapability,
      createJsonRpcRequest<CreateCapabilityRequestParams>(
        ApiMethods.CreateCoworkingCapability,
        {
          coworking_id: createData.coworkingId,
          capabilities: createData.capabilities
        }
      ));

    return data.result;
  },
);

export const postCoworkingEventAction = createAsyncThunk<EventDto, CreateEventData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'admin/postCoworkingEvent',
  async (createData, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<EventDto>>(ApiRoutes.CreateCoworkingEvent,
      createJsonRpcRequest<CreateEventRequestParams>(
        ApiMethods.CreateCoworkingEvent,
        {
          coworking_id: createData.coworkingId,
          event: createData.event
        }
      ));

    return data.result;
  },
);

export const postCoworkingScheduleAction = createAsyncThunk<ScheduleDto[], CreateScheduleData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'admin/postCoworkingSchedule',
  async (createData, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<ScheduleDto[]>>(ApiRoutes.CreateCoworkingSchedule,
      createJsonRpcRequest<CreateScheduleRequestParams>(
        ApiMethods.CreateCoworkingSchedule,
        {
          coworking_id: createData.coworkingId,
          schedules: createData.schedules
            .map((elem) => ({
              week_day: elem.week_day,
              start_time: elem.start_time,
              end_time: elem.end_time
            }))
        }
      ));

    return data.result;
  },
);

export const postCoworkingSeatsAction = createAsyncThunk<SeatDto[], CreateSeatsData, {
  dispatch: AppDispatch;
  state: State;
  extra: ThunkExtraArgument;
}>(
  'admin/postCoworkingSeats',
  async (createData, { extra: { api } }) => {
    const { data } = await api.post<JsonRpcResponse<SeatDto[]>>(ApiRoutes.CreateCoworkingSeats,
      createJsonRpcRequest<CreateSeatsRequestParams>(
        ApiMethods.CreateCoworkingSeats,
        {
          coworking_id: createData.coworkingId,
          meeting_rooms: createData.meetingRooms
            .map((elem) => ({
              label: elem.label,
              description: elem.description,
              seats_count: elem.seats_count
            })),
          table_places: createData.tablePlaces
        }
      ));

    return data.result;
  },
);
