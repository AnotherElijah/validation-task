import { ValidationData } from '../types'

const ValidationTypes = {
    EMPTY: 'empty',
    LENGTH: 'length',
    REG_EXP: 'regExp',
}

export default class FieldString {

    str: string;

    constructor(str: string){
        this.str = str
    }

    set setStr(str: string) {
        this.str = str
    }

    public validate(criteria: string|RegExp) {

        const validation = defineValidation(criteria)

        if(validation){

            switch(validation.type) {

                case(ValidationTypes.EMPTY):
                    if(validation.negative) return this.str.length !== 0
                    return this.str.length === 0

                case(ValidationTypes.LENGTH):
                    if(validation.negative) return this.str.length !== validation.value
                    return this.str.length === validation.value

                case(ValidationTypes.REG_EXP):
                    return validation.value.test(this.str)

                default:
                    throw 'Criteria argument of function "validate" is not valid. Valid arguments are: "empty", "length=${number}", "length${number}" or any regular expression.'
            }
        }

        function defineValidation (criteria: string | RegExp): ValidationData|null {

            if(criteria instanceof RegExp) return {negative:false, type: ValidationTypes.REG_EXP, value: criteria}

            const negativeCase = criteria.charAt(0) === '!'
            const empty = negativeCase?'!'+ValidationTypes.EMPTY:ValidationTypes.EMPTY
            const length = negativeCase?'!'+ValidationTypes.LENGTH:ValidationTypes.LENGTH

            function isOperatorValid(criteria:string):boolean{
                const filteredStr = criteria.replace(/[0-9]+$/, '').replace(length, '')
                return filteredStr === '' || filteredStr === '='
            }

            function substractNum (criteria:string):number{
                return Number(criteria.replace( /^\D+/g, '').replace(length, ''))
            }

            if (criteria===empty)
                return {negative:negativeCase, type: empty.replace('!', ''), value: null}
            else if ((criteria.includes(length) && substractNum(criteria))
                && isOperatorValid(criteria))
                return {negative:negativeCase, type: length.replace('!', ''), value: substractNum(criteria)}

            return null
        }
    }
}
