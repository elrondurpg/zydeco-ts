export abstract class ObjectModel {
    
    ignoreProperties:string[] = [];
    delete:boolean | undefined = undefined;
    dirty:boolean | undefined = undefined;

    abstract getDisplayName()   :string;
    abstract getId()            :any;

    get(key:string) {
        if (key != null && key.trim().length != 0) {
            let tokens = key.split("\.");
            let curr:any = this;
            for (let i = 0; i < tokens.length; i++) {
            if (curr != null) {
                curr = curr[tokens[i]];
            }
            }
            return curr;
        }
    }

    set(key:string, value:any) {
        if (key != null && key.trim().length != 0) {
            let tokens = key.split("\.");
            let curr:any = this;
            for (let i = 0; i < tokens.length; i++) {
                if (i == tokens.length - 1) {
                    curr[tokens[i]] = value;
                }
                else {
                    if (curr[tokens[i]] == null) {
                        curr[tokens[i]] = {};
                    }
                    curr = curr[tokens[i]];
                }
            }
        }
    }

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