export class CategoryValidator {

    static getNameErrorMessage(categoryForm): string {
        return categoryForm.controls['name'].hasError('required') ? 'You must enter a value' :
            categoryForm.controls['name'].hasError('serverError') ? categoryForm.controls['name'].getError('serverError') :
                '';
    }

}