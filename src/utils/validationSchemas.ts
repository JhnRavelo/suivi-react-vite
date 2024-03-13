import * as Yup from "yup"

const phoneRegEx =
    /^((\+\d{1,3}(-|)?\(?\d\)?(-|)?\d{1,3})|(\(?\d{2,3}\)?))(-|)?(\d{3,4})(-|)?(\d{4})((x|ext)\d{1,5}){0,1}$/;

const dimensionRegex = /^\d+\*\d+$/;

const validateLogin = Yup.object({
    email: Yup.string().required("Vous devez mettre votre addresse email").email("L'addresse email est invalide"),
    password: Yup.string().min(8, "Le mot de passe doit avoir au moins 8 caractères")
        .matches(
            /[A-Z]/,
            "Le mot de passe doit contenir au moins une lettre majuscule"
        )
        .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
        .required("Le mot de passe est requis")
})

const validateType = Yup.object({
    name: Yup.string().required("Vous devez remplir le nom")
})

const validateUser = Yup.object({
    name: Yup.string()
        .required("Vous devez mettre votre nom")
        .matches(/^[A-Za-z]+$/, "Votre nom doit seulement contenir des lettres"),
    email: Yup.string()
        .required("Vous devez mettre votre adresse email")
        .email(`l'adresse email est invalide`)
    ,
    password: Yup.string()
        .min(8, "Le mot de passe doit avoir au moins 8 caractères")
        .matches(
            /[A-Z]/,
            "Le mot de passe doit contenir au moins une lettre majuscule"
        )
        .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
        .required("Le mot de passe est requis"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Le mot de passe doit être le même")
        .required("Le mot de passe doit être confirmer"),
    phone: Yup.string()
        .matches(phoneRegEx, "Numéro de téléphone invalide")
        .required("Le numéro de téléphone est requis"),
})

const validateUserUpdate = Yup.object({
    name: Yup.string()
        .required("Vous devez mettre votre nom")
        .matches(/^[A-Za-z]+$/, "Votre nom doit seulement contenir des lettres"),
    email: Yup.string()
        .required("Vous devez mettre votre adresse email")
        .email(`l'adresse email est invalide`)
    ,
    password: Yup.string()
        .min(8, "Le mot de passe doit avoir au moins 8 caractères")
        .matches(
            /[A-Z]/,
            "Le mot de passe doit contenir au moins une lettre majuscule"
        )
        .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Le mot de passe doit être le même"),
    phone: Yup.string()
        .matches(phoneRegEx, "Numéro de téléphone invalide")
        .required("Le numéro de téléphone est requis"),
})

const validateProduct = Yup.object({
    type: Yup.array()
        .of(Yup.string())
        .min(1, "Selectionnez un type de ménuiserie")
        .max(1, "Selectionnez seulement un type"),
    dimension: Yup.string()
        .required("La dimension est réquis")
        .matches(dimensionRegex, "De la forme hauteur*largeur"),
    tech: Yup.array()
        .of(Yup.string())
        .min(1, "Selectionnez un technicien")
        .max(1, "Selectionnez seulement un technicien"),

})

export { validateLogin, validateType, validateUser, validateUserUpdate, validateProduct }