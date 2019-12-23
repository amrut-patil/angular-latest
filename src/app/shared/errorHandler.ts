export class ApplicationErrorHandler {

    public static addServerError(form, errors, notificationService): void {
        if ((typeof (errors) === 'object') && errors.hasOwnProperty('serverError')) {
            let serverError = errors['serverError'];
            if (serverError.unknown){
                notificationService.showError(serverError.unknown);
            }

            Object.keys(serverError).forEach(prop => {
                const formControl = form.get(prop);
                if (formControl) {
                    formControl.setErrors({
                        serverError: serverError[prop]
                    });
                }
            });
        }
    }
}