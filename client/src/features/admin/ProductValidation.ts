import * as yup from 'yup'

export const validationSchema = yup.object({
    name:yup.string().required('Uzupełnij nazwę produktu'),
    brand:yup.string().required(),
    type:yup.string().required(),
    price:yup.number().required().moreThan(0),
    quantityInStock:yup.number().required().min(0),
    description:yup.string().required(),
    file:yup.mixed().when('pictureUrl',{is:(value:string)=>!value,
        then: schema => schema.required('Załaduj obraz'),
        otherwise:schema=>schema.notRequired()
    })
})