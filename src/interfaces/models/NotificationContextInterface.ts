import React from "react";
import { NotificationModel } from "./NotificationModel";

export type Notifications = NotificationModel[];

export interface NotificationContextInterface {
  setShowCanvas: React.Dispatch<React.SetStateAction<boolean>>
  showCanvas: boolean;

  isPending: boolean;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;

  unReadNotifications: NotificationModel[] | [];
  readNotifications: NotificationModel[] | [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetchNotifications: <Notifications>() => Promise<void>

  readNotification: ( id: string ) => Promise<void>
}