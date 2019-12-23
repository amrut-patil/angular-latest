export class ProductValidator {

    static getNameErrorMessage(productForm): string {
        return productForm.controls['name'].hasError('required') ? 'You must enter a value' :
            productForm.controls['name'].hasError('serverError') ? productForm.controls['name'].getError('serverError') :
            '';
    }

    static getCategoryErrorMessage(productForm): string {
        return productForm.controls['categories'].hasError('required') ? 'You must enter a value' :
        productForm.controls['categories'].hasError('serverError') ? productForm.controls['categories'].getError('serverError') :
        '';
    }


}