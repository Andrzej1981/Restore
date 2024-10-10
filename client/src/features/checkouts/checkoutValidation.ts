import * as yup from 'yup';

export const validationSchema =[

 yup.object({
    fullName:yup.string().required('Proszę podać imie i nazwisko'),
    address1:yup.string().required('Podaj adres'),
    address2:yup.string().required(),
    city:yup.string().required(),
    state:yup.string().required(),
    zip:yup.string().required(),
    country:yup.string().required()
}),

yup.object(),
yup.object({
    nameOnCard: yup.string().required()
})
]