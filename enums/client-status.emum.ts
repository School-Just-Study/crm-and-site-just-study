export enum ClientStatus {
  New = "new",
  FirstCall = "firstCall",
  RecordFirstLesson = "recordFirstLesson",
  TrialLesson = "trialLesson",
  DecisionAfterTrialLesson = "decisionAfterTrialLesson",
  LowQualityLead = "LowQualityLead",
  Client = "client",
  DisabledClient = "disabledClient",
  Rejection = "rejection",
}
