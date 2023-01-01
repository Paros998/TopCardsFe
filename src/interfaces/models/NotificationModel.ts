export function getTheme( type: NotificationType ): string {
  return {
    NEW_PRODUCT: 'info',

    FOLLOWED_AVAILABLE: 'success',
    MARKED_AVAILABLE: 'success',

    FOLLOWED_NEW_REVIEW: 'light',
    MARKED_NEW_REVIEW: 'light',

    FOLLOWED_LOWER_PRICE: 'danger',
    MARKED_LOWER_PRICE: 'danger'
  }[ type as NotificationType ]
}

export enum NotificationType {
  NEW_PRODUCT = 'NEW_PRODUCT',

  FOLLOWED_AVAILABLE = 'FOLLOWED_AVAILABLE',
  MARKED_AVAILABLE = 'MARKED_AVAILABLE',

  FOLLOWED_NEW_REVIEW = 'FOLLOWED_NEW_REVIEW',
  MARKED_NEW_REVIEW = 'MARKED_NEW_REVIEW',

  FOLLOWED_LOWER_PRICE = 'FOLLOWED_LOWER_PRICE',
  MARKED_LOWER_PRICE = 'MARKED_LOWER_PRICE',
}

export interface NotificationModel {
  notificationId: string;
  productId: number;
  productType: string;
  message: string;
  notificationTime: string;
  type: NotificationType;
  isRead: boolean;
}