export abstract class ObjectModel {
    
    ignoreProperties:string[] = [];

    abstract getDisplayName()   :string;
    abstract getId()            :any;

    isEmpty() {
        let key:string;
        for (key of Object.keys(this).filter(key => key != "ignoreProperties" && !this.ignoreProperties.includes(key))) {
            let value:any = this[key as keyof typeof this];
            if (value != undefined) {
                if (value instanceof ObjectModel) {
                    if (!value.isEmpty()) {
                        return false;
                    }
                }
                else if (Array.isArray(value)) {
                    let empty = true;
                    value.forEach(item => {
                        if (!(item instanceof ObjectModel && item.isEmpty()))
                        {
                            empty = false;
                        }
                    });
                    if (value.length > 0 && !empty) {
                        return false;
                    }
                }
                else {
                    return false
                }
            }
        }
        return true;
    }
}