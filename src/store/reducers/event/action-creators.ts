import { AppDispatch } from "../..";
import UserService from "../../../api/UserService";
import { ICalendar } from "../../../models/ICalendar";
import { IUser } from "../../../models/IUser";
import { EventActionEnum, SetEventsAction, SetGuestsAction } from "./types";

export const EventActionCreators = {
  setGuest: (payload: IUser[]): SetGuestsAction => ({
    type: EventActionEnum.SET_GUESTS,
    payload
  }),
  setEvents: (payload: ICalendar[]): SetEventsAction => ({
    type: EventActionEnum.SET_EVENTS,
    payload
  }),
  fetchGuests: () => async (dispatch: AppDispatch) => {
    try {
      const response = await UserService.getUsers();
      dispatch(EventActionCreators.setGuest(response.data));
    } catch (e) {
      console.log(e)
    }
  },
  createEvent: (event: ICalendar) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") || "[]";
      const json = JSON.parse(events) as ICalendar[];
      json.push(event);
      dispatch(EventActionCreators.setEvents(json));
      localStorage.setItem("events", JSON.stringify(json));
    } catch (e) {
      console.log(e)
    }
  },
  fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") || "[]";
      const json = JSON.parse(events) as ICalendar[];
      const currentUserEvents = json.filter((ev) => ev.author === username ||  ev.guest === username);
      dispatch(EventActionCreators.setEvents(currentUserEvents));
    } catch (e) {
      console.log(e)
    }
  }
}