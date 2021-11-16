import { ICalendar } from "../../../models/ICalendar";
import { IUser } from "../../../models/IUser";

export interface EventState {
  guest: IUser[];
  events: ICalendar[];
}

export enum EventActionEnum {
  SET_GUESTS = "SET_GUESTS",
  SET_EVENTS = "SET_EVENTS",
}

export interface SetGuestsAction {
  type: EventActionEnum.SET_GUESTS;
  payload: IUser[];
}

export interface SetEventsAction {
  type: EventActionEnum.SET_EVENTS;
  payload: ICalendar[];
}

export type EventAction = SetGuestsAction | SetEventsAction;