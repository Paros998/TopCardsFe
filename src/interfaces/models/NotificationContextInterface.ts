import React from "react";
import { NotificationModel } from "./NotificationModel";

export type Notifications = NotificationModel[];

export interface NotificationContextInterface {
  setShowCanvas: React.Dispatch<React.SetStateAction<boolean>>
  showCanvas: boolean;

  isPending: boolean;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;

  notifications: NotificationModel[] | [];
  fetchNotifications: <Notifications>() => Promise<void>

}