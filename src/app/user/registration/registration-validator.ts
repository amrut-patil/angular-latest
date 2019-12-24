export class RegistrationValidator {

    static getFirstNameErrorMessage(registrationForm): string {
        return registrationForm.controls['firstname'].hasError('required') ? 'You must enter a value' :
            registrationForm.controls['firstname'].hasError('serverError') ? registrationForm.controls['firstname'].getError('serverError') :
                '';
    }

    static getLastNameErrorMessage(registrationForm): string {
        return registrationForm.controls['lastname'].hasError('required') ? 'You must enter a value' :
            registrationForm.controls['lastname'].hasError('serverError') ? registrationForm.controls['lastname'].getError('serverError') :
                '';
    }

    static getEmailErrorMessage(registrationForm): string {
        return registrationForm.controls['email'].hasError('required') ? 'You must enter a value' :
            registrationForm.controls['email'].hasError('serverError') ? registrationForm.controls['email'].getError('serverError') :
                '';
    }

    static getPasswordErrorMessage(registrationForm): string {
        return registrationForm.controls['password'].hasError('required') ? 'You must enter a value' :
            registrationForm.controls['password'].hasError('serverError') ? registrationForm.controls['password'].getError('serverError') :
                '';
    }

    static getConfirmPasswordErrorMessage(registrationForm): string {
        return registrationForm.controls['confirmpassword'].hasError('required') ? 'You must enter a value' :
            registrationForm.controls['confirmpassword'].hasError('serverError') ? registrationForm.controls['confirmpassword'].getError('serverError') :
                '';
    }
}