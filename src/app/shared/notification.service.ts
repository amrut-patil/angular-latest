import { Injectable } from '@angular/core';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private dialog: MatDialog) { }

  public showSuccess(message: string) {
    this.showNotification(NotificationType.Success, message);
  }

  public showInformation(message: string) {
    this.showNotification(NotificationType.Info, message);
  }

  public showWarning(message: string) {
    this.showNotification(NotificationType.Warning, message);
  }

  public showError(message: string) {
    this.showNotification(NotificationType.Error, message);
  }

  public showNotification(notificationType: NotificationType, message: string) {
    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      //width: '350px',
      data: message,
      panelClass: this.getMessageCssClass(notificationType)
    });
    dialogRef.afterClosed().subscribe();
  }

  private getMessageCssClass(notificationType: NotificationType) {
    switch (notificationType) {
      case NotificationType.Success:
        return 'myapp-notification-success';
      case NotificationType.Info:
        return 'myapp-notification-information';
      case NotificationType.Warning:
        return 'myapp-notification-warning';
      case NotificationType.Error:
        return 'myapp-notification-error';
      default: return ''
    }
  }
}

export enum NotificationType {
  Success,
  Error,
  Info,
  Warning
} 