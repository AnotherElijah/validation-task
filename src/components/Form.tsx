import React, {useEffect, useState} from 'react'
import { Fields } from '../types'
import FieldString from '../utils/validator'

export const Form = () => {
    const [err, setErr] = useState<Fields>({})
    const errTxt = 'doesn\' correspond validation criteria'

    const length30 = new FieldString('')
    const length10 = new FieldString('')
    const length3 = new FieldString('')
    const regex = new FieldString('')


    useEffect(()=>{
        // no code
    },[err])

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

        switch(e.currentTarget.id){

            case ('length30'):
                length30.setStr = e.currentTarget.value
                setErr({...err, length30:null})
                return length30.validate('empty') || !length30.validate('length=30') && setErr({...err, length30: errTxt})

            case ('length10'):
                length10.setStr = e.currentTarget.value
                setErr({...err, length10:null})
                return length10.validate('empty') || !length10.validate('length10') && setErr({...err, length10: errTxt})

            case ('length3'):
                length3.setStr = e.currentTarget.value
                setErr({...err, length3:null})
                return length3.validate('empty') || !length3.validate('length=3') && setErr({...err, length3: errTxt})

            case ('regex'):
                regex.setStr = e.currentTarget.value
                setErr({...err, regex:null})
                return regex.validate('empty') || !regex.validate(/[A-Za-z]/) && setErr({...err, regex: errTxt})
        }
    }

    return (
        <div>
            <form>
                <label htmlFor='length30'>Length 30</label>
                <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleChange(e)} id='length30' type='text'/>
                { err.length30 && <span>Field {errTxt}</span> }

                <br/>
                <label htmlFor='length10'>Length 10</label>
                <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleChange(e)} id='length10' type='text'/>
                { err.length10 && <span>Field {errTxt}</span> }

                <br/>
                <label htmlFor='length3'>Length 3</label>
                <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleChange(e)} id='length3' type='text'/>
                { err.length3 && <span>Field {errTxt}</span> }

                <br/>
                <label htmlFor='regex'>Regex</label>
                <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleChange(e)} id='regex' type='text'/>
                { err.regex && <span>Field {errTxt}</span> }

                <br/>
            </form>
        </div>
    )
}
