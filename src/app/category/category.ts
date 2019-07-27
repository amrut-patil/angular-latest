export class Category{
    
    public _name: string;
    public _parent: string;
    public _path: string;

    get name() : string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get parent() : string {
        return this._parent;
    }

    set parent(parent: string) {
        this._parent = parent;
    }
    
    get path() : string {
        return this._path;
    }

    set path(path: string) {
        this._path = path;
    }    
}