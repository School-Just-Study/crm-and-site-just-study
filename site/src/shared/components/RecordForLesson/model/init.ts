import { sample } from "effector";
import { ActiveStepGate, resetActiveStep } from "./model";

sample({
    clock: ActiveStepGate.close,
    target: resetActiveStep
});
