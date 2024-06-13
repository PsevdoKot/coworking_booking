import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpaces } from '../../consts';
import { fetchCoworkingAction, postCoworkingAction, postCoworkingCapabilityAction, postCoworkingEventAction, postCoworkingScheduleAction, postCoworkingSeatsAction } from '../api-actions';
import { CoworkingDto } from '../../types/coworking/coworking-dto';
import { CoworkingShortDto } from '../../types/coworking/coworking-short-dto';
import { EventDto } from '../../types/api-shared/event-dto';
import { CoworkingCapabilityDto } from '../../types/api-shared/coworking-capability-dto';
import { SeatDto } from '../../types/api-shared/seat-dto';
import { ScheduleDto } from '../../types/api-shared/schedule-dto';
import sortedArrayByElementField from '../../shared/sorted-array-by-element-field';

type CoworkingProcessState = {
  coworkingFetching: boolean;
  coworkingFetchingError: boolean;
  coworkingDto?: CoworkingDto;
}

const initialState: CoworkingProcessState = {
  coworkingFetching: false,
  coworkingFetchingError: false,
  coworkingDto: undefined,
};

export const coworkingProcess = createSlice({
  name: NameSpaces.Coworking,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCoworkingAction.pending, (state) => {
        state.coworkingFetching = true;
        state.coworkingFetchingError = false;
      })
      .addCase(fetchCoworkingAction.fulfilled, (state, action: PayloadAction<CoworkingDto>) => {
        state.coworkingDto = action.payload;
        // eslint-disable-next-line camelcase
        state.coworkingDto.working_schedules = sortedArrayByElementField<ScheduleDto>(action.payload.working_schedules, 'week_day');
        state.coworkingFetching = false;
      })
      .addCase(fetchCoworkingAction.rejected, (state) => {
        state.coworkingDto = undefined;
        state.coworkingFetching = false;
        state.coworkingFetchingError = true;
      })

      .addCase(postCoworkingAction.fulfilled, (state, action: PayloadAction<CoworkingShortDto>) => {
        state.coworkingDto = { ...action.payload } as CoworkingDto;
      })
      .addCase(postCoworkingEventAction.fulfilled, (state, action: PayloadAction<EventDto>) => {
        if (state.coworkingDto) {
          state.coworkingDto.events.push(action.payload);
        }
      })
      .addCase(postCoworkingCapabilityAction.fulfilled, (state, action: PayloadAction<CoworkingCapabilityDto[]>) => {
        if (state.coworkingDto) {
          // eslint-disable-next-line camelcase
          state.coworkingDto.technical_capabilities = action.payload;
        }
      })
      .addCase(postCoworkingSeatsAction.fulfilled, (state, action: PayloadAction<SeatDto[]>) => {
        if (state.coworkingDto) {
          state.coworkingDto.seats = action.payload;
        }
      })
      .addCase(postCoworkingScheduleAction.fulfilled, (state, action: PayloadAction<ScheduleDto[]>) => {
        if (state.coworkingDto) {
          // eslint-disable-next-line camelcase
          state.coworkingDto.working_schedules = action.payload;
        }
      });
  },
});

// export const { someAction } = coworkingProcess.actions;
