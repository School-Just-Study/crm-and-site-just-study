export enum ClientStatus {
    New = 'new',
    FirstCall = 'firstCall',
    PayedFirstLesson = 'payedFirstLesson',
    RecordFirstLesson = 'recordFirstLesson',
    TrialLesson = 'trialLesson',
    DecisionAfterTrialLesson = 'decisionAfterTrialLesson',
    LowQualityLead = 'LowQualityLead',
    Client = 'client',
    DisabledClient = 'disabledClient',
    FinishedClient = 'finishedClient',
    Rejection = 'rejection'
}
