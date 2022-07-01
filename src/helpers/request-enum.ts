export enum RequestStatus {
    DRAFT = "Brouillon",
    SUBMITTED = "En attente de vérification",
    REJECTED = "Rejété après traitement",
    TREATMENT_PENDING = "En attente de traitement",
    TREATMENT_IN_PROGRESS = "En cours de traitement",
    TREATMENT_AT_VERIFY = "Traitement à verifié",
    TREATMENT_ASSIGNED = "Traitement assigné",
    DELIBERATION_PENDING = "En attente de déliberation",
    PUBLISHING_PENDING = "En attente de publication",
    PUBLISHING_AND_SUCCESS = "Publié et favorable",
    PUBLISHING_AND_FAIL = "Publié et non favorable"
}

export enum RequestSubmitState {
    DRAFT = "Brouillon",
    SAVE = "Enregistré"
}

export enum RequestStep {
    STEP_1 = 1,
    STEP_2 = 2,
    STEP_3 = 3,
    STEP_4 = 4,
    STEP_5 = 5,
    STEP_6 = 6,
}

export enum LetterType {
    ELECTRONIC_LETTER = "Electronique",
    HANDWRITTEN_LETTER = "Manuscrite"
}