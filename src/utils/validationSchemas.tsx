import * as Yup from "yup"

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

export { validateLogin, validateType }