import * as yup from 'yup';

export const validationSchema =[

 yup.object({
    fullName:yup.string().required('Proszę podać imie i nazwisko'),
    address1:yup.string().required('Podaj adres'),
    address2:yup.string().required(),
    city:yup.string().required('Podaj miasto'),
    state:yup.string().required('Podaj województwo'),
    zip:yup.string().required('Podaj kod pocztowy'),
    country:yup.string().required('Podaj kraj dostawy')
}),

yup.object(),
yup.object({
    nameOnCard: yup.string().required('')
})
]